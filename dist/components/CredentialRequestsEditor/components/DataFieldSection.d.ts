import { ReactNode } from 'react';
import { SxProps } from '@mui/material';
interface DataFieldSectionProps {
    children: ReactNode;
    title: string;
    description?: string;
    tip?: ReactNode;
    sx?: SxProps;
}
export declare function DataFieldSection(props: DataFieldSectionProps): React.JSX.Element;
export {};
