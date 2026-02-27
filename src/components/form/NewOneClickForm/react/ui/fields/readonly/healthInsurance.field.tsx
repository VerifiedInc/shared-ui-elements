import { Avatar, MenuItem, Stack, SxProps, Typography } from '@mui/material';

import { maskMemberId } from '../../../../core/formats';
import { HealthInsuranceValue } from '../../../../core/validations';

import { useFormField } from '../../../core/field.hook';

import {
  FieldDescriptionBase,
  FieldLabelBase,
  FieldSectionContent,
  FieldSectionTitle,
} from '../style';
import { VariantSelectField } from './variantSelect.field';

const LOGO_SIZE = 48;

const fieldInputDisabledStyle: SxProps = {
  pointerEvents: 'auto',
};

function InsuranceRows({ item }: { item: HealthInsuranceValue }) {
  return (
    <Stack py={1}>
      {/* INSURER row */}
      <Stack direction='row' sx={{ flex: 1 }} spacing={1.5}>
        <Avatar
          draggable={false}
          src={item.payer?.logoUrl ?? ''}
          sx={{
            bgcolor: 'primary.main',
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            borderRadius: 2,
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
          {item.payer?.name?.[0]?.toUpperCase()}
        </Avatar>
        <Stack direction='column' spacing={1.5}>
          <Stack direction='row' spacing={1.5}>
            {/* Label + value matching FieldRow alignment */}
            <Stack direction='row' sx={{ flex: 1 }}>
              <FieldLabelBase label='Insurer' />
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
                {item.payer?.name}
              </Typography>
            </Stack>
          </Stack>

          {/* MEMBER ID row — indented past logo to align with text */}
          <Stack direction='row'>
            <FieldLabelBase label='Member ID' />
            <Stack>
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
                {maskMemberId(item.memberId)}
              </Typography>
              <FieldDescriptionBase description='Hidden for privacy' />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export function HealthInsuranceField({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField<'healthInsurance'>({ key: fieldKey });

  if (!field) return null;

  if (!field.hasVariants) {
    const item = field.value;

    if (!item?.payer?.name) {
      return (
        <Typography sx={{ textAlign: 'left' }}>
          No health insurance information available.
        </Typography>
      );
    }

    return (
      <Stack
        spacing={1.25}
        sx={fieldInputDisabledStyle}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <FieldSectionTitle fieldKey={fieldKey} />
        <FieldSectionContent spacing={1.25}>
          <InsuranceRows item={item} />
        </FieldSectionContent>
      </Stack>
    );
  }

  const variants = field.variants ?? [];

  return (
    <VariantSelectField
      fieldKey={fieldKey}
      testId={`data-health-insurance-select-${fieldKey}`}
      renderValue={() => {
        const item = field.value;
        return item ? <InsuranceRows item={item} /> : null;
      }}
    >
      {variants.map((variant) => {
        const item = variant.value;
        const payerName = item?.payer?.name ?? '-';
        const memberId = item?.memberId ? maskMemberId(item.memberId) : '-';

        return (
          <MenuItem
            key={variant.id}
            value={variant.id}
            onClick={(e) => e.stopPropagation()}
            sx={{ maxWidth: '100%', whiteSpace: 'pre-wrap' }}
          >
            <Stack direction='row' spacing={1.5} alignItems='center'>
              <Avatar
                draggable={false}
                src={item?.payer?.logoUrl ?? ''}
                sx={{
                  bgcolor: 'primary.main',
                  width: 32,
                  height: 32,
                  borderRadius: 1,
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
                {item?.payer?.name?.[0]?.toUpperCase()}
              </Avatar>
              <Stack sx={{ alignItems: 'flex-start', textAlign: 'left' }}>
                <Typography variant='body1' fontWeight={500}>
                  {payerName}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {memberId}
                </Typography>
              </Stack>
            </Stack>
          </MenuItem>
        );
      })}
    </VariantSelectField>
  );
}
