import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import { MemberIdInput } from '../../../../../MemberIdInput';
import { HealthPayersInput } from '../../../../../HealthPayersInput';

import { HealthInsuranceValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

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
  const { options } = useOneClickForm();
  const { field, setValue } = useFormField<'healthInsurance'>({
    key: fieldKey,
  });

  if (!field) return null;

  const item = field.value;

  if (!item) return null;

  const updateItem = (patch: Partial<HealthInsuranceValue>) => {
    setValue({ ...item, ...patch });
  };

  return (
    <Stack spacing={2}>
      <HealthPayersInput
        size='small'
        disabled={field.isDisabled}
        value={item.payer}
        fetchPayers={options.servicePaths.oneClickHealthProviderPayers}
        onChange={(payer) => {
          if (payer) {
            updateItem({ payer, memberId: '' });
          } else {
            updateItem({
              payer: { name: '', logoUrl: undefined, verifiedId: '' },
              memberId: '',
            });
          }
        }}
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
