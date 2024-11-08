import { BoxProps } from '@mui/material';
export interface ImageProps extends BoxProps {
    src: string;
    alt: string;
}
export declare const Image: ({ src, alt, ...props }: ImageProps) => JSX.Element;
