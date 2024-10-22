import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import {
  TextField,
  type TextFieldProps as InternalFieldProps,
} from '../TextField';
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
  onChange,
  onClear,
  ...props
}: SelectInputProps): React.JSX.Element {
  const [value, setValue] = useState<Option | null>(null);
  const handleChange = (option: Option | null): void => {
    setValue(option);
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
