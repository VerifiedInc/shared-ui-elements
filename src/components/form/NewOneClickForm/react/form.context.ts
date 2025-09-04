import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Form } from '../core/form';
import { FormField } from '../core/formField';

export interface FormState {
  form: Form | null;
  isSubmitting: boolean;
}

export interface FormContextValue {
  state: FormState;
  setForm: (form: Form) => void;
  updateFieldValue: (id: string, value: any) => void;
  setFieldTouched: (id: string, touched: boolean) => void;
  getField: (id: string) => FormField | undefined;
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
    (id: string): FormField | undefined => {
      if (!state.form) return undefined;

      // Search in top-level fields
      const topLevelField = state.form.fields.find((field) => field.id === id);
      if (topLevelField) return topLevelField;

      // Search in children of composite fields
      for (const field of state.form.fields) {
        if (field.children) {
          for (const childField of Object.values(field.children)) {
            if (childField.id === id) {
              return childField;
            }
          }
        }
      }

      return undefined;
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

  const updateFieldValue = useCallback((id: string, value: any) => {
    setState((prev) => {
      if (!prev.form) {
        console.warn('No form instance available');
        return prev;
      }

      // Search in top-level fields first
      let field = prev.form.fields.find((f) => f.id === id);

      // If not found, search in children of composite fields
      if (!field) {
        for (const topLevelField of prev.form.fields) {
          if (topLevelField.children) {
            for (const childField of Object.values(topLevelField.children)) {
              if (childField.id === id) {
                field = childField;
                break;
              }
            }
            if (field) break;
          }
        }
      }

      if (!field) {
        console.warn(`Attempted to update non-existent field: ${id}`);
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
  }, []);

  const setFieldTouched = useCallback((id: string, touched: boolean) => {
    setState((prev) => {
      if (!prev.form) {
        console.warn('No form instance available');
        return prev;
      }

      // Search in top-level fields first
      let field = prev.form.fields.find((f) => f.id === id);

      // If not found, search in children of composite fields
      if (!field) {
        for (const topLevelField of prev.form.fields) {
          if (topLevelField.children) {
            for (const childField of Object.values(topLevelField.children)) {
              if (childField.id === id) {
                field = childField;
                break;
              }
            }
            if (field) break;
          }
        }
      }

      if (!field) {
        console.warn(
          `Attempted to set touched state for non-existent field: ${id}`,
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
  }, []);

  const resetForm = useCallback(() => {
    setState((prev) => {
      if (!prev.form) return prev;

      // Reset all top-level fields
      prev.form.fields.forEach((field) => {
        field.value = field.defaultValue;
        field.touched = false;

        // Reset children of composite fields
        if (field.children) {
          Object.values(field.children).forEach((childField) => {
            childField.value = childField.defaultValue;
            childField.touched = false;
          });
        }
      });

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
