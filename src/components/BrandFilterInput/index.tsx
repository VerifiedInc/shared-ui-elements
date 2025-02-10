import { Autocomplete, TextField } from '@mui/material';
import { useSnackbar } from '../Snackbar';
import { BrandFilter } from './types';
import { useBrandFilterInput } from './BrandFilterInput.hook';

export type Value = BrandFilter;

interface BrandFilterInputProps {
  label: string;
  multiple?: boolean;
  value: Value | Value[] | undefined;
  onChange: (value: Value | Value[] | null) => void;
  getBrandsQuery: {
    data?: any[];
    isFetching: boolean;
  };
  maximumSelectedBrands?: number;
}

export function BrandFilterInput({
  label,
  multiple = false,
  value,
  onChange,
  getBrandsQuery,
  maximumSelectedBrands = 10,
}: Readonly<BrandFilterInputProps>) {
  const handleChange = (newValue: Value | Value[] | null) => {
    if (multiple && Array.isArray(newValue)) {
      onChange(newValue.slice(0, maximumSelectedBrands));
      return;
    }

    onChange(newValue);
  };

  const { enqueueSnackbar } = useSnackbar();
  const { brandOptions, isFetching } = useBrandFilterInput({
    value,
    multiple,
    onChange: handleChange,
    getBrandsQuery,
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

        handleChange(newValue);
      }}
      clearOnBlur
      disableClearable={!multiple}
      disabled={isFetching}
      groupBy={(option: Value) => (option._raw as any).live}
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
