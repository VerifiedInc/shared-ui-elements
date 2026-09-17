import { Typography, type TypographyProps } from '@mui/material';

/**
 * The small uppercase label that heads a section inside a panel — a rule's conditions, a filter
 * group. One definition, so the four places that used to spell out the same `sx` agree.
 */
export function SectionLabel({ sx, ...props }: Readonly<TypographyProps>) {
  return (
    <Typography
      {...props}
      sx={[
        {
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
