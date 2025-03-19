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
import { useEffect, useMemo, useState } from 'react';
import { BrandFilter } from './types';
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
  /** If true, brands will be grouped by their live status */
  groupLiveBrand?: boolean;
  /** If true, shows a 'Select All' option in multiple select mode */
  selectAll?: boolean;
  /** If true, shows a 'Select Live Brands' option in multiple select mode */
  selectLiveBrands?: boolean;
  /** Array of brand UUIDs to use as default values when no selection is made */
  defaultBrandUuids?: string[];
  /** Debounce time in milliseconds for onChange when in multiple mode. Defaults to 2000ms */
  debounceMs?: number;
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
  groupLiveBrand = false,
  selectAll = false,
  selectLiveBrands = false,
  defaultBrandUuids,
  debounceMs = 2000,
  sx,
}: Readonly<BrandFilterInputProps>) {
  // Local state for immediate UI updates
  const [localValue, setLocalValue] = useState<Value | Value[] | null>(
    value ?? null,
  );

  // Debounced onChange handler for multiple mode
  const debouncedOnChange = useMemo(() => {
    if (!multiple) return onChange;
    let timeoutId: ReturnType<typeof setTimeout>;
    return (newValue: Value | Value[] | null) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    };
  }, [multiple, onChange, debounceMs]);

  const handleChange = (newValue: Value | Value[] | null) => {
    if (multiple && Array.isArray(newValue)) {
      const slicedValue = newValue.slice(0, maximumSelectedBrands);
      setLocalValue(slicedValue);
      debouncedOnChange(slicedValue);
      return;
    }
    setLocalValue(newValue);
    onChange(newValue);
  };

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value ?? null);
  }, [value]);

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

  // Validate selectAll and selectLiveBrands props
  if ((selectAll || selectLiveBrands) && !multiple) {
    throw new Error(
      'selectAll and selectLiveBrands props can only be used when multiple is true',
    );
  }

  // Create virtual options for multi-select mode
  const virtualOptions = useMemo(
    () => ({
      selectAll: {
        name: 'Select All',
        value: 'select-all',
        _raw: {} as any,
      },
      selectLiveBrands: {
        name: 'Select Live Brands',
        value: 'select-live-brands',
        _raw: {} as any,
      },
    }),
    [],
  );

  // Add virtual options at the beginning of options array when in multiple mode
  const optionsWithVirtualOptions = useMemo(() => {
    if (!multiple) return brandOptions;

    const virtualOptionsList = [];
    if (selectAll) virtualOptionsList.push(virtualOptions.selectAll);
    if (selectLiveBrands)
      virtualOptionsList.push(virtualOptions.selectLiveBrands);

    return virtualOptionsList.length > 0
      ? [...virtualOptionsList, ...brandOptions]
      : brandOptions;
  }, [multiple, selectAll, selectLiveBrands, virtualOptions, brandOptions]);

  // Determine if all brands or all live brands are selected
  const selectionState = useMemo(() => {
    if (!multiple || !Array.isArray(localValue) || brandOptions.length === 0)
      return { areAllSelected: false, areLiveBrandsSelected: false };

    const liveBrands = brandOptions.filter((brand) => brand._raw.isLiveBrand);
    const selectedBrands = localValue.filter(
      (v) => v.value !== 'select-all' && v.value !== 'select-live-brands',
    );

    const areAllSelected =
      selectedBrands.length === brandOptions.length &&
      brandOptions.every((brand) =>
        selectedBrands.some((v) => v.value === brand.value),
      );

    const areLiveBrandsSelected =
      liveBrands.length > 0 &&
      liveBrands.every((brand) =>
        selectedBrands.some((v) => v.value === brand.value),
      );

    return { areAllSelected, areLiveBrandsSelected };
  }, [multiple, localValue, brandOptions]);

  const { areAllSelected, areLiveBrandsSelected } = selectionState;

  // Handle virtual options functionality (Select All and Select Live Brands)
  const handleVirtualOptions = (newValue: Value | Value[] | null) => {
    if (!multiple || !Array.isArray(newValue)) return newValue;

    // Check which virtual option is being selected
    const isSelectAllSelected = newValue.some(
      (item) => item.value === 'select-all',
    );
    const isSelectLiveBrandsSelected = newValue.some(
      (item) => item.value === 'select-live-brands',
    );

    // Handle Select All
    if (isSelectAllSelected) {
      // If all brands are already selected, unselect all
      if (areAllSelected) {
        return [];
      }

      // Check maximum selection limit
      if (
        maximumSelectedBrands &&
        brandOptions.length > maximumSelectedBrands
      ) {
        enqueueSnackbar(
          `You can't select more than ${maximumSelectedBrands} brands.`,
          'error',
        );
        return Array.isArray(localValue)
          ? localValue.filter(
              (item) =>
                item.value !== 'select-all' &&
                item.value !== 'select-live-brands',
            )
          : [];
      }

      // Select all brands
      return brandOptions;
    }

    // Handle Select Live Brands
    if (isSelectLiveBrandsSelected) {
      const liveBrands = brandOptions.filter((brand) => brand._raw.isLiveBrand);

      // If all live brands are already selected, unselect them
      if (areLiveBrandsSelected) {
        const nonLiveBrands = Array.isArray(localValue)
          ? localValue.filter(
              (item) =>
                item.value !== 'select-live-brands' &&
                !liveBrands.some((b) => b.value === item.value),
            )
          : [];
        return nonLiveBrands;
      }

      // Check maximum selection limit
      if (maximumSelectedBrands && liveBrands.length > maximumSelectedBrands) {
        enqueueSnackbar(
          `You can't select more than ${maximumSelectedBrands} brands.`,
          'error',
        );
        return Array.isArray(localValue)
          ? localValue.filter(
              (item) =>
                item.value !== 'select-all' &&
                item.value !== 'select-live-brands',
            )
          : [];
      }

      // Select all live brands while preserving other selected brands
      const currentSelection = Array.isArray(localValue)
        ? localValue.filter(
            (item) =>
              item.value !== 'select-all' &&
              item.value !== 'select-live-brands' &&
              !liveBrands.some((b) => b.value === item.value),
          )
        : [];
      return [...currentSelection, ...liveBrands];
    }

    // If neither virtual option is selected, return the selection without virtual options
    return newValue.filter(
      (item) =>
        item.value !== 'select-all' && item.value !== 'select-live-brands',
    );
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
        value={multiple ? (localValue as Value[]) || [] : (localValue as Value)}
        limitTags={3}
        options={optionsWithVirtualOptions}
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
          // Process virtual options if needed
          const processedValue = handleVirtualOptions(newValue);
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
        {...(groupLiveBrand && {
          // Define how options should be grouped
          groupBy: (option: Value) => {
            // Don't group virtual options
            if (
              option.value === 'select-all' ||
              option.value === 'select-live-brands'
            ) {
              return '';
            }
            // Group by live status
            return option._raw.isLiveBrand ? 'Live Brands' : 'Not Live Yet';
          },
          // Live brands should appear first
          groupOrder: (a: string, b: string) => (a === 'Live Brands' ? -1 : 1),
        })}
        renderOption={(props, option, { selected }) => {
          // For virtual options, show them as selected based on the current selection state
          const isSelected =
            option.value === 'select-all'
              ? areAllSelected
              : option.value === 'select-live-brands'
                ? areLiveBrandsSelected
                : selected;

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
