import { useState } from 'react';
import { Box, Stack, TextField } from '@mui/material';

import { AddressInput } from '../../../../../AddressInput';

import { addressFormat } from '../../../../core/formats';
import { EmployerValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import { RequiredLabel, toFieldValueAttribute } from '../shared';

import { useOneClickForm } from '../../form.context';

type EmployerDetails = EmployerValue['employer'];
type EmployerAddress = NonNullable<EmployerDetails['address']>;
type EmployerPart = 'name' | 'address';

export function EmployerInputField({ fieldKey }: { fieldKey: string }) {
  const { options } = useOneClickForm();
  const { field, setValue } = useFormField<'employer'>({
    key: fieldKey,
  });
  const [touchedParts, setTouchedParts] = useState<
    Partial<Record<EmployerPart, boolean>>
  >({});

  if (!field) return null;

  const item = field.value;

  if (!item) return null;

  const details: EmployerDetails = item.employer;
  const address: EmployerAddress = details.address ?? {};
  const userPrivacyEnabled = options.features.enableUserPrivacy;

  const touchPart = (part: EmployerPart) => {
    setTouchedParts((prev) => (prev[part] ? prev : { ...prev, [part]: true }));
  };

  const updateDetails = (patch: Partial<EmployerDetails>) => {
    setValue({ employer: { ...details, ...patch } });
  };

  const issues = field.errors?.error?.issues ?? [];
  const errorFor = (part: EmployerPart): string | undefined => {
    if (!field.touched && !touchedParts[part]) return undefined;
    return issues.find((issue: any) => issue.path[1] === part)?.message;
  };

  const nameError = errorFor('name');
  const addressError = errorFor('address');

  return (
    <Stack spacing={2}>
      <TextField
        data-testid='data-field-atomic-employer.name'
        data-verified-sdk-field-value={toFieldValueAttribute(
          details.name,
          userPrivacyEnabled,
        )}
        fullWidth
        size='small'
        label={<RequiredLabel required={field.isRequired}>Name</RequiredLabel>}
        value={details.name ?? ''}
        onChange={(e) => {
          updateDetails({ name: e.target.value });
          touchPart('name');
        }}
        onBlur={() => touchPart('name')}
        error={!!nameError}
        helperText={nameError}
        disabled={field.isDisabled}
        InputProps={{ 'data-mask-me': true } as any}
        inputProps={{ autoCorrect: 'off' }}
      />
      <Box
        data-testid='data-field-composite-employer.address'
        data-verified-sdk-field-value={toFieldValueAttribute(
          address.line1 ? addressFormat(address) : undefined,
          userPrivacyEnabled,
        )}
        width='100%'
      >
        <AddressInput
          size='small'
          label='Address'
          defaultValue={{
            line1: address.line1,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country ?? 'US',
          }}
          onChange={(value) => {
            if (typeof value === 'string') return;
            if (value === null) {
              updateDetails({ address: undefined });
              touchPart('address');
              return;
            }
            const nextAddress: EmployerAddress = {
              line1: value.line1,
              line2: address.line2 ?? '',
              city: value.city,
              state: value.state,
              zipCode: value.zipCode,
              country: value.country === 'US' ? 'US' : undefined,
            };
            updateDetails({ address: nextAddress });
            touchPart('address');
          }}
          onBlur={() => touchPart('address')}
          error={!!addressError}
          helperText={addressError}
          disabled={field.isDisabled}
          InputProps={{ 'data-mask-me': true } as any}
          service={{
            googlePlacesAutocompletePlaces:
              options.servicePaths.googlePlacesAutocompletePlaces,
            googlePlacesGetPlace: options.servicePaths.googlePlacesGetPlace,
          }}
        />
      </Box>
      <TextField
        data-testid='data-field-atomic-employer.address.line2'
        data-verified-sdk-field-value={toFieldValueAttribute(
          address.line2,
          userPrivacyEnabled,
        )}
        fullWidth
        size='small'
        label='Line 2'
        value={address.line2 ?? ''}
        onChange={(e) =>
          updateDetails({ address: { ...address, line2: e.target.value } })
        }
        disabled={field.isDisabled}
        InputProps={{ 'data-mask-me': true } as any}
        inputProps={{ autoCorrect: 'off' }}
      />
    </Stack>
  );
}
