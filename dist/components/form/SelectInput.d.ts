import { TextFieldProps as InternalFieldProps } from '@mui/material';
interface TextFieldProps extends Omit<InternalFieldProps, 'onChange'> {
}
interface Option {
    label: string;
    id: string;
}
interface SelectInputProps {
    name?: string;
    onChange?: (value: Option | null) => void;
    onClear?: () => void;
    options: Option[];
    defaultOption?: Option;
    InputProps?: TextFieldProps;
}
/**
 * This component manages the input of type Select.
 * @constructor
 */
export declare function SelectInput({ options, defaultOption, onChange, onClear, ...props }: SelectInputProps): React.JSX.Element;
export {};
