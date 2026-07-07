import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  createFilterOptions,
  Divider,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import type {
  DataTableFilterField,
  DataTableFilterFieldValue,
  DataTableFilterOperator,
  DataTableFilterOption,
  DataTableFilterState,
  DataTableIcons,
} from './DataTable.types';
import {
  buildInitialFilterState,
  emptyFieldValue,
} from './DataTable.filterState';

/** Synthetic option value for the multi-select "Select all" row. */
const SELECT_ALL_VALUE = '__select_all__';

/** Chips shown in a multi-select before collapsing the rest into "+N more". */
const MAX_VISIBLE_TAGS = 2;

/** Options for a `boolean` field's single-select (cleared = "Any"). */
const BOOLEAN_OPTIONS: DataTableFilterOption[] = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

/** Labels for the text-field operators offered in the panel. */
const TEXT_OPERATOR_LABELS: Record<DataTableFilterOperator, string> = {
  contains: 'contains',
  doesNotContain: 'does not contain',
  equals: 'equals',
  doesNotEqual: 'does not equal',
  startsWith: 'starts with',
  endsWith: 'ends with',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
  isAnyOf: 'is any of',
};

interface DataTableFieldFilterPanelProps {
  fields: DataTableFilterField[];
  /** Current filter state (may omit fields, each falls back to its empty value). */
  filterState: DataTableFilterState;
  onFilterStateChange: (state: DataTableFilterState) => void;
  anchorPosition: { top: number; left: number };
  /** Which top corner pins to `anchorPosition`. Defaults to 'left'. */
  transformHorizontal?: 'left' | 'right';
  icons?: DataTableIcons;
  onClose: () => void;
}

// Match the typed query against both the label and the value, so an option
// can be found by its server value (e.g. pasting a uuid), not just its
// display name.
const filterOptionsByLabelAndValue = createFilterOptions<DataTableFilterOption>(
  { stringify: (option) => `${option.label} ${option.value}` },
);

/** The options for a value, looked up as option objects Autocomplete can render. */
function optionsForValues(
  options: DataTableFilterOption[] | undefined,
  values: string[],
): DataTableFilterOption[] {
  return (options ?? []).filter((option) => values.includes(option.value));
}

/**
 * Built-in filter panel rendered from a declarative `filterFields` spec, one
 * control per field, its value emitted in server-value terms. Changes report
 * live (no Apply button), matching the operator panel: consumers refetch from
 * `onFilterStateChange`.
 */
export function DataTableFieldFilterPanel({
  fields,
  filterState,
  onFilterStateChange,
  anchorPosition,
  transformHorizontal = 'left',
  icons = {},
  onClose,
}: Readonly<DataTableFieldFilterPanelProps>) {
  const { removeAllFilters: RemoveAllFiltersIcon = DeleteOutline } = icons;

  // Each field's current value, falling back to its cleared shape.
  const valueOf = (field: DataTableFilterField): DataTableFilterFieldValue =>
    filterState[field.id] ?? emptyFieldValue(field);

  const setValue = (
    field: DataTableFilterField,
    value: DataTableFilterFieldValue,
  ): void => {
    onFilterStateChange({ ...filterState, [field.id]: value });
  };

  const handleClearAll = (): void => {
    onFilterStateChange(buildInitialFilterState(fields));
    onClose();
  };

  const renderTextField = (field: DataTableFilterField): JSX.Element => {
    const value = valueOf(field);
    const current =
      value.kind === 'text'
        ? value
        : { operator: field.operators?.[0] ?? 'contains', value: '' };
    const operators = field.operators ?? ['contains'];

    return (
      <Stack direction='row' spacing={1} sx={{ flex: 1 }}>
        {operators.length > 1 && (
          <TextField
            select
            size='small'
            label='Operator'
            value={current.operator}
            onChange={(event) =>
              setValue(field, {
                kind: 'text',
                operator: event.target.value as DataTableFilterOperator,
                value: current.value,
              })
            }
            sx={{ minWidth: 150 }}
          >
            {operators.map((operator) => (
              <MenuItem key={operator} value={operator}>
                {TEXT_OPERATOR_LABELS[operator]}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          size='small'
          label={field.label}
          placeholder={field.placeholder ?? 'Filter value'}
          value={current.value}
          onChange={(event) =>
            setValue(field, {
              kind: 'text',
              operator: current.operator,
              value: event.target.value,
            })
          }
          sx={{ flex: 1, minWidth: 200 }}
        />
      </Stack>
    );
  };

  // Shared single-choice Autocomplete for the `select` and `boolean` fields,
  // clearing it (null) means "no filter". The caller maps the picked option
  // back to the field's value shape.
  const renderSingleSelect = (
    field: DataTableFilterField,
    options: DataTableFilterOption[],
    selected: DataTableFilterOption | null,
    onSelect: (option: DataTableFilterOption | null) => void,
    placeholder: string | undefined,
    minWidth: number,
  ): JSX.Element => (
    <Autocomplete
      size='small'
      options={options}
      getOptionLabel={(option) => option.label}
      filterOptions={filterOptionsByLabelAndValue}
      isOptionEqualToValue={(option, v) => option.value === v.value}
      value={selected}
      onChange={(_, next) => onSelect(next)}
      renderOption={(props, option) => {
        const { key: _key, ...liProps } = props;

        return (
          <li {...liProps} key={option.value}>
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={field.label} placeholder={placeholder} />
      )}
      sx={{ flex: 1, minWidth }}
    />
  );

  const renderSelect = (field: DataTableFilterField): JSX.Element => {
    const value = valueOf(field);
    const selected =
      value.kind === 'select' && value.value != null
        ? (field.options?.find((option) => option.value === value.value) ??
          null)
        : null;

    return renderSingleSelect(
      field,
      field.options ?? [],
      selected,
      (option) =>
        setValue(field, { kind: 'select', value: option?.value ?? null }),
      field.placeholder,
      220,
    );
  };

  const renderMultiSelect = (
    field: DataTableFilterField,
    options: DataTableFilterOption[],
    values: string[],
    onChange: (values: string[]) => void,
    label: string,
  ): JSX.Element => {
    const allValues = options.map((option) => option.value);
    const allSelected =
      allValues.length > 0 && allValues.every((v) => values.includes(v));
    const showSelectAll = options.length > 1;
    const displayOptions: DataTableFilterOption[] = showSelectAll
      ? [{ label: 'Select all', value: SELECT_ALL_VALUE }, ...options]
      : options;

    return (
      <Autocomplete
        multiple
        size='small'
        disableCloseOnSelect
        options={displayOptions}
        getOptionLabel={(option) => option.label}
        filterOptions={filterOptionsByLabelAndValue}
        isOptionEqualToValue={(option, v) => option.value === v.value}
        value={optionsForValues(options, values)}
        onChange={(_, next) => {
          // Clicking "Select all" toggles between all and none; otherwise the
          // real selection passes through.
          if (next.some((option) => option.value === SELECT_ALL_VALUE)) {
            onChange(allSelected ? [] : allValues);
            return;
          }
          onChange(next.map((option) => option.value));
        }}
        renderTags={(tags, getTagProps) => {
          const shown = tags.slice(0, MAX_VISIBLE_TAGS);

          return (
            <>
              {shown.map((option, index) => {
                const { key: _key, ...tagProps } = getTagProps({ index });

                return (
                  <Chip
                    {...tagProps}
                    key={option.value}
                    size='small'
                    label={option.label}
                  />
                );
              })}
              {tags.length > MAX_VISIBLE_TAGS && (
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ ml: 0.5 }}
                >
                  +{tags.length - MAX_VISIBLE_TAGS} more
                </Typography>
              )}
            </>
          );
        }}
        renderOption={(props, option, { selected }) => {
          const { key: _key, ...liProps } = props;
          const checked =
            option.value === SELECT_ALL_VALUE ? allSelected : selected;

          return (
            <li {...liProps} key={option.value}>
              <Checkbox size='small' checked={checked} sx={{ mr: 1 }} />
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={values.length === 0 ? field.placeholder : undefined}
          />
        )}
        sx={{ flex: 1, minWidth: 240 }}
      />
    );
  };

  const renderBoolean = (field: DataTableFilterField): JSX.Element => {
    const value = valueOf(field);
    const current = value.kind === 'boolean' ? value.value : null;
    const selected =
      current === null
        ? null
        : (BOOLEAN_OPTIONS.find((o) => o.value === String(current)) ?? null);

    return renderSingleSelect(
      field,
      BOOLEAN_OPTIONS,
      selected,
      (option) =>
        setValue(field, {
          kind: 'boolean',
          value: option ? option.value === 'true' : null,
        }),
      field.placeholder ?? 'Any',
      200,
    );
  };

  const renderGroup = (field: DataTableFilterField): JSX.Element => {
    const value = valueOf(field);
    const sectionValues = value.kind === 'group' ? value.values : {};

    return (
      <Stack spacing={1} sx={{ flex: 1 }}>
        {(field.sections ?? []).map((section) =>
          renderMultiSelect(
            field,
            section.options,
            sectionValues[section.key] ?? [],
            (nextValues) =>
              setValue(field, {
                kind: 'group',
                values: { ...sectionValues, [section.key]: nextValues },
              }),
            section.label,
          ),
        )}
      </Stack>
    );
  };

  const renderControl = (field: DataTableFilterField): JSX.Element => {
    switch (field.kind) {
      case 'text':
        return renderTextField(field);
      case 'select':
        return renderSelect(field);
      case 'multiSelect': {
        const value = valueOf(field);
        return renderMultiSelect(
          field,
          field.options ?? [],
          value.kind === 'multiSelect' ? value.values : [],
          (nextValues) =>
            setValue(field, { kind: 'multiSelect', values: nextValues }),
          field.label,
        );
      }
      case 'boolean':
        return renderBoolean(field);
      case 'group':
        return renderGroup(field);
    }
  };

  return (
    <Popover
      open
      anchorReference='anchorPosition'
      anchorPosition={anchorPosition}
      transformOrigin={{ vertical: 'top', horizontal: transformHorizontal }}
      onClose={onClose}
    >
      <Box sx={{ p: 1.5, width: 420 }}>
        {fields.length === 0 ? (
          <Typography variant='body2' color='text.secondary' sx={{ pl: 0.5 }}>
            No filters available.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {fields.map((field) => (
              <Stack key={field.id} direction='row' alignItems='flex-start'>
                {renderControl(field)}
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
      {fields.length > 0 && (
        <>
          <Divider />
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            sx={{ px: 1.5, py: 0.75 }}
          >
            <Button
              size='small'
              color='primary'
              startIcon={<RemoveAllFiltersIcon />}
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          </Stack>
        </>
      )}
    </Popover>
  );
}
