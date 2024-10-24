import { Box, Typography, useTheme } from '@mui/material';

import LegalLink from './LegalLink';

export const AcceptTermsNotice = ({
  legalLinkUrl = 'https://www.verified.inc/legal#terms-of-use',
}): React.JSX.Element => {
  const theme = useTheme();
  return (
    <Box display='inline-block'>
      <Typography
        align='center'
        sx={{
          fontSize: '.75rem',
          fontWeight: 400,
          color: theme.palette.neutral.main,
          lineHeight: 1.25,
        }}
      >
        By continuing, you agree to Verified’s{' '}
        <LegalLink href={legalLinkUrl}>Terms of Use</LegalLink>.
      </Typography>
    </Box>
  );
};
