import {
  Autocomplete,
  TextField,
  type TextFieldProps as InternalFieldProps,
} from '@mui/material';
import { useState } from 'react';

interface TextFieldProps extends Omit<InternalFieldProps, 'onChange'> {}

interface Option {
  label: string;
  id: string;
}

interface SelectInputBaseProps {
  name?: string;
  onClear?: () => void;
  options: Option[];
  InputProps?: TextFieldProps;
  disableClearable?: boolean;
}

interface SelectInputSingleProps extends SelectInputBaseProps {
  multiple?: false;
  onChange?: (value: Option | null) => void;
  value?: Option | null; // Controlled value
  defaultOption?: Option;
}

interface SelectInputMultipleProps extends SelectInputBaseProps {
  multiple: true;
  onChange?: (value: Option[]) => void;
  value?: Option[]; // Controlled value
  defaultOption?: Option[];
  /**
   * How many chips to show while the input is not focused; the rest collapse into `+N`.
   * Focusing the input always reveals the full selection. Pass -1 to never collapse.
   */
  limitTags?: number;
}

type SelectInputProps = SelectInputSingleProps | SelectInputMultipleProps;

/**
 * This component manages the input of type Select.
 * Pass `multiple` to select many options; `value`, `defaultOption`, and
 * `onChange` then work with `Option[]` instead of `Option | null`.
 * @constructor
 */
export function SelectInput(props: SelectInputProps): React.JSX.Element {
  if (props.multiple) {
    return <MultipleSelectInput {...props} />;
  }

  return <SingleSelectInput {...props} />;
}

function SingleSelectInput({
  options,
  defaultOption,
  value: controlledValue,
  onChange,
  onClear,
  disableClearable,
  ...props
}: SelectInputSingleProps): React.JSX.Element {
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
      disableClearable={disableClearable}
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

function MultipleSelectInput({
  options,
  defaultOption,
  value: controlledValue,
  onChange,
  onClear,
  disableClearable,
  limitTags = 2,
  ...props
}: SelectInputMultipleProps): React.JSX.Element {
  const [internalValue, setInternalValue] = useState<Option[]>(
    defaultOption ?? [],
  );

  // Determine the value to display
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (selected: Option[]): void => {
    if (!isControlled) {
      setInternalValue(selected); // Update internal state only if uncontrolled
    }
    if (onChange) {
      onChange(selected);
    }
  };

  const textFieldStyle: TextFieldProps = {
    inputProps: {
      tabIndex: 0,
    },
    fullWidth: true,
    ...props.InputProps,
  };

  return (
    <Autocomplete
      multiple
      // Picking one value is rarely the end of a multi-select interaction — keep the
      // menu open so users can pick several in one go.
      disableCloseOnSelect
      limitTags={limitTags}
      disablePortal
      autoHighlight
      defaultValue={defaultOption}
      options={options}
      disableClearable={disableClearable}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      value={value}
      onChange={(_event, newValue) => {
        handleChange(newValue);

        // User removed the last option or clicked the clear button.
        if (newValue.length === 0 && onClear) {
          onClear();
        }
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
