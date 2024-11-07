import { ChangeEventHandler } from 'react';
interface DateInputProps {
    name?: string;
    value?: string;
    label?: string;
    error?: boolean;
    helperText?: string;
    onChange?: (event: {
        target: {
            value: string;
        };
    }) => void;
    onBlur?: ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    allowFutureDates?: boolean;
}
export declare const DateInput: import('react').ForwardRefExoticComponent<Readonly<DateInputProps> & import('react').RefAttributes<unknown>>;
export {};
