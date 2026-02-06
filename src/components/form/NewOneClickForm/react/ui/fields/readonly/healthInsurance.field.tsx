import { useMemo, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonBase,
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

import { maskMemberId } from '../../../../core/formats';
import { HealthInsuranceValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

type Payer = HealthInsuranceValue[number]['payer'];

// Mock data for health insurance providers
const MOCK_HEALTH_INSURANCE_PROVIDERS: Payer[] = [
  {
    verifiedId: 'V9980890',
    name: 'Aetna',
    logoUrl: 'https://renatozupo.com.br/storage/unnamed-768x768.jpg',
  },
  { verifiedId: 'V989089', name: 'Anthem Blue Cross Blue Shield' },
  { verifiedId: 'V4352321', name: 'Blue Cross Blue Shield' },
  { verifiedId: 'V9483759', name: 'Cigna' },
  { verifiedId: 'V57459834', name: 'Humana' },
  { verifiedId: 'V32567324', name: 'Kaiser Permanente' },
  { verifiedId: 'V58943751', name: 'Medicaid' },
  { verifiedId: 'V098765', name: 'Medicare' },
  { verifiedId: 'V09876543', name: 'UnitedHealthcare' },
  { verifiedId: 'V567898765', name: 'WellCare' },
];

/**
 * Hook to fetch health insurance providers from API
 * Currently mocked - will be replaced with actual API call
 */
function useHealthInsuranceProviders() {
  return useQuery({
    queryKey: ['insurance-providers'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return MOCK_HEALTH_INSURANCE_PROVIDERS;
    },
  });
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
  const { data: providers, isLoading: loading } = useHealthInsuranceProviders();
  const [selectedPayer, setSelectedPayer] = useState<Payer | null>(null);
  const [newMemberId, setNewMemberId] = useState<string>('');

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
    if (!providers) return [];
    return providers.filter(
      (provider) =>
        !existingVerifiedIds.has(provider.verifiedId) &&
        !existingPayerNames.has(provider.name),
    );
  }, [providers, existingVerifiedIds, existingPayerNames]);

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
  };

  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack spacing={2}>
        <Typography variant='subtitle2' fontWeight={600}>
          Add New Insurance
        </Typography>
        <Autocomplete
          disabled={disabled}
          options={availableProviders}
          loading={loading}
          value={selectedPayer}
          onChange={(_, newValue) => {
            setSelectedPayer(newValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.verifiedId === value.verifiedId
          }
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component='li' {...props} key={props.key}>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <Avatar
                  src={option.logoUrl}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: option.logoUrl ? undefined : 'primary.main',
                  }}
                >
                  {!option.logoUrl && option.name[0]?.toUpperCase()}
                </Avatar>
                <Typography>{option.name}</Typography>
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
              placeholder='Select provider'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <TextField
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
          variant='contained'
          startIcon={<Add />}
          onClick={handleAddInsurance}
          disabled={disabled || !selectedPayer || !newMemberId}
          sx={{ alignSelf: 'flex-end' }}
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
          >
            {!item?.payer?.logoUrl && item?.payer?.name?.[0]?.toUpperCase()}
          </Avatar>
        </Box>
        <Stack spacing={1}>
          {item?.payer?.name && (
            <Typography
              variant='body1'
              color='text.primary'
              data-mask-me
              sx={{
                fontSize: 16,
                fontWeight: isSelected ? 600 : 500,
                wordBreak: 'break-word',
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
            <DeleteOutline />
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
      <Stack spacing={2}>
        <Typography>No health insurance information available.</Typography>
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Typography variant='subtitle2' fontWeight={600}>
        Selected Health Insurances (
        {field.value.filter((item) => item.selected).length})
      </Typography>

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
                  isUserAdded={userAddedItems.has(item.payer.verifiedId)}
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
        }}
      >
        Member ID partially hidden for your privacy
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
