import { useCallback } from 'react';

import { FormField } from '../../core/form';
import { type FieldValueDefinitions } from '../../core/declarations';

import { useForm } from './form.context';
import { fieldInputTypes } from '../../core/fields';

export interface UseFieldOptions {
  key: string;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFieldReturn<
  TFieldKey extends keyof FieldValueDefinitions = keyof FieldValueDefinitions,
> {
  field: FormField<TFieldKey> | undefined;
  value: FieldValueDefinitions[TFieldKey];
  setValue: (value: FieldValueDefinitions[TFieldKey]) => void;
  setChildValue: (childKey: string, value: any) => void;
  error: string | null;
  isDirty: boolean;
  isValid: boolean;
  isTouched: boolean;
  setTouched: (touched: boolean) => void;
  validate: () => boolean;
  reset: () => void;
  clear: (options?: { ignoreKeys?: string[] }) => void;
}

export const useField = <
  TFieldKey extends keyof FieldValueDefinitions = keyof FieldValueDefinitions,
>({
  key,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFieldOptions): UseFieldReturn<TFieldKey> => {
  const { updateFieldValue, setFieldTouched, getField, validateForm } =
    useForm();

  const field = getField(key) as FormField<TFieldKey> | undefined;

  const setValue = useCallback(
    (value: FieldValueDefinitions[TFieldKey]) => {
      updateFieldValue(key, value);
      if (validateOnChange) {
        validateForm();
      }
    },
    [key, updateFieldValue, validateForm, validateOnChange],
  );

  const setChildValue = useCallback(
    (childKey: string, value: any) => {
      updateFieldValue(`${key}.${childKey}`, value);
      if (validateOnChange) {
        validateForm();
      }
    },
    [key, updateFieldValue, validateForm, validateOnChange],
  );

  const setTouched = useCallback(
    (touched: boolean) => {
      setFieldTouched(key, touched);
      if (touched && validateOnBlur) {
        validateForm();
      }
    },
    [key, setFieldTouched, validateForm, validateOnBlur],
  );

  const validate = useCallback(() => {
    return validateForm();
  }, [validateForm]);

  const clear = useCallback(
    (options?: { ignoreKeys?: string[] }) => {
      // When the field is a composite field, we need to clear all the children
      if (
        field?.schema.characteristics.inputType === fieldInputTypes.composite
      ) {
        Object.keys(field?.children ?? {}).forEach((childKey) => {
          if (options?.ignoreKeys?.includes(childKey)) return;
          updateFieldValue(`${key}.${childKey}`, '');
          setFieldTouched(`${key}.${childKey}`, true);
        });
      } else {
        // When the field is not a composite field, we need to clear the field itself
        updateFieldValue(key, '');
        setFieldTouched(key, true);
      }
    },
    [key, field, updateFieldValue, setFieldTouched],
  );

  const reset = useCallback(() => {
    if (field) {
      updateFieldValue(key, field.defaultValue);
      setFieldTouched(key, false);
    }
  }, [key, field, updateFieldValue, setFieldTouched]);

  // Get error message from FormField errors
  const error = field?.errors?.error?.errors?.[0]?.message ?? null;
  const isTouched = field?.touched ?? false;

  return {
    field,
    value: (field?.value ?? '') as FieldValueDefinitions[TFieldKey],
    setValue,
    setChildValue,
    error,
    isDirty: field?.isDirty ?? false,
    isValid: field?.isValid ?? true,
    isTouched,
    setTouched,
    validate,
    reset,
    clear,
  };
};

// Hook for creating input props
export const useFieldInput = <
  TFieldKey extends keyof FieldValueDefinitions = keyof FieldValueDefinitions,
>(
  fieldOptions: UseFieldOptions,
) => {
  const field = useField<TFieldKey>(fieldOptions);

  return {
    ...field,
    inputProps: {
      id: fieldOptions.key,
      value: field.value || '',
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      ) => {
        field.setValue(e.target.value as FieldValueDefinitions[TFieldKey]);
      },
      onBlur: () => {
        field.setTouched(true);
      },
      'aria-invalid': !field.isValid,
      'aria-describedby': field.error ? `${fieldOptions.key}-error` : undefined,
    },
  };
};

export const useFormField = <
  TFieldKey extends keyof FieldValueDefinitions = keyof FieldValueDefinitions,
>(
  options: UseFieldOptions,
) => {
  const field = useFieldInput<TFieldKey>(options);
  const {
    state: { isSubmitting, isSubmitSuccess },
  } = useForm();
  return {
    ...field,
    fieldProps: {
      label: field.field?.schema.characteristics.label,
      placeholder: field.field
        ? 'placeholder' in field.field?.schema.characteristics
          ? field.field?.schema.characteristics.placeholder
          : undefined
        : undefined,
      required: field.field?.isRequired,
      disabled: isSubmitting || isSubmitSuccess || field.field?.isDisabled,
      description: field.field?.description,
      error: field.error,
      isDirty: field.isDirty,
      isValid: field.isValid,
      isTouched: field.isTouched,
    },
  };
};
