import { useCallback } from 'react';

import { FormField } from '../../core/form';

import { useForm } from './form.context';

export interface UseFieldOptions {
  id: string;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFieldReturn {
  field: FormField | undefined;
  value: any;
  setValue: (value: any) => void;
  error: string | null;
  isDirty: boolean;
  isValid: boolean;
  isTouched: boolean;
  setTouched: (touched: boolean) => void;
  validate: () => boolean;
  reset: () => void;
}

export const useField = ({
  id,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFieldOptions): UseFieldReturn => {
  const { updateFieldValue, setFieldTouched, getField, validateForm } =
    useForm();

  const field = getField(id);

  const setValue = useCallback(
    (value: any) => {
      updateFieldValue(id, value);
      if (validateOnChange) {
        validateForm();
      }
    },
    [id, updateFieldValue, validateForm, validateOnChange],
  );

  const setTouched = useCallback(
    (touched: boolean) => {
      setFieldTouched(id, touched);
      if (touched && validateOnBlur) {
        validateForm();
      }
    },
    [id, setFieldTouched, validateForm, validateOnBlur],
  );

  const validate = useCallback(() => {
    return validateForm();
  }, [validateForm]);

  const reset = useCallback(() => {
    if (field) {
      updateFieldValue(id, field.defaultValue);
      setFieldTouched(id, false);
    }
  }, [id, field, updateFieldValue, setFieldTouched]);

  // Get error message from FormField errors
  const error = field?.errors?.error?.errors?.[0]?.message ?? null;
  const isTouched = field?.touched ?? false;

  return {
    field,
    value: field?.value ?? '',
    setValue,
    error,
    isDirty: field?.isDirty ?? false,
    isValid: field?.isValid ?? true,
    isTouched,
    setTouched,
    validate,
    reset,
  };
};

// Hook for creating input props
export const useFieldInput = (fieldOptions: UseFieldOptions) => {
  const field = useField(fieldOptions);

  return {
    ...field,
    inputProps: {
      id: fieldOptions.id,
      value: field.value || '',
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      ) => {
        field.setValue(e.target.value);
      },
      onBlur: () => {
        field.setTouched(true);
      },
      'aria-invalid': !field.isValid,
      'aria-describedby': field.error ? `${fieldOptions.id}-error` : undefined,
    },
  };
};

// Hook for creating form field components
export interface UseFormFieldOptions extends UseFieldOptions {
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const useFormField = (options: UseFormFieldOptions) => {
  const field = useFieldInput(options);

  return {
    ...field,
    fieldProps: {
      label: options.label,
      placeholder: options.placeholder,
      required: options.required,
      disabled: options.disabled,
      error: field.error,
      isDirty: field.isDirty,
      isValid: field.isValid,
      isTouched: field.isTouched,
    },
  };
};
