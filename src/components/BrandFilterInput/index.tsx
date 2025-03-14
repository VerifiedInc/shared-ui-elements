/**
 * BrandFilterInput Component
 *
 * A customizable dropdown component for selecting brands with various features:
 * - Single or multiple selection modes
 * - "Select All" option for quickly selecting all brands
 * - Maximum selection limit with error messaging
 * - Brand grouping and sorting
 *
 * This component uses a controlled open/close state to fix a Material-UI Autocomplete bug
 * where the dropdown would close unexpectedly when the mouse happened to be hovering
 * over one of the selected items when opening the dropdown. By manually controlling
 * the open state, we ensure the dropdown only closes when clicking outside the component.
 */

import {
  Autocomplete,
  TextField,
  Checkbox,
  Box,
  Typography,
  SxProps,
} from '@mui/material';
import { useSnackbar } from '../Snackbar';
import { useMemo, useState } from 'react';
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
  /** Array of brand UUIDs to use as default values when no selection is made */
  defaultBrandUuids?: string[];
  sx?: SxProps;
}

export function BrandFilterInput({
  label,
  multiple = false,
  value,
  onChange,
  brands,
  isLoading,
  maximumSelectedBrands,
  groupConfig,
  defaultBrandUuids,
  sx,
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
    defaultBrandUuids,
  });

  let autocompleteKey: string;
  if (multiple) {
    autocompleteKey = 'multiple';
  } else if (value === undefined) {
    autocompleteKey = 'empty';
  } else {
    autocompleteKey = 'single';
  }

  // Create a Select All option for multi-select mode
  const selectAllOption: Value = useMemo(
    () => ({
      name: 'Select All',
      value: 'select-all',
      _raw: {} as any, // This is a virtual option, not a real brand
    }),
    [],
  );

  // Add Select All option at the beginning of options array when in multiple mode
  const optionsWithSelectAll = useMemo(() => {
    return multiple ? [selectAllOption, ...brandOptions] : brandOptions;
  }, [multiple, selectAllOption, brandOptions]);

  // Determine if all available brands are currently selected
  // Used to show the Select All option as checked when all brands are selected individually
  const areAllBrandsSelected = useMemo(() => {
    if (!multiple || !Array.isArray(value) || brandOptions.length === 0)
      return false;
    return (
      value.length === brandOptions.length &&
      brandOptions.every((brand) => value.some((v) => v.value === brand.value))
    );
  }, [multiple, value, brandOptions]);

  // Handle select all functionality
  const handleSelectAll = (newValue: Value | Value[] | null) => {
    if (!multiple || !Array.isArray(newValue)) return newValue;

    // Check if Select All is being selected or deselected
    const isSelectAllSelected = newValue.some(
      (item) => item.value === 'select-all',
    );

    // If all brands are already selected and user clicks on Select All again, unselect all brands
    // This provides a quick way to clear all selections with a single click
    if (isSelectAllSelected && areAllBrandsSelected) {
      return [];
    }
    if (isSelectAllSelected) {
      // If Select All is selected, select all brand options (excluding Select All)
      // If maximumSelectedBrands is set and there are more brands than allowed, show error
      if (
        maximumSelectedBrands &&
        brandOptions.length > maximumSelectedBrands
      ) {
        enqueueSnackbar(
          `You can't select more than ${maximumSelectedBrands} brands.`,
          'error',
        );
        // Don't select any brands when limit would be surpassed
        // Return the current selection without the Select All option
        return Array.isArray(value)
          ? value.filter((item) => item.value !== 'select-all')
          : [];
      }
      // Otherwise, select all brands
      return brandOptions;
    } else {
      // If Select All is not in the selection, filter it out from the result
      return newValue.filter((item) => item.value !== 'select-all');
    }
  };

  // Track if the dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // Open the dropdown when clicking on the component
  // This is part of the workaround for the Material-UI Autocomplete bug
  // where the dropdown would close when hovering over options
  const openDropdown = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <Box
      onClick={openDropdown}
      sx={{ position: 'relative', cursor: 'pointer', ...sx }}
    >
      <Autocomplete
        key={autocompleteKey}
        multiple={multiple}
        value={multiple ? (value as Value[]) || [] : (value as Value)}
        limitTags={3}
        options={optionsWithSelectAll}
        getOptionKey={(option: Value) => option.value}
        getOptionLabel={(option: Value) => option.name}
        isOptionEqualToValue={(option: Value, value: Value | undefined) => {
          if (!value) return false;
          return option.value === value.value;
        }}
        // Control the open state manually to prevent unwanted closing
        open={isOpen}
        // Empty onOpen handler prevents Autocomplete from managing its own open state
        // onClose handler only triggers when clicking outside the component
        onOpen={() => {}}
        onClose={() => setIsOpen(false)}
        onChange={(_, newValue) => {
          // Process Select All option if needed
          const processedValue = handleSelectAll(newValue);
          // Check if we're trying to select more than the maximum allowed
          if (
            maximumSelectedBrands &&
            Array.isArray(processedValue) &&
            processedValue.length > maximumSelectedBrands
          ) {
            // If we're adding a new item (length increased), show error message
            if (Array.isArray(value) && processedValue.length > value.length) {
              enqueueSnackbar(
                `You can't select more than ${maximumSelectedBrands} brands.`,
                'error',
              );
              return;
            }
            // If we're replacing items (same length or decreased), allow the change
          }
          handleChange(processedValue);
        }}
        clearOnBlur
        disableClearable={!multiple}
        disabled={isLoading}
        disableCloseOnSelect={multiple}
        {...(groupConfig && {
          // Define how options should be grouped
          groupBy: (option: Value) => {
            // Don't group the Select All option
            if (option.value === 'select-all') return '';
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
        renderOption={(props, option, { selected }) => {
          // For the Select All option, show it as selected if all brands are selected
          // This creates a consistent UX where Select All appears checked when all items are selected
          const isSelected =
            option.value === 'select-all' ? areAllBrandsSelected : selected;

          return (
            <li {...props}>
              <Box display='flex' alignItems='center' width='100%'>
                {multiple && (
                  <Checkbox checked={isSelected} sx={{ marginRight: 1 }} />
                )}
                <Typography>{option.name}</Typography>
              </Box>
            </li>
          );
        }}
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
    </Box>
  );
}

export * from './types';
export * from './BrandFilterInput.hook';
