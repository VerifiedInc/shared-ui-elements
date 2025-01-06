import { Typography, type TypographyProps } from '@mui/material';

/**
 * A typography component for paragraph text
 * The primary text component, intended for use for most body content text.
 */
export const Paragraph = ({ children, sx, ...props }: TypographyProps) => {
  return (
    <Typography
      variant='body1'
      textAlign='center'
      width='100%'
      marginTop={2}
      sx={{ ...sx, wordBreak: 'break-word' }}
      {...props}
    >
      {children}
    </Typography>
  );
};
