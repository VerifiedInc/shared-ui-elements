import { Fragment, useState, type UIEvent } from 'react';
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  TextField,
  type ChipProps,
} from '@mui/material';

import { useNetworkRuleSourceSearch } from '../../../hooks/useNetworkRuleSourceSearch';
import { useResolvedConditionOptions } from '../../../hooks/useResolvedConditionOptions';
import type { NetworkRuleKeyDef, NetworkRuleOption } from '../../../types';

const LOAD_MORE_THRESHOLD_PX = 50;

export interface RemoteValuesInputProps {
  keyDef: NetworkRuleKeyDef & { values: { source: string } };
  values: string[];
  onChange: (values: string[]) => void;
  multi: boolean;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

/** Paged search over the key's remote source; the next page loads when the list is scrolled near its end. */
export function RemoteValuesInput({
  keyDef,
  values,
  onChange,
  multi,
  label,
  error,
  helperText,
  disabled,
}: Readonly<RemoteValuesInputProps>) {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  // Picked options keep their labels while the resolve query catches up.
  const [known, setKnown] = useState<NetworkRuleOption[]>([]);

  const search = useNetworkRuleSourceSearch(keyDef.values.source, inputValue, {
    enabled: open,
  });
  const selected = useResolvedConditionOptions(keyDef, values, { known });
  const service = search.service;
  const isFetching = search.isLoading || search.isLoadingMore;

  const handleListboxScroll = (event: UIEvent<HTMLUListElement>) => {
    const listbox = event.currentTarget;
    const nearEnd =
      listbox.scrollTop + listbox.clientHeight >=
      listbox.scrollHeight - LOAD_MORE_THRESHOLD_PX;
    if (nearEnd) search.loadMore();
  };

  if (!search.isSupported) {
    return (
      <TextField
        fullWidth
        disabled
        label={label}
        value={values.join(', ')}
        error
        helperText={`No data source is registered for "${keyDef.values.source}"`}
      />
    );
  }

  return (
    <Autocomplete<NetworkRuleOption, true, false, false>
      multiple
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={search.options}
      value={selected.options}
      loading={isFetching || selected.isLoading}
      ListboxProps={{ onScroll: handleListboxScroll }}
      popupIcon={
        isFetching ? (
          // Same 24px box as the arrow glyph, so the spinner sits where the arrow does.
          <Box
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color='inherit' size={18} />
          </Box>
        ) : undefined
      }
      disabled={disabled}
      limitTags={4}
      disableCloseOnSelect={multi}
      filterOptions={(options) => options}
      inputValue={inputValue}
      onInputChange={(_event, next, reason) => {
        if (reason !== 'reset') setInputValue(next);
      }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, candidate) =>
        option.value === candidate.value
      }
      onChange={(_event, next) => {
        setKnown((current) => {
          const byValue = new Map(
            current.map((option) => [option.value, option]),
          );
          for (const option of next) byValue.set(option.value, option);
          return [...byValue.values()];
        });
        const nextValues = next.map((option) => option.value);
        onChange(multi ? nextValues : nextValues.slice(-1));
        setInputValue('');
      }}
      noOptionsText={inputValue.trim() ? 'No matches' : 'Type to search'}
      renderOption={(props, option, { selected: isSelected }) => {
        const { key, ...rest } = props as typeof props & { key: string };
        return (
          <li key={key} {...rest}>
            {multi && <Checkbox checked={isSelected} sx={{ mr: 1 }} />}
            {service?.renderOption
              ? service.renderOption(option)
              : option.label}
          </li>
        );
      }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index }) as ReturnType<
            typeof getTagProps
          > & { key: string };
          const chipProps: ChipProps = { ...tagProps, label: option.label };
          return (
            <Fragment key={key}>
              {service?.renderChip ? (
                service.renderChip(option, chipProps)
              ) : (
                <Chip {...chipProps} />
              )}
            </Fragment>
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={
            values.length === 0
              ? (service?.searchPlaceholder ?? 'Type to search…')
              : undefined
          }
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
