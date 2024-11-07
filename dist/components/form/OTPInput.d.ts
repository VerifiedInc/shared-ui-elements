import { SxProps } from '@mui/material';
interface OTPInputProps {
    name?: string;
    onChange?: (event: {
        target: {
            value: string;
        };
    }) => void;
    disabled?: boolean;
    sx?: SxProps;
}
export type OTPInputInstance = Readonly<{
    focus: () => void;
    blur: () => void;
    clear: () => void;
}> & {
    get value(): string;
    set value(newValue: string);
};
export declare const OTPInput: import('react').ForwardRefExoticComponent<OTPInputProps & import('react').RefAttributes<OTPInputInstance>>;
export {};
