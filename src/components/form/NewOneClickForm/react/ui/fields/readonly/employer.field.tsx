import { MenuItem, Stack, Typography } from '@mui/material';

import { addressFormat } from '../../../../core/formats';
import { EmployerValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import {
  FieldLabelBase,
  FieldSectionContent,
  FieldSectionTitle,
} from '../style';
import { VariantSelectField } from './variantSelect.field';

type EmployerDetails = EmployerValue['employer'];

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
  const address = addressFormat(item.address);
  const fieldValue = (value: string | null | undefined) =>
    options.features.enableUserPrivacy ? undefined : (value ?? undefined);

  return (
    <Stack spacing={1.25}>
      <EmployerRow
        label='Name'
        value={item.name}
        testId='data-field-atomic-employer.name'
        fieldValue={fieldValue(item.name)}
      />
      {item.legalName && (
        <EmployerRow
          label='Legal Name'
          value={item.legalName}
          testId='data-field-atomic-employer.legalName'
          fieldValue={fieldValue(item.legalName)}
        />
      )}
      <EmployerRow
        label='Address'
        value={address ?? '-'}
        testId='data-field-composite-employer.address'
        fieldValue={fieldValue(address)}
      />
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
      {variants.map((variant) => (
        <MenuItem
          key={variant.id}
          value={variant.id}
          onClick={(e) => e.stopPropagation()}
          sx={{ maxWidth: '100%', whiteSpace: 'pre-wrap' }}
        >
          <Typography variant='body1' fontWeight={500}>
            {variant.displayValue ?? '-'}
          </Typography>
        </MenuItem>
      ))}
    </VariantSelectField>
  );
}
