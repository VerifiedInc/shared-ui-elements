import { useCallback, useRef, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';

import { useDebounceValue } from '../../../../../../../hooks/useDebounceValue';

import { MemberIdInput } from '../../../../../MemberIdInput';

import { HealthInsuranceValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

type Payer = HealthInsuranceValue['payer'];

const PROVIDERS_PAGE_SIZE = 20;

function useHealthInsuranceProviders(search: string) {
  const { options } = useOneClickForm();
  const debouncedSearch = useDebounceValue(search, 300);
  const [allProviders, setAllProviders] = useState<Payer[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const skipRef = useRef(0);

  const { isLoading: isFetching } = useQuery({
    queryKey: ['insurance-providers', debouncedSearch],
    queryFn: async ({ signal }) => {
      const result = await options.servicePaths.oneClickHealthProviderPayers?.(
        {
          search: debouncedSearch || undefined,
          limit: PROVIDERS_PAGE_SIZE,
          skip: 0,
        },
        signal,
      );

      const providers = (result as Payer[]) ?? [];

      skipRef.current = providers.length;
      setAllProviders(providers);
      setHasMore(providers.length >= PROVIDERS_PAGE_SIZE);

      return providers;
    },
    refetchOnMount: true,
    enabled: !!options.servicePaths.oneClickHealthProviderPayers,
  });

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const result = await options.servicePaths.oneClickHealthProviderPayers?.({
        search: debouncedSearch || undefined,
        limit: PROVIDERS_PAGE_SIZE,
        skip: skipRef.current,
      });
      const newProviders = (result as Payer[]) ?? [];

      setAllProviders((prev) => [...prev, ...newProviders]);
      skipRef.current += newProviders.length;
      setHasMore(newProviders.length >= PROVIDERS_PAGE_SIZE);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, debouncedSearch, options.servicePaths]);

  return {
    providers: allProviders,
    isLoading: isFetching,
    isLoadingMore,
    hasMore,
    loadMore,
  };
}

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}{' '}
      <Typography
        data-asterisk
        component='span'
        color='error'
        variant='subtitle2'
        sx={{ fontSize: 'inherit' }}
      >
        ✽
      </Typography>
    </>
  );
}

export function HealthInsuranceInputField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue } = useFormField<'healthInsurance'>({
    key: fieldKey,
  });

  const [searchInput, setSearchInput] = useState('');
  const { providers, isLoading, isLoadingMore, hasMore, loadMore } =
    useHealthInsuranceProviders(searchInput);
  const listboxRef = useRef<HTMLUListElement | null>(null);

  const handleListboxScroll = useCallback(
    (event: React.UIEvent<HTMLUListElement>) => {
      const listbox = event.currentTarget;
      const isNearBottom =
        listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 50;

      if (isNearBottom && hasMore && !isLoadingMore) {
        void loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore],
  );

  if (!field) return null;

  const item = field.value;

  if (!item) return null;

  const updateItem = (patch: Partial<HealthInsuranceValue>) => {
    setValue({ ...item, ...patch });
  };

  const selectedPayer =
    providers.find((p) => p.verifiedId === item.payer.verifiedId) ?? item.payer;

  return (
    <Stack spacing={2}>
      <Autocomplete
        fullWidth
        disabled={field.isDisabled}
        options={providers}
        loading={isLoading || isLoadingMore}
        filterOptions={(x) => x}
        value={selectedPayer.verifiedId ? selectedPayer : null}
        inputValue={searchInput}
        onInputChange={(_, newInputValue) => {
          setSearchInput(newInputValue);
        }}
        onChange={(_, newValue) => {
          if (newValue) {
            updateItem({
              payer: {
                name: newValue.name,
                logoUrl: newValue.logoUrl,
                verifiedId: newValue.verifiedId,
              },
              memberId: '',
            });
          } else {
            updateItem({
              payer: { name: '', logoUrl: '', verifiedId: '' },
              memberId: '',
            });
          }
        }}
        isOptionEqualToValue={(option, value) =>
          !!option && !!value && option.verifiedId === value.verifiedId
        }
        getOptionLabel={(option) => option.name}
        ListboxProps={{
          ref: listboxRef,
          onScroll: handleListboxScroll,
        }}
        renderOption={(props, option) => (
          <Box component='li' {...props} key={option.verifiedId}>
            <Stack direction='row' spacing={1.5} alignItems='center'>
              <Avatar
                src={option.logoUrl}
                alt={option.name[0]?.toUpperCase()}
                sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                slotProps={{
                  img: {
                    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.style.display = 'none';
                    },
                  },
                }}
              >
                {option.name[0]?.toUpperCase()}
              </Avatar>
              <Typography sx={{ textAlign: 'left' }}>{option.name}</Typography>
            </Stack>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={<RequiredLabel>Insurer</RequiredLabel>}
            helperText='The company that provides your health insurance'
            placeholder='Search...'
            size='small'
            InputLabelProps={{ shrink: true }}
            InputProps={
              {
                ...params.InputProps,
                'data-mask-me': true,
                endAdornment: params.InputProps.endAdornment,
              } as any
            }
          />
        )}
      />

      <MemberIdInput
        fullWidth
        label={<RequiredLabel>Member ID</RequiredLabel>}
        placeholder='Enter member ID'
        size='small'
        disabled={field.isDisabled}
        value={item.memberId}
        onChange={(e) => updateItem({ memberId: e.target.value })}
        helperText='From your health insurance ID card'
        InputProps={
          {
            'data-mask-me': true,
            endAdornment: item.memberId ? (
              <InputAdornment position='end'>
                <IconButton
                  tabIndex={-1}
                  aria-label='clear member id'
                  edge='end'
                  size='small'
                  disabled={field.isDisabled}
                  onClick={() => updateItem({ memberId: '' })}
                >
                  <Close fontSize='small' />
                </IconButton>
              </InputAdornment>
            ) : null,
          } as any
        }
      />
    </Stack>
  );
}
