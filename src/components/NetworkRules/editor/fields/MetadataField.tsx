import { Button, FormHelperText, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { NetworkRuleCatalog, NetworkRuleFormValues } from '../../types';
import { getPresets } from '../../utils/catalog';
import {
  NETWORK_RULE_METADATA_PRESET_FIELDS,
  emptyMetadataFormValues,
} from '../../utils/metadata';
import { MetadataRow } from './MetadataRow';

export interface MetadataFieldProps {
  catalog: NetworkRuleCatalog;
  addedPresets?: Readonly<Record<string, readonly string[]>>;
  onCreatePreset?: (field: string, value: string) => void;
  disabled?: boolean;
}

/**
 * Typed key/value pairs returned with the decision. Optional: a rule may have none, and a catalog
 * without `metadata` offers no section at all, as the filter panel offers no controls.
 */
export function MetadataField({
  catalog,
  addedPresets,
  onCreatePreset,
  disabled = false,
}: Readonly<MetadataFieldProps>) {
  const { control, formState } = useFormContext<NetworkRuleFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata',
  });

  const { metadata } = catalog;
  if (metadata === undefined) return null;

  const listError =
    formState.errors.metadata?.root?.message ??
    formState.errors.metadata?.message;
  const keyPresets = getPresets(
    catalog,
    NETWORK_RULE_METADATA_PRESET_FIELDS.key,
    addedPresets,
  );
  const valuePresets = getPresets(
    catalog,
    NETWORK_RULE_METADATA_PRESET_FIELDS.value,
    addedPresets,
  );
  const isFull = fields.length >= metadata.limits.maxEntries;

  return (
    <Stack spacing={2}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontWeight={700}>Metadata</Typography>
        <Button
          startIcon={<Add />}
          disabled={disabled || isFull}
          onClick={() => {
            // The first offered type; the default covers a catalog that lists none.
            append(emptyMetadataFormValues(metadata.types[0]));
          }}
        >
          Add Metadata
        </Button>
      </Stack>

      {fields.length === 0 && (
        <Typography variant='body2' color='text.secondary'>
          No metadata yet. Pairs added here are returned with the network status
          so your app can act on them.
        </Typography>
      )}

      {fields.map((field, index) => (
        <MetadataRow
          key={field.id}
          index={index}
          types={metadata.types}
          limits={metadata.limits}
          keyPresets={keyPresets}
          valuePresets={valuePresets}
          onCreatePreset={onCreatePreset}
          disabled={disabled}
          onRemove={() => {
            remove(index);
          }}
        />
      ))}

      {listError && <FormHelperText error>{listError}</FormHelperText>}
    </Stack>
  );
}
