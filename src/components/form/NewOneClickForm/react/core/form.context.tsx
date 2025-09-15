import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

import { Form, FormField } from '../../core/form';

export interface FormState {
  form: Form;
  isSubmitting: boolean;
  isSubmitSuccess: boolean;
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
  replaceFieldWithVariant: (fieldPath: string, variantId: string) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useForm = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export interface FormProviderProps {
  children: ReactNode;
  form: Form;
  onSubmit?: (form: Form) => Promise<void> | void;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  form: initialForm,
  onSubmit,
}) => {
  const [state, setState] = useState<FormState>({
    form: initialForm,
    isSubmitting: false,
    isSubmitSuccess: false,
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

  // Helper function to find parent field from a child path
  const findParentField = useCallback(
    (
      childPath: string,
    ): { parentField: FormField; childKey: string } | null => {
      if (!state.form) return null;

      const pathParts = childPath.split('.');
      if (pathParts.length < 2) return null; // No parent for top-level fields

      const parentPath = pathParts.slice(0, -1).join('.');
      const childKey = pathParts[pathParts.length - 1];
      const parentField = getField(parentPath);

      if (
        !parentField ||
        parentField.schema.characteristics.inputType !== 'composite'
      ) {
        throw new Error(`Parent field not found: ${parentPath}`);
      }

      return { parentField, childKey };
    },
    [state.form, getField],
  );

  // Helper function to construct composite value from children
  const constructCompositeValue = useCallback(
    (parentField: FormField): Record<string, any> => {
      if (!parentField.children) return {};

      const compositeValue: Record<string, any> = {};
      Object.entries(parentField.children).forEach(([key, child]) => {
        // Always include all child values, even empty ones
        compositeValue[key] = child.value;
      });
      return compositeValue;
    },
    [],
  );

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

        // Update parent composite field value if this is a child field
        const parentInfo = findParentField(path);
        if (parentInfo) {
          const { parentField } = parentInfo;
          const compositeValue = constructCompositeValue(parentField);

          // Only update parent value if it has any non-empty children
          parentField.value =
            Object.keys(compositeValue).length > 0 ? compositeValue : {};
        }

        // Force re-render by creating new state object
        return {
          ...prev,
          form: prev.form, // This will trigger re-render due to field mutation
        };
      });
    },
    [getField, findParentField, constructCompositeValue],
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
        isSubmitSuccess: false,
      };
    });
  }, []);

  const setSubmitting = useCallback((submitting: boolean) => {
    setState((prev) => ({
      ...prev,
      isSubmitting: submitting,
    }));
  }, []);

  const setSubmitSuccess = useCallback((success: boolean) => {
    setState((prev) => ({
      ...prev,
      isSubmitSuccess: success,
    }));
  }, []);

  const submitForm = useCallback(async () => {
    if (!validateForm() || !state.form) {
      return;
    }

    setSubmitting(true);
    setSubmitSuccess(false);

    try {
      if (onSubmit) {
        await onSubmit(state.form);
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }, [state.form, onSubmit, validateForm, setSubmitting, setSubmitSuccess]);

  const replaceFieldWithVariant = useCallback(
    (fieldPath: string, variantId: string) => {
      setState((prev) => {
        if (!prev.form) {
          console.warn('No form instance available');
          return prev;
        }

        const currentField = getField(fieldPath);
        if (!currentField) {
          console.warn(`Field ${fieldPath} not found`);
          return prev;
        }

        // Use the FormField's replaceWithVariant method
        currentField.replaceWithVariant(variantId);

        // Force re-render by creating new state object
        return {
          ...prev,
          form: prev.form, // This will trigger re-render due to field mutation
        };
      });
    },
    [getField],
  );

  const contextValue: FormContextValue = {
    state,
    setForm,
    updateFieldValue,
    setFieldTouched,
    getField,
    validateForm,
    resetForm,
    submitForm,
    replaceFieldWithVariant,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
