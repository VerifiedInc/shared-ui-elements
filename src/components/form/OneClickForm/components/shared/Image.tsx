import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';

export interface ImageProps extends BoxProps {
  src: string;
  alt: string;
}

/**
 * Displays an image.
 *
 * Wraps an HTML `img` element with MUI's `Box` component
 * so that styles can easily be set (including leveraging our theme) with the `sx` prop.
 *
 * As recommended by the MUI docs https://mui.com/system/basics/
 */
const Image: FC<ImageProps> = ({ src, alt, ...props }) => {
  return <Box src={src} alt={alt} {...props} component='img' />;
};

export default Image;
