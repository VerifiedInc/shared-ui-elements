import { Box, type SxProps } from '@mui/material';
import { Banner } from './Banner';

/**
 * Banner to inform about the test phone numbers
 */
export function TestPhoneNumbersBanner({
  sx,
}: {
  sx?: SxProps;
}): React.JSX.Element {
  return (
    <Banner title='Test Phone Numbers' severity='info' sx={sx}>
      <Box
        component='ul'
        sx={{
          listStyle: 'inside',
        }}
      >
        <li>Phone Only Input: +10123456789</li>
        <li>Phone and Birth Date Inputs: +10019999999</li>
      </Box>
    </Banner>
  );
}
