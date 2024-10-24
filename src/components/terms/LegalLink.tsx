import { Link, type LinkProps } from '@mui/material';

/**
 * A component which renders a link syled following advice from our legal counsel for linking to legal documents
 * like terms of use, privacy policy, etc
 */
const LegalLink = ({ sx, ...props }: LinkProps) => {
  return (
    <Link
      target='_blank'
      {...props}
      color='primary'
      sx={{
        ...sx,
      }}
    >
      {props.children}
    </Link>
  );
};

export default LegalLink;
