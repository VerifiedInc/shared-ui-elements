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

import { useFormField } from '../../../core/field.hook';
import { maskMemberId } from '../../../../core/formats';

type HealthPayer = {
  uuid: string;
  verifiedId: string;
  name: string;
  logoUrl?: string;
  ids?: Array<{ type: string; value: string }>;
  createdAt: number;
  updatedAt: number;
};

// Mock data for health insurance providers
const MOCK_HEALTH_INSURANCE_PROVIDERS: HealthPayer[] = [
  {
    uuid: 'aetna-uuid',
    verifiedId: 'aetna',
    name: 'Aetna',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'anthem-uuid',
    verifiedId: 'anthem',
    name: 'Anthem Blue Cross Blue Shield',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'bcbs-uuid',
    verifiedId: 'bcbs',
    name: 'Blue Cross Blue Shield',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'cigna-uuid',
    verifiedId: 'cigna',
    name: 'Cigna',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'humana-uuid',
    verifiedId: 'humana',
    name: 'Humana',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'kaiser-uuid',
    verifiedId: 'kaiser',
    name: 'Kaiser Permanente',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'medicaid-uuid',
    verifiedId: 'medicaid',
    name: 'Medicaid',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'medicare-uuid',
    verifiedId: 'medicare',
    name: 'Medicare',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'uhc-uuid',
    verifiedId: 'uhc',
    name: 'UnitedHealthcare',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    uuid: 'wellcare-uuid',
    verifiedId: 'wellcare',
    name: 'WellCare',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
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
  currentValue: Array<{
    selected?: boolean;
    memberId?: string;
    payer?: { verifiedId: string; name?: string; logoUrl?: string };
  }>;
  onAdd: (newItem: {
    selected: boolean;
    memberId: string;
    payer: { verifiedId: string; name: string; logoUrl?: string };
  }) => void;
};

function AddHealthInsuranceForm({ onAdd }: AddHealthInsuranceFormProps) {
  const { data: providers, isLoading: loading } = useHealthInsuranceProviders();
  const [selectedPayer, setSelectedPayer] = useState<HealthPayer | null>(null);
  const [newMemberId, setNewMemberId] = useState<string>('');

  const handleAddInsurance = () => {
    if (!selectedPayer || !newMemberId) return;

    const newItem = {
      selected: true,
      memberId: newMemberId,
      payer: {
        verifiedId: selectedPayer.verifiedId,
        name: selectedPayer.name,
        logoUrl: selectedPayer.logoUrl,
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
          options={providers ?? []}
          loading={loading}
          value={selectedPayer}
          onChange={(_, newValue) => {
            setSelectedPayer(newValue);
          }}
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
          value={newMemberId}
          onChange={(e) => setNewMemberId(e.target.value)}
        />
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={handleAddInsurance}
          disabled={!selectedPayer || !newMemberId}
          sx={{ alignSelf: 'flex-end' }}
        >
          Add Insurance
        </Button>
      </Stack>
    </Box>
  );
}

type HealthInsuranceItemProps = {
  item: {
    selected?: boolean;
    memberId?: string;
    payer?: { verifiedId?: string; name?: string; logoUrl?: string };
  };
  index: number;
  canDeselect: boolean;
  isDisabled: boolean;
  onToggleSelect: (index: number, currentSelected: boolean) => void;
  onDelete: (index: number) => void;
};

function HealthInsuranceItem({
  item,
  index,
  canDeselect,
  isDisabled,
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
      {!item.payer?.verifiedId && (
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

  const canDeselect = useMemo(() => {
    if (!field?.value) return false;
    return field.value.filter((item) => item.selected).length > 1;
  }, [field?.value]);

  const handleAddInsurance = (newItem: {
    selected: boolean;
    memberId: string;
    payer: { name: string; logoUrl?: string };
  }) => {
    setValue([...(field?.value ?? []), newItem]);
  };

  const handleToggleSelect = (index: number, currentSelected: boolean) => {
    if (!field?.value) return;
    if (!canDeselect && currentSelected) return;

    setValue([
      ...field.value.slice(0, index),
      { ...field.value[index], selected: !currentSelected },
      ...field.value.slice(index + 1),
    ]);
  };

  const handleDeleteInsurance = (index: number) => {
    if (!field?.value) return;
    setValue([...field.value.slice(0, index), ...field.value.slice(index + 1)]);
  };

  if (!field) return null;

  if (!field.value || !Array.isArray(field.value) || field.value.length === 0) {
    return (
      <Stack spacing={2}>
        <Typography>No health insurance information available.</Typography>
        {field?.allowUserInput && (
          <AddHealthInsuranceForm
            currentValue={field.value}
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

      {field.value.map((item, index) => (
        <HealthInsuranceItem
          key={item.payer?.verifiedId ?? index}
          item={item}
          index={index}
          canDeselect={canDeselect}
          isDisabled={!field?.allowUserInput}
          onToggleSelect={handleToggleSelect}
          onDelete={handleDeleteInsurance}
        />
      ))}

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
          currentValue={field.value}
          onAdd={handleAddInsurance}
        />
      )}
    </Stack>
  );
}
