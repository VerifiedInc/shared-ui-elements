import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  FormControlLabel,
  Skeleton,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays } from 'date-fns';
import {
  Controller,
  FormProvider,
  useForm,
  useWatch,
  type UseFormReturn,
} from 'react-hook-form';

import { useNetworkRuleStatuses } from '../NetworkRules.context';
import { useNetworkRulesCatalog } from '../hooks/useNetworkRulesCatalog';
import type {
  NetworkRule,
  NetworkRuleData,
  NetworkRuleFormValues,
  NetworkRuleServerError,
  NetworkRuleSubmitExtras,
} from '../types';
import { getPresets } from '../utils/catalog';
import {
  emptyConditionFormValues,
  fromNetworkRuleFormValues,
  toNetworkRuleFormValues,
} from '../utils/condition';
import { ruleDateToDay } from '../utils/date';
import { ConditionsField } from './fields/ConditionsField';
import { DateField } from './fields/DateField';
import { NotesField } from './fields/NotesField';
import { StatusField } from './fields/StatusField';
import { networkRuleFormSchema } from './schema';

export interface NetworkRuleEditorFormProps {
  /** Omit for a new rule. */
  rule?: Partial<NetworkRule> | null;
  /** Pre-filled, editable name for a new rule, e.g. "Rule #7". */
  defaultName?: string;
  /** Offer "Add … as a preset" for a typed note or free-text value; the grown lists arrive with `onSubmit`. */
  canCreatePresets?: boolean;
  onSubmit: (
    rule: NetworkRuleData,
    extras: NetworkRuleSubmitExtras,
  ) => void | Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
  /** Indexed errors highlight their condition row; the rest show at the top. */
  serverErrors?: readonly NetworkRuleServerError[];
  focusConditionIndex?: number;
  submitLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
  /** `id` of the `<form>`, for an external submit button. */
  id?: string;
  hideActions?: boolean;
  onDirtyChange?: (isDirty: boolean) => void;
}

function buildDefaultValues(
  rule: Partial<NetworkRule> | null | undefined,
  defaultName: string | undefined,
): NetworkRuleFormValues {
  const values = toNetworkRuleFormValues(rule);
  if (!rule?.uuid && !values.name && defaultName) {
    values.name = defaultName;
  }
  if (values.conditions.length === 0) {
    values.conditions = [emptyConditionFormValues()];
  }
  return values;
}

type ConditionValuesPath = `conditions.${number}.values`;

/** Applies the errors and returns the condition paths it touched, so they can be cleared later. */
function applyServerErrors(
  form: UseFormReturn<NetworkRuleFormValues>,
  serverErrors: readonly NetworkRuleServerError[],
): ConditionValuesPath[] {
  const formLevel: string[] = [];
  const paths: ConditionValuesPath[] = [];
  for (const error of serverErrors) {
    const message = error.message ?? error.code;
    if (typeof error.index === 'number') {
      const path: ConditionValuesPath = `conditions.${error.index}.values`;
      form.setError(path, { type: 'server', message });
      paths.push(path);
    } else {
      formLevel.push(message);
    }
  }
  if (formLevel.length > 0) {
    form.setError('root.server', {
      type: 'server',
      message: formLevel.join(' '),
    });
  }
  return paths;
}

function LoadingFields() {
  return (
    <Stack spacing={2} aria-busy>
      <Skeleton variant='rounded' height={56} />
      <Skeleton variant='rounded' height={56} />
      <Skeleton variant='rounded' height={56} />
      <Skeleton variant='rounded' height={120} />
    </Stack>
  );
}

export function NetworkRuleEditorForm({
  rule,
  defaultName,
  canCreatePresets = false,
  onSubmit,
  onCancel,
  isSubmitting = false,
  serverErrors,
  focusConditionIndex,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  disabled = false,
  id,
  hideActions = false,
  onDirtyChange,
}: Readonly<NetworkRuleEditorFormProps>) {
  const catalogQuery = useNetworkRulesCatalog();
  const catalog = catalogQuery.data;
  const statuses = useNetworkRuleStatuses() ?? catalog?.statuses ?? [];

  // Defaults are rebuilt only when the rule being edited changes, never on a re-render.
  const loadKey = rule?.uuid ?? 'new';
  const [loadedKey, setLoadedKey] = useState(loadKey);

  const form = useForm<NetworkRuleFormValues>({
    defaultValues: buildDefaultValues(rule, defaultName),
    resolver: zodResolver(networkRuleFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // Presets stay in the form until submit, so cancelling discards them too.
  const [addedPresets, setAddedPresets] = useState<Record<string, string[]>>(
    {},
  );

  useEffect(() => {
    if (loadKey === loadedKey) return;
    form.reset(buildDefaultValues(rule, defaultName));
    setAddedPresets({});
    setLoadedKey(loadKey);
  }, [form, rule, defaultName, loadKey, loadedKey]);

  const appliedServerErrorPaths = useRef<ConditionValuesPath[]>([]);
  useEffect(() => {
    form.clearErrors('root.server');
    if (appliedServerErrorPaths.current.length > 0) {
      form.clearErrors(appliedServerErrorPaths.current);
    }
    appliedServerErrorPaths.current = applyServerErrors(
      form,
      serverErrors ?? [],
    );
  }, [form, serverErrors]);

  const { isDirty } = form.formState;
  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const busy = disabled || isSubmitting;
  const rootError = form.formState.errors.root?.server?.message;
  const startDate = useWatch({ control: form.control, name: 'startDate' });
  const startDay = ruleDateToDay(startDate);
  const endMinDate = startDay ? addDays(startDay, 1) : undefined;

  const notePresets = useMemo(
    () => [...getPresets(catalog, 'notes'), ...(addedPresets.notes ?? [])],
    [catalog, addedPresets.notes],
  );
  const addPreset = (field: string, value: string) => {
    setAddedPresets((current) => {
      const list = current[field] ?? [];
      return list.includes(value)
        ? current
        : { ...current, [field]: [...list, value] };
    });
  };

  const submit = form.handleSubmit(async (values) => {
    // The dialog's Save button is outside the form and cannot see the catalog state.
    if (catalog === undefined) return;
    const presets = Object.fromEntries(
      Object.entries(addedPresets).map(([field, added]) => [
        field,
        [...getPresets(catalog, field), ...added],
      ]),
    );
    await onSubmit(fromNetworkRuleFormValues(values), { presets });
  });

  return (
    <FormProvider {...form}>
      <form
        id={id}
        noValidate
        onSubmit={(event) => {
          // Stops the submit from bubbling to a form around the dialog.
          event.preventDefault();
          event.stopPropagation();
          void submit(event);
        }}
      >
        <Stack spacing={3}>
          {catalogQuery.isError && (
            <Alert
              severity='error'
              action={
                <Button
                  color='inherit'
                  size='small'
                  onClick={() => {
                    void catalogQuery.refetch();
                  }}
                >
                  Retry
                </Button>
              }
            >
              The rule catalog could not be loaded.
            </Alert>
          )}

          {rootError && <Alert severity='error'>{rootError}</Alert>}

          {catalog === undefined ? (
            !catalogQuery.isError && <LoadingFields />
          ) : (
            <>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Controller
                  control={form.control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label='Rule Name'
                      required
                      fullWidth
                      disabled={busy}
                      error={fieldState.error !== undefined}
                      helperText={fieldState.error?.message}
                      sx={{ flex: 2 }}
                    />
                  )}
                />
                <Stack flex={1} minWidth={{ md: 220 }}>
                  <StatusField statuses={statuses} disabled={busy} />
                </Stack>
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Controller
                  control={form.control}
                  name='startDate'
                  render={({ field, fieldState }) => (
                    <DateField
                      label='Starts'
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={busy}
                      error={fieldState.error !== undefined}
                      helperText={
                        fieldState.error?.message ??
                        'Starts applying at the start of this day (UTC)'
                      }
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name='endDate'
                  render={({ field, fieldState }) => (
                    <DateField
                      label='Ends'
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={busy}
                      minDate={endMinDate}
                      error={fieldState.error !== undefined}
                      helperText={
                        fieldState.error?.message ??
                        'Stops applying at the start of this day (UTC)'
                      }
                    />
                  )}
                />
              </Stack>

              <NotesField
                presets={notePresets}
                onCreatePreset={
                  canCreatePresets
                    ? (value) => {
                        addPreset('notes', value);
                      }
                    : undefined
                }
                disabled={busy}
              />

              <Controller
                control={form.control}
                name='enabled'
                render={({ field }) => (
                  <FormControlLabel
                    label='Enabled'
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(_event, checked) => {
                          field.onChange(checked);
                        }}
                        onBlur={field.onBlur}
                        inputRef={field.ref}
                        disabled={busy}
                      />
                    }
                  />
                )}
              />

              <ConditionsField
                catalog={catalog}
                addedPresets={addedPresets}
                onCreatePreset={canCreatePresets ? addPreset : undefined}
                disabled={busy}
                focusIndex={focusConditionIndex}
              />
            </>
          )}

          {!hideActions && (
            <Stack direction='row' spacing={1} justifyContent='flex-end'>
              {onCancel && (
                <Button onClick={onCancel} disabled={isSubmitting}>
                  {cancelLabel}
                </Button>
              )}
              <Button
                type='submit'
                variant='contained'
                disabled={busy || catalog === undefined}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={16} color='inherit' />
                  ) : undefined
                }
              >
                {submitLabel}
              </Button>
            </Stack>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
}
