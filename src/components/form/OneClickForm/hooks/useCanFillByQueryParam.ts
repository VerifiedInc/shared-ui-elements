import { useOneClickFormOptions } from '../contexts/one-click-form-options.context';

/**
 * Hook to check if a field can be filled by query params based on the fillEmptyByQueryParam option
 * @returns A function that takes a fieldName and returns a boolean indicating if the field can be filled by query params.
 */
export function useCanFillByQueryParam(): (fieldName: string) => boolean {
  const { options } = useOneClickFormOptions();
  const { fillEmptyByQueryParam } = options.features;

  return (fieldName: string): boolean => {
    if (!fillEmptyByQueryParam) {
      return false;
    }

    return (
      fillEmptyByQueryParam.includes('*') ||
      fillEmptyByQueryParam.includes(fieldName)
    );
  };
}
