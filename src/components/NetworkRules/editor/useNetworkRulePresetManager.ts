import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRulePresetDeleteDialogProps } from '../dialog/NetworkRulePresetDeleteDialog';
import type { NetworkRulePresetEditDialogProps } from '../dialog/NetworkRulePresetEditDialog';
import { networkRulesCatalogQueryKey } from '../hooks/useNetworkRulesCatalog';
import { useRenameNetworkRulePreset } from '../hooks/useRenameNetworkRulePreset';
import { useUpdateNetworkRulesPresets } from '../hooks/useUpdateNetworkRulesPresets';
import type {
  NetworkRuleCatalog,
  NetworkRuleFormValues,
  NetworkRulePresets,
} from '../types';
import {
  getPresetMaxLength,
  getPresets,
  getSavedPresets,
} from '../utils/catalog';
import { dedupeValues } from '../utils/condition';
import { NETWORK_RULE_METADATA_PRESET_FIELDS } from '../utils/metadata';
import { removePreset, replacePreset } from '../utils/presets';

/** A preset and the field it suggests for, keyed as `NetworkRulePresets` is. */
type PresetTarget = { field: string; value: string };

export interface UseNetworkRulePresetManagerOptions {
  /** The rule being edited, which follows a rename when the user asks rules to. */
  form: UseFormReturn<NetworkRuleFormValues>;
  catalog: NetworkRuleCatalog | undefined;
  /**
   * Presets not stored yet: created without `services.updatePresets`, or refused by it. They go
   * out with the rule on submit, and are changed in place here, without a write.
   */
  addedPresets: NetworkRulePresets;
  setAddedPresets: Dispatch<SetStateAction<NetworkRulePresets>>;
  /** Offer "Add … as a preset". Without `services.updatePresets` the preset waits for the submit. */
  canCreate: boolean;
  /** Off, or on without `services.updatePresets`, gives no handlers, so the inputs show no controls. */
  enabled: boolean;
}

export interface NetworkRulePresetManager {
  onCreatePreset?: (field: string, value: string) => void;
  onEditPreset?: (field: string, value: string) => void;
  onDeletePreset?: (field: string, value: string) => void;
  editDialogProps: NetworkRulePresetEditDialogProps;
  deleteDialogProps: NetworkRulePresetDeleteDialogProps;
}

const WRITE_FAILED = 'The presets could not be saved.';

/**
 * The open rule's own uses of the preset, renamed in place. `renamePresetInRule` does the same for
 * a stored rule; the form keeps metadata as rows, so it is walked here. Marked dirty, since the
 * loaded values no longer hold.
 */
function renamePresetInForm(
  form: UseFormReturn<NetworkRuleFormValues>,
  field: string,
  from: string,
  to: string,
): void {
  const options = {
    shouldDirty: true,
    shouldValidate: form.formState.isSubmitted,
  };
  const values = form.getValues();

  if (field === 'notes') {
    if (values.notes === from) form.setValue('notes', to, options);
    return;
  }
  if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.key) {
    values.metadata.forEach((row, index) => {
      if (row.key === from) form.setValue(`metadata.${index}.key`, to, options);
    });
    return;
  }
  if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.value) {
    values.metadata.forEach((row, index) => {
      if (row.type === 'string' && row.value === from) {
        form.setValue(`metadata.${index}.value`, to, options);
      }
    });
    return;
  }
  values.conditions.forEach((condition, index) => {
    if (condition.key === field && condition.values.includes(from)) {
      form.setValue(
        `conditions.${index}.values`,
        dedupeValues(
          condition.values.map((value) => (value === from ? to : value)),
        ),
        options,
      );
    }
  });
}

/** `current` without `value` under `field`; a field left empty goes too, so submit skips it. */
function withoutAdded(
  current: NetworkRulePresets,
  field: string,
  value: string,
): NetworkRulePresets {
  const list = removePreset(current[field] ?? [], value);
  if (list.length > 0) return { ...current, [field]: list };
  return Object.fromEntries(
    Object.entries(current).filter(([key]) => key !== field),
  );
}

/**
 * The create, edit and delete flows behind the preset dropdowns: which preset a dialog is about,
 * the write of the field's revised list, and the error the dialog shows when that write fails. A
 * rename touches rules only when the user ticks the box for it, and then also the rule open here.
 */
export function useNetworkRulePresetManager({
  form,
  catalog,
  addedPresets,
  setAddedPresets,
  canCreate,
  enabled,
}: UseNetworkRulePresetManagerOptions): NetworkRulePresetManager {
  const { scope, updatePresets, renamePreset } = useNetworkRulesServices();
  const queryClient = useQueryClient();
  const create = useUpdateNetworkRulesPresets();
  const rename = useRenameNetworkRulePreset();
  const update = useUpdateNetworkRulesPresets();
  const [editing, setEditing] = useState<PresetTarget | null>(null);
  const [deleting, setDeleting] = useState<PresetTarget | null>(null);
  // A dialog waiting for a create write to settle before it can act.
  const [settling, setSettling] = useState(false);
  const active = enabled && updatePresets !== undefined;

  /** The stored list as the query cache has it now, for work that runs after an await. */
  const latestSaved = (field: string): string[] =>
    getSavedPresets(
      queryClient.getQueryData<NetworkRuleCatalog>(
        networkRulesCatalogQueryKey(scope),
      ) ?? catalog,
      field,
    );

  const addLocally = (field: string, value: string): void => {
    setAddedPresets((current) => {
      const list = current[field] ?? [];
      return list.includes(value)
        ? current
        : { ...current, [field]: [...list, value] };
    });
  };

  /**
   * Create writes run one after another, each built when it starts from the list the one before
   * left behind. The host replaces a field's whole list, so two writes in flight at once could
   * have the earlier one land last and drop the later addition; in a queue they cannot.
   */
  const createQueue = useRef<Promise<void>>(Promise.resolve());

  /**
   * Stored right away when the host can, so the preset is a saved one from the start and can be
   * edited or deleted like any other. It shows at once from the local list, which the catalog
   * refetch then supersedes; a refused write leaves it there, to go out with the rule on submit.
   */
  const createPreset = (field: string, value: string): void => {
    addLocally(field, value);
    if (updatePresets === undefined) return;
    createQueue.current = createQueue.current
      .then(async () => {
        const saved = latestSaved(field);
        if (!saved.includes(value)) {
          await create.mutateAsync({ [field]: [...saved, value] });
        }
        setAddedPresets((current) => withoutAdded(current, field, value));
      })
      // Refused: nothing to undo, and the queue must go on for the next addition.
      .catch(() => undefined);
  };

  /**
   * Whether the preset is stored, judged once the create writes in flight have settled. A preset
   * picked a moment ago is then in the catalog, or still only in the form if the host refused it,
   * whichever the render that opened the dialog showed.
   */
  const isStoredOnceSettled = async (
    field: string,
    value: string,
  ): Promise<boolean> => {
    setSettling(true);
    try {
      await createQueue.current;
    } finally {
      setSettling(false);
    }
    return latestSaved(field).includes(value);
  };

  const close = (): void => {
    setEditing(null);
    setDeleting(null);
    rename.reset();
    update.reset();
  };

  const describe = (error: Error | null): string | undefined =>
    error ? error.message || WRITE_FAILED : undefined;

  const editDialogProps: NetworkRulePresetEditDialogProps = {
    open: editing !== null,
    value: editing?.value,
    presets: editing
      ? getPresets(catalog, editing.field, addedPresets)
      : undefined,
    maxLength: editing ? getPresetMaxLength(catalog, editing.field) : undefined,
    // A preset not stored yet is on no stored rule, so there is nothing to follow it.
    canUpdateRules:
      editing !== null &&
      renamePreset !== undefined &&
      getSavedPresets(catalog, editing.field).includes(editing.value),
    isSaving: rename.isPending || settling,
    error: describe(rename.error),
    onClose: close,
    onSave: async (next, { updateRules }) => {
      if (!editing) return;
      const { field, value: from } = editing;
      if (await isStoredOnceSettled(field, from)) {
        try {
          await rename.mutateAsync({
            field,
            from,
            to: next,
            presets: replacePreset(latestSaved(field), from, next),
            updateRules,
          });
        } catch {
          // Kept on `rename.error` for the dialog, which stays open.
          return;
        }
        // The open rule is one of the rules that use it; left as is, saving it would undo the rename.
        if (updateRules) renamePresetInForm(form, field, from, next);
      } else {
        setAddedPresets((current) => ({
          ...current,
          [field]: replacePreset(current[field] ?? [], from, next),
        }));
      }
      close();
    },
  };

  const deleteDialogProps: NetworkRulePresetDeleteDialogProps = {
    open: deleting !== null,
    value: deleting?.value,
    isDeleting: update.isPending || settling,
    error: describe(update.error),
    onClose: close,
    onConfirm: async () => {
      if (!deleting) return;
      const { field, value } = deleting;
      if (await isStoredOnceSettled(field, value)) {
        try {
          await update.mutateAsync({
            [field]: removePreset(latestSaved(field), value),
          });
        } catch {
          return;
        }
      } else {
        setAddedPresets((current) => withoutAdded(current, field, value));
      }
      close();
    },
  };

  return {
    onCreatePreset: canCreate ? createPreset : undefined,
    onEditPreset: active
      ? (field, value) => {
          rename.reset();
          setEditing({ field, value });
        }
      : undefined,
    onDeletePreset: active
      ? (field, value) => {
          update.reset();
          setDeleting({ field, value });
        }
      : undefined,
    editDialogProps,
    deleteDialogProps,
  };
}
