import { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  createFilterOptions,
  Divider,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import { useDebounceValue } from '../../hooks/useDebounceValue';
import { LogoAvatar } from '../UI/LogoAvatar';
import { LogoChip } from '../UI/LogoChip';

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
  /** The table's record of options already picked, keyed by field and value. */
  pickedOptions: Map<string, DataTableFilterOption>;
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

interface OperatorSelectProps {
  operators: DataTableFilterOperator[];
  value: DataTableFilterOperator;
  onChange: (operator: DataTableFilterOperator) => void;
}

/** The "contains / equals / ..." picker shown beside a text filter offering more than one. */
function OperatorSelect({
  operators,
  value,
  onChange,
}: Readonly<OperatorSelectProps>) {
  return (
    <Autocomplete
      size='small'
      disableClearable
      options={operators}
      getOptionLabel={(operator) => TEXT_OPERATOR_LABELS[operator]}
      value={value}
      onChange={(_, operator) => onChange(operator)}
      renderInput={(params) => (
        <TextField {...params} size='small' label='Operator' />
      )}
      sx={{ minWidth: 150 }}
    />
  );
}

/**
 * One option as the panel shows it: its logo when it carries one, the label, and the caption
 * trailing the label's last line so a wrapped label keeps them together.
 */
function FilterOptionLabel({
  option,
}: Readonly<{ option: DataTableFilterOption }>) {
  return (
    <>
      {option.logoUrl !== undefined && (
        <LogoAvatar
          name={option.label}
          logoUrl={option.logoUrl}
          size={24}
          sx={{ mr: 1 }}
        />
      )}
      <Typography variant='body2'>
        {option.label}
        {option.caption && (
          <Typography
            component='span'
            variant='caption'
            color='text.secondary'
            sx={{ ml: 1 }}
          >
            {option.caption}
          </Typography>
        )}
      </Typography>
    </>
  );
}

interface TextInputWithSuggestionsProps {
  field: DataTableFilterField;
  value: string;
  onChange: (value: string) => void;
}

/**
 * The value input of a `text` filter. With `field.options` it suggests them as the user types,
 * while still taking anything typed; without, it is a plain input.
 */
function TextInputWithSuggestions({
  field,
  value,
  onChange,
}: Readonly<TextInputWithSuggestionsProps>) {
  const suggestions = (field.options ?? []).map((option) => option.value);
  const placeholder = field.placeholder ?? 'Filter value';

  if (suggestions.length === 0) {
    return (
      <TextField
        size='small'
        label={field.label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={{ flex: 1, minWidth: 200 }}
      />
    );
  }

  return (
    <Autocomplete<string, false, false, true>
      freeSolo
      autoHighlight
      size='small'
      options={suggestions}
      value={value}
      inputValue={value}
      onInputChange={(_, next) => onChange(next)}
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          label={field.label}
          placeholder={placeholder}
        />
      )}
      sx={{ flex: 1, minWidth: 200 }}
    />
  );
}

interface MultiSelectFilterControlProps {
  field: DataTableFilterField;
  /** The whole list of choices; ignored when the field searches its own. */
  options: DataTableFilterOption[];
  values: string[];
  onChange: (values: string[]) => void;
  label: string;
  /** The table's record of options already picked, keyed by field and value. */
  pickedOptions: Map<string, DataTableFilterOption>;
}

/**
 * The multi-select control. With `field.loadOptions` the choices are searched as the user types,
 * so only the loaded page is known: "Select all" is dropped and the browser does no filtering of
 * its own. Otherwise `options` is the whole list, filtered in the browser.
 */
function MultiSelectFilterControl({
  field,
  options,
  values,
  onChange,
  label,
  pickedOptions,
}: Readonly<MultiSelectFilterControlProps>) {
  const isAsync = field.loadOptions !== undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState<DataTableFilterOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounceValue(search, 300);
  // Held in a ref: a consumer that rebuilds the field on every render must not restart the search.
  const loadOptionsRef = useRef(field.loadOptions);
  loadOptionsRef.current = field.loadOptions;

  // Keyed by field as well as value: two fields may offer the same value under different labels.
  const pickedKey = (value: string): string => `${field.id}\u0000${value}`;
  const remember = (options: readonly DataTableFilterOption[]): void => {
    options.forEach((option) => {
      pickedOptions.set(pickedKey(option.value), option);
    });
  };

  useEffect(() => {
    const loadOptions = loadOptionsRef.current;

    if (!isOpen || loadOptions === undefined) {
      return undefined;
    }

    let active = true;
    setIsLoading(true);
    loadOptions(debouncedSearch)
      .then((next) => {
        if (active) setLoaded(next);
      })
      .catch(() => {
        if (active) setLoaded([]);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isOpen, debouncedSearch]);

  const choices = isAsync ? loaded : options;

  const allValues = options.map((option) => option.value);
  const allSelected =
    !isAsync &&
    allValues.length > 0 &&
    allValues.every((value) => values.includes(value));
  const showSelectAll = !isAsync && options.length > 1;
  const displayOptions: DataTableFilterOption[] = showSelectAll
    ? [{ label: 'Select all', value: SELECT_ALL_VALUE }, ...choices]
    : choices;
  // A value nothing has on record still renders, as itself.
  const selected = isAsync
    ? values.map(
        (value) =>
          pickedOptions.get(pickedKey(value)) ??
          choices.find((option) => option.value === value) ?? {
            label: value,
            value,
          },
      )
    : optionsForValues(options, values);

  return (
    <Autocomplete
      multiple
      size='small'
      disableCloseOnSelect
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => {
        setIsOpen(false);
        setSearch('');
      }}
      options={displayOptions}
      loading={isLoading}
      getOptionLabel={(option) => option.label}
      filterOptions={isAsync ? (all) => all : filterOptionsByLabelAndValue}
      isOptionEqualToValue={(option, v) => option.value === v.value}
      onInputChange={(_, next, reason) => {
        if (isAsync && reason === 'input') setSearch(next);
      }}
      value={selected}
      onChange={(_, next) => {
        // Clicking "Select all" toggles between all and none; otherwise the
        // real selection passes through.
        if (next.some((option) => option.value === SELECT_ALL_VALUE)) {
          onChange(allSelected ? [] : allValues);
          return;
        }
        remember(next);
        onChange(next.map((option) => option.value));
      }}
      renderTags={(tags, getTagProps) => {
        const shown = tags.slice(0, MAX_VISIBLE_TAGS);

        return (
          <>
            {shown.map((option, index) => {
              const { key: _key, ...tagProps } = getTagProps({ index });

              return option.logoUrl === undefined ? (
                <Chip
                  {...tagProps}
                  key={option.value}
                  size='small'
                  label={option.label}
                />
              ) : (
                <LogoChip
                  {...tagProps}
                  key={option.value}
                  size='small'
                  name={option.label}
                  logoUrl={option.logoUrl}
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
      renderOption={(props, option, { selected: isSelected }) => {
        const { key: _key, ...liProps } = props;
        const checked =
          option.value === SELECT_ALL_VALUE ? allSelected : isSelected;

        return (
          // Key before the spread: after it, SWC's dev transform passes the children as a props
          // array, which React reconciles as an unkeyed list and warns about.
          <li key={option.value} {...liProps}>
            <Checkbox size='small' checked={checked} sx={{ mr: 1 }} />
            <FilterOptionLabel option={option} />
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          label={label}
          placeholder={values.length === 0 ? field.placeholder : undefined}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading && <CircularProgress size={16} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{ flex: 1, minWidth: 240 }}
    />
  );
}

/**
 * Built-in filter panel rendered from a declarative `filterFields` spec, one
 * control per field, its value emitted in server-value terms. Changes report
 * live (no Apply button), matching the operator panel: consumers refetch from
 * `onFilterStateChange`.
 */
export function DataTableFieldFilterPanel({
  fields,
  pickedOptions,
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
          <OperatorSelect
            operators={operators}
            value={current.operator}
            onChange={(operator) =>
              setValue(field, {
                kind: 'text',
                operator,
                value: current.value,
              })
            }
          />
        )}
        <TextInputWithSuggestions
          field={field}
          value={current.value}
          onChange={(next) =>
            setValue(field, {
              kind: 'text',
              operator: current.operator,
              value: next,
            })
          }
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
          <li key={option.value} {...liProps}>
            <FilterOptionLabel option={option} />
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          label={field.label}
          placeholder={placeholder}
        />
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
  ): JSX.Element => (
    <MultiSelectFilterControl
      field={field}
      options={options}
      values={values}
      onChange={onChange}
      label={label}
      pickedOptions={pickedOptions}
    />
  );

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
