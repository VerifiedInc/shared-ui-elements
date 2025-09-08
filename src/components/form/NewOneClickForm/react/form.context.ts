import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

import { Form, FormField } from '../core/form';

export interface FormState {
  form: Form | null;
  isSubmitting: boolean;
}

export interface FormContextValue {
  state: FormState;
  setForm: (form: Form) => void;
  updateFieldValue: (path: string, value: any) => void;
  setFieldTouched: (path: string, touched: boolean) => void;
  getField: (path: string) => FormField | undefined;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  setSubmitting: (submitting: boolean) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useForm = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
  form?: Form;
  onSubmit?: (form: Form) => Promise<void> | void;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  form: initialForm,
  onSubmit,
}) => {
  const [state, setState] = useState<FormState>({
    form: initialForm ?? null,
    isSubmitting: false,
  });

  const getField = useCallback(
    (path: string): FormField | undefined => {
      if (!state.form) return undefined;

      // Handle dot notation paths (e.g., 'fullName.firstName')
      const pathParts = path.split('.');

      if (pathParts.length === 1) {
        // Simple field lookup - check top-level fields first
        const id = pathParts[0];
        const topLevelField = state.form.fields[id];
        if (topLevelField) return topLevelField;

        // If not found, search in children of composite fields
        for (const field of Object.values(state.form.fields)) {
          if (field.children) {
            for (const childField of Object.values(field.children)) {
              if (childField.id === id) {
                return childField;
              }
            }
          }
        }
        return undefined;
      }

      // Handle nested path (e.g., 'fullName.firstName')
      const [parentKey, ...childPath] = pathParts;
      const parentField = state.form.fields[parentKey];

      if (!parentField?.children) {
        return undefined;
      }

      // Navigate through the nested structure
      let currentField: FormField | undefined = parentField;
      for (const segment of childPath) {
        if (!currentField?.children?.[segment]) {
          return undefined;
        }
        currentField = currentField.children[segment];
      }

      return currentField;
    },
    [state.form],
  );

  const validateForm = useCallback((): boolean => {
    if (!state.form) return false;
    return state.form.isValid;
  }, [state.form]);

  const setForm = useCallback((form: Form) => {
    setState((prev) => ({
      ...prev,
      form,
    }));
  }, []);

  const updateFieldValue = useCallback(
    (path: string, value: any) => {
      setState((prev) => {
        if (!prev.form) {
          console.warn('No form instance available');
          return prev;
        }

        // Use the enhanced getField function to find the field by path
        const field = getField(path);

        if (!field) {
          console.warn(`Attempted to update non-existent field: ${path}`);
          return prev;
        }

        // Check if value actually changed to avoid unnecessary updates
        if (field.value === value) {
          return prev;
        }

        // Update the field value directly on the core FormField instance
        field.value = value;

        // Force re-render by creating new state object
        return {
          ...prev,
          form: prev.form, // This will trigger re-render due to field mutation
        };
      });
    },
    [getField],
  );

  const setFieldTouched = useCallback(
    (path: string, touched: boolean) => {
      setState((prev) => {
        if (!prev.form) {
          console.warn('No form instance available');
          return prev;
        }

        // Use the enhanced getField function to find the field by path
        const field = getField(path);

        if (!field) {
          console.warn(
            `Attempted to set touched state for non-existent field: ${path}`,
          );
          return prev;
        }

        // Avoid unnecessary updates if touched state hasn't changed
        if (field.touched === touched) {
          return prev;
        }

        // Update the field touched state directly on the core FormField instance
        field.touched = touched;

        // Force re-render by creating new state object
        return {
          ...prev,
          form: prev.form, // This will trigger re-render due to field mutation
        };
      });
    },
    [getField],
  );

  const resetForm = useCallback(() => {
    setState((prev) => {
      if (!prev.form) return prev;

      // Recursive function to reset field and all its nested children
      const resetFieldRecursively = (field: FormField) => {
        field.value = field.defaultValue;
        field.touched = false;

        // Recursively reset children if they exist
        if (field.children) {
          Object.values(field.children).forEach(resetFieldRecursively);
        }
      };

      // Reset all top-level fields recursively
      Object.values(prev.form.fields).forEach(resetFieldRecursively);

      return {
        ...prev,
        isSubmitting: false,
      };
    });
  }, []);

  const setSubmitting = useCallback((submitting: boolean) => {
    setState((prev) => ({
      ...prev,
      isSubmitting: submitting,
    }));
  }, []);

  const submitForm = useCallback(async () => {
    if (!validateForm() || !state.form) {
      return;
    }

    setSubmitting(true);

    try {
      console.log(state);

      if (onSubmit) {
        await onSubmit(state.form);
      }
    } finally {
      setSubmitting(false);
    }
  }, [state.form, onSubmit, validateForm]);

  const contextValue: FormContextValue = {
    state,
    setForm,
    updateFieldValue,
    setFieldTouched,
    getField,
    validateForm,
    resetForm,
    submitForm,
    setSubmitting,
  };

  return React.createElement(
    FormContext.Provider,
    { value: contextValue },
    children,
  );
};
