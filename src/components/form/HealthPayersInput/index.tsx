import { useCallback, useRef, useState, type ReactNode } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Stack,
  TextField,
  Typography,
  type TextFieldProps,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { useDebounceValue } from '../../../hooks/useDebounceValue';

export type HealthPayer = {
  verifiedId: string;
  name: string;
  logoUrl?: string | null;
};

export type FetchHealthPayers = (
  params?: { search?: string; limit?: number; skip?: number },
  signal?: AbortSignal,
) => Promise<unknown>;

export interface HealthPayersInputProps {
  /** Currently selected payer. */
  value?: HealthPayer | null;
  /** Called with the selected payer, or null when cleared. */
  onChange?: (payer: HealthPayer | null) => void;
  /** Fetches the payer options. Receives `{ search, limit, skip }` for pagination. */
  fetchPayers?: FetchHealthPayers;
  disabled?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  placeholder?: string;
  size?: TextFieldProps['size'];
  /** Optional React Query client. When omitted, an internal one is used. */
  queryClient?: QueryClient;
}

const PROVIDERS_PAGE_SIZE = 20;

function useHealthInsuranceProviders(
  search: string,
  fetchPayers?: FetchHealthPayers,
) {
  const debouncedSearch = useDebounceValue(search, 300);
  const [allProviders, setAllProviders] = useState<HealthPayer[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const skipRef = useRef(0);

  const { isLoading: isFetching } = useQuery({
    queryKey: ['insurance-providers', debouncedSearch],
    queryFn: async ({ signal }) => {
      const result = await fetchPayers?.(
        {
          search: debouncedSearch || undefined,
          limit: PROVIDERS_PAGE_SIZE,
          skip: 0,
        },
        signal,
      );

      const providers = (result as HealthPayer[]) ?? [];

      skipRef.current = providers.length;
      setAllProviders(providers);
      setHasMore(providers.length >= PROVIDERS_PAGE_SIZE);

      return providers;
    },
    refetchOnMount: true,
    enabled: !!fetchPayers,
  });

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const result = await fetchPayers?.({
        search: debouncedSearch || undefined,
        limit: PROVIDERS_PAGE_SIZE,
        skip: skipRef.current,
      });
      const newProviders = (result as HealthPayer[]) ?? [];

      setAllProviders((prev) => [...prev, ...newProviders]);
      skipRef.current += newProviders.length;
      setHasMore(newProviders.length >= PROVIDERS_PAGE_SIZE);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, debouncedSearch, fetchPayers]);

  return {
    providers: allProviders,
    isLoading: isFetching,
    isLoadingMore,
    hasMore,
    loadMore,
  };
}

function RequiredLabel({ children }: { children: ReactNode }) {
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

function HealthPayersInputContent({
  value,
  onChange,
  fetchPayers,
  disabled,
  label = <RequiredLabel>Insurer</RequiredLabel>,
  helperText = 'The company that provides your health insurance',
  placeholder = 'Search...',
  size,
}: Readonly<Omit<HealthPayersInputProps, 'queryClient'>>) {
  const [searchInput, setSearchInput] = useState('');
  const { providers, isLoading, isLoadingMore, hasMore, loadMore } =
    useHealthInsuranceProviders(searchInput, fetchPayers);
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

  const selectedPayer =
    providers.find((p) => p.verifiedId === value?.verifiedId) ?? value ?? null;

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      options={providers}
      loading={isLoading || isLoadingMore}
      filterOptions={(x) => x}
      value={selectedPayer?.verifiedId ? selectedPayer : null}
      inputValue={searchInput}
      onInputChange={(_, newInputValue) => {
        setSearchInput(newInputValue);
      }}
      onChange={(_, newValue) => {
        if (newValue) {
          onChange?.({
            name: newValue.name,
            logoUrl: newValue.logoUrl,
            verifiedId: newValue.verifiedId,
          });
        } else {
          onChange?.(null);
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
              src={option.logoUrl ?? undefined}
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
          label={label}
          helperText={helperText}
          placeholder={placeholder}
          size={size}
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
  );
}

/**
 * Standalone autocomplete for selecting a health insurance payer (insurer).
 *
 * Extracted from the 1-Click health insurance field so it can be reused on its
 * own. Provide `fetchPayers` to supply the options (it receives
 * `{ search, limit, skip }` and should return an array of payers); the component
 * handles debounced search and infinite-scroll pagination internally.
 *
 * Self-contained: it provides its own React Query client unless `queryClient`
 * is passed.
 */
export function HealthPayersInput({
  queryClient,
  ...props
}: Readonly<HealthPayersInputProps>) {
  const [internalQueryClient] = useState(
    () =>
      queryClient ??
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: Infinity,
            retryDelay: 3000,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={internalQueryClient}>
      <HealthPayersInputContent {...props} />
    </QueryClientProvider>
  );
}
