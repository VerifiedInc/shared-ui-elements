import { Box, type BoxProps } from '@mui/material';

export interface ImageProps extends BoxProps {
  src: string;
  alt: string;
}

export const Image = ({ src, alt, ...props }: ImageProps): JSX.Element => {
  return <Box src={src} alt={alt} {...props} component='img' />;
};
