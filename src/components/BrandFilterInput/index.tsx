import { Autocomplete, TextField } from '@mui/material';
import { useSnackbar } from '../Snackbar';
import { BrandFilter, BrandGroupConfig } from './types';
import { useBrandFilterInput } from './BrandFilterInput.hook';

export type Value = BrandFilter;

interface BrandFilterInputProps {
  label: string;
  multiple?: boolean;
  value: Value | Value[] | undefined;
  onChange: (value: Value | Value[] | null) => void;
  brands?: any[];
  isLoading: boolean;
  maximumSelectedBrands?: number;
  /** Configuration for how to group the brands. If null, no grouping will be applied */
  groupConfig?: BrandGroupConfig;
}

export function BrandFilterInput({
  label,
  multiple = false,
  value,
  onChange,
  brands,
  isLoading,
  maximumSelectedBrands = 10,
  groupConfig,
}: Readonly<BrandFilterInputProps>) {
  const handleChange = (newValue: Value | Value[] | null) => {
    if (multiple && Array.isArray(newValue)) {
      onChange(newValue.slice(0, maximumSelectedBrands));
      return;
    }

    onChange(newValue);
  };

  const { enqueueSnackbar } = useSnackbar();
  const { brandOptions } = useBrandFilterInput({
    value,
    multiple,
    onChange: handleChange,
    brands,
    maximumSelectedBrands,
  });

  return (
    <Autocomplete
      key={multiple ? 'multiple' : value === undefined ? 'empty' : 'single'}
      multiple={multiple}
      value={multiple ? (value as Value[]) || [] : (value as Value)}
      limitTags={3}
      options={brandOptions}
      getOptionKey={(option: Value) => option.value}
      getOptionLabel={(option: Value) => option.name}
      isOptionEqualToValue={(option: Value, value: Value | undefined) =>
        option.value === value?.value
      }
      onChange={(_, newValue) => {
        if (
          Array.isArray(newValue) &&
          newValue.length > maximumSelectedBrands
        ) {
          enqueueSnackbar(
            `You can't select more than ${maximumSelectedBrands} brands.`,
            'error',
          );
          return;
        }

        handleChange(newValue as BrandFilter | BrandFilter[] | null);
      }}
      clearOnBlur
      disableClearable={!multiple}
      disabled={isLoading}
      {...(groupConfig && {
        // Define how options should be grouped
        groupBy: (option: Value) => {
          // Extract the raw value using the specified key
          const value = option._raw[groupConfig.key];
          // Transform the value using the provided transform function or fallback to string conversion
          return groupConfig.transform
            ? groupConfig.transform(value)
            : String(value);
        },
        // Use the provided sort function to determine group order
        // If not provided, MUI will use alphabetical ordering
        groupOrder: groupConfig.sortGroups,
      })}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder='Select...'
          inputProps={{ ...params.inputProps, flex: 1, width: '100%' }}
          sx={{ width: '100%' }}
        />
      )}
    />
  );
}

export * from './types';
export * from './BrandFilterInput.hook';
