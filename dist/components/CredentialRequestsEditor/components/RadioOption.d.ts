import { ReactNode } from 'react';
import { RadioProps, SxProps } from '@mui/material';
type RadioOptionProps = RadioProps & {
    isDefault?: boolean;
    title: string;
    description?: string;
    tip?: ReactNode;
    sx?: SxProps;
};
export declare function RadioOption(props: RadioOptionProps): React.JSX.Element;
export {};
