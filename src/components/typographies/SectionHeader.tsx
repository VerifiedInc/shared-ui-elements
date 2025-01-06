import { Typography, type TypographyProps } from '@mui/material';

/**
 * A typography component for section header text
 * A secondary header, it is intended for use with sections within a page, below the PageHeader
 */
export const SectionHeader = ({
  children,
  ...props
}: TypographyProps): JSX.Element => {
  return (
    <Typography variant='h2' textAlign='center' fontWeight={900} {...props}>
      {children}
    </Typography>
  );
};
