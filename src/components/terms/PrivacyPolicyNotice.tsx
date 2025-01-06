import { Box, Typography, useTheme } from '@mui/material';

import { LegalLink } from './LegalLink';

export const PrivacyPolicyNotice = () => {
  const theme = useTheme();
  return (
    <Box marginTop={2}>
      <Typography
        align='center'
        sx={{
          fontSize: '.75rem',
          fontWeight: 400,
          color: theme.palette.neutral.main,
          lineHeight: 1.25,
        }}
      >
        To learn about how Verified processes your personal information, please
        see our{' '}
        <LegalLink href='https://www.verified.inc/legal#privacy-policy'>
          Privacy Policy
        </LegalLink>
        .
      </Typography>
    </Box>
  );
};
