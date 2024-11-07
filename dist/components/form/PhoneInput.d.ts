import { InputProps } from '@mui/material';
import { TextFieldProps } from '../TextField';
export interface PhoneInputProps {
    label?: string;
    name?: string;
    helperText?: string;
    initialValue?: string;
    onChange?: (value: string) => void;
    onValidPhone?: (value: string) => void;
    error?: boolean;
    handleChangeCountry?: (newCountry: string) => void;
    value?: string;
    shouldShowOnlyNorthAmericanCountries?: boolean;
    shouldHaveClearButton?: boolean;
    variant?: TextFieldProps['variant'];
    InputProps?: InputProps;
}
/**
 * Renders a phone input component with country selector and masking.
 *
 * @param label - The label for the phone input. Defaults to 'Phone'.
 * @param name - The name of the phone input. Defaults to 'phone'.
 * @param helperText - The helper text for the phone input.
 * @param onChange - The callback function to handle the change event of the phone input.
 * @param initialValue - The initial value for the phone input. Defaults to ''.
 * @param error - Whether the phone input has an error. Defaults to false.
 * @param handleChangeCountry - The callback function to handle the change event of the country selector.
 * @param value - The value of the phone input. If passed, it will be used instead of the value from component state.
 */
export declare function PhoneInput({ label, name, helperText, onChange, onValidPhone, initialValue, error, handleChangeCountry, value: valueProp, InputProps, shouldHaveClearButton, }: Readonly<PhoneInputProps>): React.JSX.Element;
