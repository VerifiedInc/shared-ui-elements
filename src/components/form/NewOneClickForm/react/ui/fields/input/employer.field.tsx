import { useState } from 'react';
import { Box, Stack, TextField } from '@mui/material';

import { AddressInput } from '../../../../../AddressInput';

import { EmployerValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import { RequiredLabel } from '../shared';

import { useOneClickForm } from '../../form.context';

type EmployerDetails = EmployerValue['employer'];
type EmployerPart = 'name' | 'legalName' | 'address';

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
  const legalNameError = errorFor('legalName');
  const addressError = errorFor('address');

  return (
    <Stack spacing={2}>
      <TextField
        data-testid='data-field-atomic-employer.name'
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
      <TextField
        data-testid='data-field-atomic-employer.legalName'
        fullWidth
        size='small'
        label='Legal Name'
        value={details.legalName ?? ''}
        onChange={(e) => {
          updateDetails({ legalName: e.target.value || undefined });
          touchPart('legalName');
        }}
        onBlur={() => touchPart('legalName')}
        error={!!legalNameError}
        helperText={legalNameError}
        disabled={field.isDisabled}
        InputProps={{ 'data-mask-me': true } as any}
        inputProps={{ autoCorrect: 'off' }}
      />
      <Box data-testid='data-field-composite-employer.address' width='100%'>
        <AddressInput
          size='small'
          label={
            <RequiredLabel required={field.isRequired}>Address</RequiredLabel>
          }
          defaultValue={{
            line1: details.address.line1,
            city: details.address.city,
            state: details.address.state,
            zipCode: details.address.zipCode,
            country: details.address.country ?? 'US',
          }}
          onChange={(value) => {
            if (typeof value === 'string') return;
            const address: EmployerDetails['address'] = {
              line1: value?.line1,
              line2: details.address.line2 ?? '',
              city: value?.city,
              state: value?.state,
              zipCode: value?.zipCode,
              country: value?.country === 'US' ? 'US' : undefined,
            };
            updateDetails({ address });
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
        fullWidth
        size='small'
        label='Line 2'
        value={details.address.line2 ?? ''}
        onChange={(e) =>
          updateDetails({
            address: { ...details.address, line2: e.target.value },
          })
        }
        disabled={field.isDisabled}
        InputProps={{ 'data-mask-me': true } as any}
        inputProps={{ autoCorrect: 'off' }}
      />
    </Stack>
  );
}
