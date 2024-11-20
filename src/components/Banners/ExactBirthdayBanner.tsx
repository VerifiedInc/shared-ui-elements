import { type SxProps } from '@mui/material';
import { Banner } from './Banner';

/**
 * "Enter your exact Birthday" Banner
 */
export function ExactBirthdayBanner({
  sx,
}: {
  sx?: SxProps;
}): React.JSX.Element {
  return (
    <Banner title='Enter your exact Birthday' severity='info' sx={sx}>
      We need this to verify your identity with your phone carrier and pre-fill
      your signup info.
    </Banner>
  );
}
