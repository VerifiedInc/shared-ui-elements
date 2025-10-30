import { type UseFormReturn } from 'react-hook-form';

import { type CredentialRequestsEditorForm } from '../types/form';
import { type MandatoryEnum } from '../types/mandatoryEnum';

/**
 * Propagates a field value to all child fields that meet the specified criteria
 * @param form - The react-hook-form instance
 * @param value - The value to propagate (MandatoryEnum for mandatory, boolean for allowUserInput)
 * @param currentPath - The current field path in the form
 * @param propertyKey - The property to propagate ('mandatory' or 'allowUserInput')
 */
export function propagateToChildren(
  form: UseFormReturn<CredentialRequestsEditorForm>,
  value: MandatoryEnum | boolean,
  currentPath: string,
  propertyKey: 'mandatory' | 'allowUserInput',
): void {
  const formValues = form.getValues();
  const pathParts = currentPath.split('.');

  // Navigate to the current field in the form values
  let currentField = formValues;
  for (const part of pathParts) {
    if (
      currentField &&
      typeof currentField === 'object' &&
      part in currentField
    ) {
      currentField = (currentField as any)[part];
    }
  }

  // If current field has children, propagate to them
  if (
    currentField &&
    typeof currentField === 'object' &&
    'children' in currentField
  ) {
    const children = (currentField as any).children;
    if (Array.isArray(children)) {
      children.forEach((_, index) => {
        const childPath = `${currentPath}.children.${index}`;
        const childMandatoryPath = `${childPath}.mandatory`;
        const childAllowUserInputPath = `${childPath}.allowUserInput`;
        const childPropertyPath = `${childPath}.${propertyKey}`;

        // Get child field values
        const childMandatory = form.getValues(childMandatoryPath as any);
        const childAllowUserInput = form.getValues(
          childAllowUserInputPath as any,
        );

        // Only propagate if child has the target property and child has both mandatory and allowUserInput fields defined
        const childHasTargetProperty =
          form.getValues(childPropertyPath as any) !== undefined;
        const childHasMandatoryField = childMandatory !== undefined;
        const childHasAllowUserInputField = childAllowUserInput !== undefined;

        // For mandatory propagation: child must have both mandatory and allowUserInput fields
        // For allowUserInput propagation: child must have both mandatory and allowUserInput fields
        const shouldPropagate =
          childHasTargetProperty &&
          childHasMandatoryField &&
          childHasAllowUserInputField;

        if (shouldPropagate) {
          // Casting to any to bypass type issues with deeply nested paths
          (form.setValue as any)(childPropertyPath as any, value, {
            shouldValidate: false,
          });
          // Recursively propagate to grandchildren
          propagateToChildren(form, value, childPath, propertyKey);
        }
      });
    }
  }
}
