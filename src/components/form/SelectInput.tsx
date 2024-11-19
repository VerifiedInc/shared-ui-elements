import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import {
  TextField,
  type TextFieldProps as InternalFieldProps,
} from '@mui/material';
import { inputStyle } from './styles/input';

interface TextFieldProps extends Omit<InternalFieldProps, 'onChange'> {}

interface Option {
  label: string;
  id: string;
}

interface SelectInputProps {
  name?: string;
  onChange?: (value: Option | null) => void;
  onClear?: () => void;
  options: Option[];
  value?: Option | null; // Controlled value
  defaultOption?: Option;
  InputProps?: TextFieldProps;
}

/**
 * This component manages the input of type Select.
 * @constructor
 */
export function SelectInput({
  options,
  defaultOption,
  value: controlledValue,
  onChange,
  onClear,
  ...props
}: SelectInputProps): React.JSX.Element {
  const [internalValue, setInternalValue] = useState<Option | null>(
    defaultOption ?? null,
  );

  // Determine the value to display
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (option: Option | null): void => {
    if (!isControlled) {
      setInternalValue(option); // Update internal state only if uncontrolled
    }
    if (onChange) {
      onChange(option);
    }
  };

  const handleClear = (): void => {
    handleChange(null);
    if (onClear) {
      onClear();
    }
  };

  const textFieldStyle: TextFieldProps = {
    ...inputStyle,
    inputProps: {
      tabIndex: 0,
    },
    fullWidth: true,
    ...props.InputProps,
  };

  return (
    <Autocomplete
      disablePortal
      autoHighlight
      defaultValue={defaultOption}
      options={options}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      value={value}
      onChange={(_event, newInputValue) => {
        // User clicked on clear button.
        if (!newInputValue) {
          handleClear();
          return;
        }

        handleChange(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldStyle}
          inputProps={{
            ...params.inputProps,
            ...textFieldStyle.inputProps,
          }}
        />
      )}
    />
  );
}
