import { Link, Typography, type TypographyProps } from '@mui/material';

export function TTSMagicLegalLanguage({
  brandName,
  ...props
}: TypographyProps & { brandName: string }) {
  return (
    <Typography
      variant='body1'
      fontSize={12}
      fontWeight={400}
      textAlign='center'
      color='secondary.main'
      {...props}
    >
      Opt in to receive a verification link from Verified on behalf of{' '}
      {brandName}. Msg & data rates may apply. One message per interaction.
      Reply HELP for help or STOP to opt out. See Terms at{' '}
      <Link
        href='https://verified.inc/sms-terms'
        target='_blank'
        sx={{ color: 'inherit', textDecorationColor: 'inherit' }}
      >
        verified.inc/sms-terms
      </Link>{' '}
      and Privacy at{' '}
      <Link
        href='https://verified.inc/privacy'
        target='_blank'
        sx={{ color: 'inherit', textDecorationColor: 'inherit' }}
      >
        verified.inc/privacy
      </Link>
      .
    </Typography>
  );
}
