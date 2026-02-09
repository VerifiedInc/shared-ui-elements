import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DeleteOutline, Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';

import {
  AnimateHeight,
  MotionBox,
} from '../../../../../../../components/animation';
import { useDebounceValue } from '../../../../../../../hooks/useDebounceValue';

import { maskMemberId } from '../../../../core/formats';
import { HealthInsuranceValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

type Payer = HealthInsuranceValue[number]['payer'];

const PROVIDERS_PAGE_SIZE = 20;

function useHealthInsuranceProviders(search: string) {
  const { options } = useOneClickForm();
  const debouncedSearch = useDebounceValue(search, 300);
  const [allProviders, setAllProviders] = useState<Payer[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const skipRef = useRef(0);

  const { isFetching } = useQuery({
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

      // Reset pagination state for initial page
      skipRef.current = providers.length;
      setAllProviders(providers);
      setHasMore(providers.length >= PROVIDERS_PAGE_SIZE);

      return providers;
    },
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

type AddHealthInsuranceFormProps = {
  fieldKey: string;
  disabled: boolean;
  onAdd: (newItem: HealthInsuranceValue[number]) => void;
};

function AddHealthInsuranceForm({
  fieldKey,
  disabled,
  onAdd,
}: AddHealthInsuranceFormProps) {
  const { value } = useFormField<'healthInsurance'>({ key: fieldKey });
  const [searchInput, setSearchInput] = useState('');
  const { providers, isLoading, isLoadingMore, hasMore, loadMore } =
    useHealthInsuranceProviders(searchInput);
  const [selectedPayer, setSelectedPayer] = useState<Payer | null>(null);
  const [newMemberId, setNewMemberId] = useState<string>('');
  const listboxRef = useRef<HTMLUListElement | null>(null);

  // Filter out providers that already exist in currentValue with verifiedId
  const existingVerifiedIds = useMemo(() => {
    if (!value || !Array.isArray(value)) return new Set<string>();
    return new Set(
      value
        .map((item) => item.payer?.verifiedId)
        .filter((id): id is string => !!id),
    );
  }, [value]);

  // Also track existing payer names to avoid duplicates
  const existingPayerNames = useMemo(() => {
    if (!value || !Array.isArray(value)) return new Set<string>();
    return new Set(
      value
        .map((item) => item.payer?.name)
        .filter((name): name is string => !!name),
    );
  }, [value]);

  const availableProviders = useMemo(() => {
    return providers.filter(
      (provider) =>
        !existingVerifiedIds.has(provider.verifiedId) &&
        !existingPayerNames.has(provider.name),
    );
  }, [providers, existingVerifiedIds, existingPayerNames]);

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

  const handleAddInsurance = () => {
    if (!selectedPayer || !newMemberId) return;

    const newItem = {
      selected: true,
      memberId: newMemberId,
      payer: {
        name: selectedPayer.name,
        logoUrl: selectedPayer.logoUrl,
        verifiedId: selectedPayer.verifiedId,
      },
    };

    onAdd(newItem);
    setSelectedPayer(null);
    setNewMemberId('');
    setSearchInput('');
  };

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack spacing={2} alignItems='flex-start' width='100%'>
        <Typography
          variant='subtitle2'
          fontWeight={600}
          sx={{ textAlign: 'left' }}
        >
          Add New Insurance
        </Typography>
        <Autocomplete
          fullWidth
          disabled={disabled}
          options={availableProviders}
          loading={isLoading || isLoadingMore}
          filterOptions={(x) => x}
          value={selectedPayer}
          inputValue={searchInput}
          onInputChange={(_, newInputValue) => {
            setSearchInput(newInputValue);
          }}
          onChange={(_, newValue) => {
            setSelectedPayer(newValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.verifiedId === value.verifiedId
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
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                  }}
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
                <Typography sx={{ textAlign: 'left' }}>
                  {option.name}
                </Typography>
              </Stack>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <>
                  {'Insurance Provider'}{' '}
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
              }
              placeholder='Search providers...'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color='primary' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          fullWidth
          label={
            <>
              {'Member ID'}{' '}
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
          }
          placeholder='Enter member ID'
          size='small'
          disabled={disabled}
          value={newMemberId}
          onChange={(e) => setNewMemberId(e.target.value)}
        />
        <Button
          fullWidth
          variant='contained'
          startIcon={<Add />}
          onClick={handleAddInsurance}
          disabled={disabled || !selectedPayer || !newMemberId}
        >
          Add Insurance
        </Button>
      </Stack>
    </Box>
  );
}

type HealthInsuranceItemProps = {
  item: HealthInsuranceValue[number];
  index: number;
  canDeselect: boolean;
  isDisabled: boolean;
  isUserAdded: boolean;
  onToggleSelect: (index: number, currentSelected: boolean) => void;
  onDelete: (index: number) => void;
};

function HealthInsuranceItem({
  item,
  index,
  canDeselect,
  isDisabled,
  isUserAdded,
  onToggleSelect,
  onDelete,
}: HealthInsuranceItemProps) {
  const isSelected = item.selected ?? false;

  return (
    <Box
      key={item.payer?.verifiedId ?? index}
      component={ButtonBase}
      aria-label={`${item.payer?.name} insurance`}
      role='button'
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!canDeselect && isSelected) return;

        onToggleSelect(index, isSelected);
      }}
      disabled={isDisabled}
      sx={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        userSelect: 'none',
        cursor: 'pointer',
        ...(isSelected
          ? {
              border: '1px solid',
              borderColor: 'primary.main',
            }
          : {
              border: '1px dashed',
              borderColor: 'muted.main',
            }),
        borderRadius: 1,
        p: 2,
        backgroundColor: isSelected ? 'muted.main' : 'background.paper',
        transition:
          'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out',
      }}
    >
      <Stack flex={1} direction='row' spacing={1}>
        <Box>
          <Avatar
            draggable={false}
            src={item?.payer?.logoUrl ?? ''}
            sx={{
              bgcolor: item?.payer?.logoUrl
                ? undefined
                : isSelected
                  ? 'primary.main'
                  : 'muted.main',
              width: 48,
              height: 48,
              mt: 0.5,
            }}
            slotProps={{
              img: {
                onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = 'none';
                },
              },
            }}
          >
            {item?.payer?.name?.[0]?.toUpperCase()}
          </Avatar>
        </Box>
        <Stack spacing={1} alignItems='flex-start'>
          {item?.payer?.name && (
            <Typography
              variant='body1'
              color='text.primary'
              data-mask-me
              sx={{
                fontSize: 16,
                fontWeight: isSelected ? 600 : 500,
                wordBreak: 'break-word',
                textAlign: 'left',
              }}
            >
              {item.payer.name}
            </Typography>
          )}
          {item?.memberId && (
            <Typography
              variant='body2'
              color='text.secondary'
              data-mask-me
              sx={{
                fontSize: 14,
                fontWeight: 400,
                textAlign: 'left',
              }}
            >
              Member ID: {maskMemberId(item.memberId)}
            </Typography>
          )}
        </Stack>
      </Stack>
      {isUserAdded && (
        <Stack
          alignItems='center'
          justifyContent='flex-end'
          sx={{ ml: 0.5, position: 'relative', zIndex: 1 }}
        >
          <IconButton
            aria-label={`Delete ${item.payer?.name} insurance`}
            component='div'
            role='button'
            tabIndex={0}
            color='error'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(index);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onDelete(index);
              }
            }}
            sx={{ alignSelf: 'flex-end', flexShrink: 0 }}
          >
            <DeleteOutline color='inherit' />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
}

export function HealthInsuranceField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue } = useFormField<'healthInsurance'>({
    key: fieldKey,
  });

  const [userAddedItems, setUserAddedItems] = useState<Map<string, boolean>>(
    new Map(),
  );

  const canDeselect = useMemo(() => {
    if (!field?.value) return false;
    return field.value.filter((item) => item.selected).length > 1;
  }, [field?.value]);

  const handleToggleSelect = (index: number, currentSelected: boolean) => {
    if (!field?.value) return;
    if (!canDeselect && currentSelected) return;

    setValue([
      ...field.value.slice(0, index),
      { ...field.value[index], selected: !currentSelected },
      ...field.value.slice(index + 1),
    ]);
  };

  const handleAddInsurance = (
    healthInsurance: HealthInsuranceValue[number],
  ) => {
    const newItem = structuredClone(healthInsurance);
    setValue([...(field?.value ?? []), newItem]);
    setUserAddedItems((prev) =>
      new Map(prev).set(newItem.payer.verifiedId, true),
    );
  };

  const handleDeleteInsurance = (index: number) => {
    if (!field?.value) return;
    const itemToDelete = field.value[index];

    setValue([...field.value.slice(0, index), ...field.value.slice(index + 1)]);

    // Remove from Map if it has an ID
    setUserAddedItems((prev) => {
      const newMap = new Map(prev);
      newMap.delete(itemToDelete.payer.verifiedId);
      return newMap;
    });
  };

  if (!field) return null;

  if (!field.value || !Array.isArray(field.value) || field.value.length === 0) {
    return (
      <Stack spacing={2} alignItems='flex-start'>
        <Typography sx={{ textAlign: 'left' }}>
          No health insurance information available.
        </Typography>
        {field?.allowUserInput && (
          <AddHealthInsuranceForm
            fieldKey={fieldKey}
            disabled={field.isDisabled}
            onAdd={handleAddInsurance}
          />
        )}
      </Stack>
    );
  }

  return (
    <Stack
      spacing={2}
      alignItems='flex-start'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <AnimateHeight duration={0.3}>
        <Stack spacing={2}>
          <AnimatePresence>
            {field.value.map((item, index) => (
              <MotionBox
                key={item.payer?.verifiedId ?? index}
                layout='position'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                sx={{ width: '100%' }}
              >
                <HealthInsuranceItem
                  item={item}
                  index={index}
                  canDeselect={canDeselect}
                  isDisabled={field.isDisabled}
                  isUserAdded={
                    item.payer?.verifiedId
                      ? userAddedItems.has(item.payer.verifiedId)
                      : false
                  }
                  onToggleSelect={handleToggleSelect}
                  onDelete={handleDeleteInsurance}
                />
              </MotionBox>
            ))}
          </AnimatePresence>
        </Stack>
      </AnimateHeight>
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{
          fontSize: 12,
          fontWeight: 400,
          textAlign: 'left',
        }}
      >
        Partially hidden for your privacy
      </Typography>

      {field?.allowUserInput && (
        <AddHealthInsuranceForm
          fieldKey={fieldKey}
          disabled={field.isDisabled}
          onAdd={handleAddInsurance}
        />
      )}
    </Stack>
  );
}
