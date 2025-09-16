import { type SxProps, useTheme } from '@mui/material';
import { FullWidthAlert } from '../Alert/FullWidthAlert';
import { Button } from '../Button';
import { parseToPhoneNational } from '../../utils';

interface ResendPhoneBannerProps {
  phone: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
}

/**
 * Banner to verify and resend the phone verification code.
 * @param phone
 * @param onClick
 * @constructor
 */
export function ResendPhoneBanner({
  phone,
  onClick,
  disabled = false,
  sx,
}: ResendPhoneBannerProps): React.JSX.Element {
  const theme = useTheme();
  const message = `Use the text we sent to `;
  return (
    <>
      <FullWidthAlert
        action={
          <Button
            onClick={onClick}
            disabled={disabled}
            sx={{
              color: theme.palette.info.contrastText,
              fontWeight: 800,
              fontSize: '13px',
              padding: '0',
              '&:hover': {
                backgroundColor: 'initial',
              },
              ...sx,
            }}
            size='small'
            variant='text'
            color='info'
          >
            Resend
          </Button>
        }
      >
        {message}
        <strong>{parseToPhoneNational(phone)}</strong>{' '}
      </FullWidthAlert>
    </>
  );
}
