import { Avatar, MenuItem, Stack, Typography } from '@mui/material';

import { addressFormat } from '../../../../core/formats';
import { EmployerValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import { toFieldValueAttribute } from '../shared';

import {
  FieldLabelBase,
  FieldSectionContent,
  FieldSectionTitle,
} from '../style';
import { VariantSelectField } from './variantSelect.field';

type EmployerDetails = EmployerValue['employer'];

const LOGO_SIZE = 48;

function EmployerLogo({
  name,
  logoUrl,
  size,
}: {
  name: string;
  logoUrl?: string | null;
  size: number;
}) {
  return (
    <Avatar
      draggable={false}
      src={logoUrl ?? ''}
      sx={{
        bgcolor: 'primary.main',
        width: size,
        height: size,
        borderRadius: size >= LOGO_SIZE ? 2 : 1,
        flexShrink: 0,
      }}
      slotProps={{
        img: {
          onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = 'none';
          },
        },
      }}
    >
      {name[0]?.toUpperCase()}
    </Avatar>
  );
}

function EmployerRow({
  label,
  value,
  testId,
  fieldValue,
}: {
  label: string;
  value: string;
  testId: string;
  fieldValue?: string;
}) {
  return (
    <Stack
      direction='row'
      data-testid={testId}
      data-verified-sdk-field-value={fieldValue}
    >
      <FieldLabelBase label={label} />
      <Typography
        data-mask-me
        variant='body1'
        sx={{
          fontSize: 20,
          fontWeight: 300,
          wordBreak: 'break-word',
          textAlign: 'left',
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

function EmployerRows({ item }: { item: EmployerDetails }) {
  const { options } = useOneClickForm();
  const userPrivacyEnabled = options.features.enableUserPrivacy;
  const address = item.address?.line1 ? addressFormat(item.address) : null;

  const rows = (
    <Stack spacing={1.25}>
      <EmployerRow
        label='Name'
        value={item.name}
        testId='data-field-atomic-employer.name'
        fieldValue={toFieldValueAttribute(item.name, userPrivacyEnabled)}
      />
      {address && (
        <EmployerRow
          label='Address'
          value={address}
          testId='data-field-composite-employer.address'
          fieldValue={toFieldValueAttribute(address, userPrivacyEnabled)}
        />
      )}
    </Stack>
  );

  if (!item.logoUrl) return rows;

  return (
    <Stack direction='row' spacing={1.5} py={1}>
      <EmployerLogo name={item.name} logoUrl={item.logoUrl} size={LOGO_SIZE} />
      {rows}
    </Stack>
  );
}

export function EmployerField({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField<'employer'>({ key: fieldKey });

  if (!field) return null;

  if (!field.hasVariants) {
    const item = field.value?.employer;

    if (!item) return null;

    return (
      <Stack spacing={1.25}>
        <FieldSectionTitle fieldKey={fieldKey} />
        <FieldSectionContent spacing={1.25}>
          <EmployerRows item={item} />
        </FieldSectionContent>
      </Stack>
    );
  }

  const variants = field.variants ?? [];

  return (
    <VariantSelectField
      fieldKey={fieldKey}
      testId={`data-employer-select-${fieldKey}`}
      renderValue={() => {
        const item = field.value?.employer;
        return item ? <EmployerRows item={item} /> : null;
      }}
    >
      {variants.map((variant) => {
        const details = variant.value?.employer;
        const name = details?.name ?? variant.displayValue ?? '-';
        const address = details?.address?.line1
          ? addressFormat(details.address)
          : null;

        return (
          <MenuItem
            key={variant.id}
            value={variant.id}
            onClick={(e) => e.stopPropagation()}
            sx={{ maxWidth: '100%', whiteSpace: 'pre-wrap' }}
          >
            <Stack direction='row' spacing={1.5} alignItems='center'>
              <EmployerLogo name={name} logoUrl={details?.logoUrl} size={32} />
              <Stack sx={{ alignItems: 'flex-start', textAlign: 'left' }}>
                <Typography variant='body1' fontWeight={500}>
                  {name}
                </Typography>
                {address && (
                  <Typography variant='body2' color='text.primary'>
                    {address}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </MenuItem>
        );
      })}
    </VariantSelectField>
  );
}
