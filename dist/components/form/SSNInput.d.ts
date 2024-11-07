export interface SSNInputProps {
    onChange?: (event: {
        target: {
            value: string;
        };
    }) => void;
    name?: string;
    value?: string;
    label?: string;
    error?: boolean;
    helperText?: string;
    shouldHaveCloseAdornment?: boolean;
}
/**
 * This component manages the input of type SSN.
 * @constructor
 */
export declare function SSNInput({ onChange, label, shouldHaveCloseAdornment, ...rest }: SSNInputProps): React.JSX.Element;
