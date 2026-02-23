import { MenuItem, Stack, SxProps, Typography } from '@mui/material';

import { useFormField } from '../../../core/field.hook';

import { FieldLabelBase } from '../style';
import { VariantSelectField } from './variantSelect.field';

const menuStyle: SxProps = {
  maxWidth: '100%',
  whiteSpace: 'pre-wrap',
};

const SUB_FIELDS: Array<{ key: string; label: string }> = [
  { key: 'documentNumber', label: 'Number' },
  { key: 'issuanceState', label: 'State' },
  { key: 'issuanceDate', label: 'Issued' },
  { key: 'expirationDate', label: 'Expires' },
  { key: 'address', label: 'Address' },
];

function DriversLicenseSummaryRows({
  fieldChildren,
}: {
  fieldChildren: Record<string, { displayValue?: string | null }> | undefined;
}) {
  return (
    <Stack spacing={1.5} py={1}>
      {SUB_FIELDS.map(({ key, label }) => {
        const child = fieldChildren?.[key];
        if (!child) return null;

        return (
          <Stack key={key} direction='row'>
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
              {child.displayValue}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

export function DriversLicenseField({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });

  if (!field || !field.hasVariants) return null;

  const variants = field.variants ?? [];

  return (
    <VariantSelectField
      fieldKey={fieldKey}
      testId={`data-drivers-license-select-${fieldKey}`}
      renderValue={() => (
        <DriversLicenseSummaryRows fieldChildren={field.children} />
      )}
    >
      {variants.map((variant) => {
        const docNumber = variant.children?.documentNumber?.displayValue;
        const state = variant.children?.issuanceState?.displayValue;
        const label = [docNumber, state].filter(Boolean).join(' — ') || '-';

        return (
          <MenuItem
            key={variant.id}
            value={variant.id}
            onClick={(e) => e.stopPropagation()}
            sx={menuStyle}
          >
            {label}
          </MenuItem>
        );
      })}
    </VariantSelectField>
  );
}
