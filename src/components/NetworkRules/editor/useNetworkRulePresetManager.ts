import { useState, type Dispatch, type SetStateAction } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRulePresetDeleteDialogProps } from '../dialog/NetworkRulePresetDeleteDialog';
import type { NetworkRulePresetEditDialogProps } from '../dialog/NetworkRulePresetEditDialog';
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
  const { updatePresets, renamePreset } = useNetworkRulesServices();
  const create = useUpdateNetworkRulesPresets();
  const rename = useRenameNetworkRulePreset();
  const update = useUpdateNetworkRulesPresets();
  const [editing, setEditing] = useState<PresetTarget | null>(null);
  const [deleting, setDeleting] = useState<PresetTarget | null>(null);
  const active = enabled && updatePresets !== undefined;

  const isAdded = ({ field, value }: PresetTarget): boolean =>
    (addedPresets[field] ?? []).includes(value);

  const addLocally = (field: string, value: string): void => {
    setAddedPresets((current) => {
      const list = current[field] ?? [];
      return list.includes(value)
        ? current
        : { ...current, [field]: [...list, value] };
    });
  };

  /**
   * Stored right away when the host can, so the preset is a saved one from the start and can be
   * edited or deleted like any other. It shows at once from the local list, which the catalog
   * refetch then supersedes; a refused write leaves it there, to go out with the rule on submit.
   */
  const createPreset = (field: string, value: string): void => {
    addLocally(field, value);
    if (updatePresets === undefined) return;
    // Every pending addition rides along, so two quick additions cannot overwrite each other.
    const known = [
      ...getSavedPresets(catalog, field),
      ...(addedPresets[field] ?? []),
    ];
    const presets = known.includes(value) ? known : [...known, value];
    create.mutate(
      { [field]: presets },
      {
        onSuccess: () => {
          setAddedPresets((current) => withoutAdded(current, field, value));
        },
      },
    );
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
      editing !== null && renamePreset !== undefined && !isAdded(editing),
    isSaving: rename.isPending,
    error: describe(rename.error),
    onClose: close,
    onSave: async (next, { updateRules }) => {
      if (!editing) return;
      const { field, value: from } = editing;
      if (isAdded(editing)) {
        setAddedPresets((current) => ({
          ...current,
          [field]: replacePreset(current[field] ?? [], from, next),
        }));
      } else {
        try {
          await rename.mutateAsync({
            field,
            from,
            to: next,
            presets: replacePreset(getSavedPresets(catalog, field), from, next),
            updateRules,
          });
        } catch {
          // Kept on `rename.error` for the dialog, which stays open.
          return;
        }
        // The open rule is one of the rules that use it; left as is, saving it would undo the rename.
        if (updateRules) renamePresetInForm(form, field, from, next);
      }
      close();
    },
  };

  const deleteDialogProps: NetworkRulePresetDeleteDialogProps = {
    open: deleting !== null,
    value: deleting?.value,
    isDeleting: update.isPending,
    error: describe(update.error),
    onClose: close,
    onConfirm: async () => {
      if (!deleting) return;
      const { field, value } = deleting;
      if (isAdded(deleting)) {
        setAddedPresets((current) => withoutAdded(current, field, value));
      } else {
        try {
          await update.mutateAsync({
            [field]: removePreset(getSavedPresets(catalog, field), value),
          });
        } catch {
          return;
        }
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
