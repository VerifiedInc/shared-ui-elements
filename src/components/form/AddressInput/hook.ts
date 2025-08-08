import { useMemo, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { toSentenceCase, wrapPromise } from '../../../utils';
import { useDebounceValue, usePrevious } from '../../../hooks';

import { fromUSAddress, toUSaddress } from '../../../utils/address';

import { Address, Option, PlaceSuggestion } from './types';
import { useAutoFill } from './autofill.hook';

type DataFieldAddressInputReturn = {
  value: Option;
  inputValue: string;
  suggestions: PlaceSuggestion[];
  isPending: boolean;
  isFetchingPlace: boolean;
  error: string | undefined;
  handleInputChange: (
    newInputValue: string,
    changeOptions?: { shouldValidate?: boolean },
  ) => void;
  handleOptionChange: (option: Option) => Promise<void>;
  handleClear: () => void;
};

export function useDataFieldAddressInput({
  name,
  defaultValue: _defaultValue,
  onChange,
}: {
  name: string;
  defaultValue: Address | null;
  onChange: (
    value: string | Address | null,
    changeOptions?: { shouldValidate?: boolean },
  ) => void;
}): DataFieldAddressInputReturn {
  const form = useFormContext();

  const [isFetchingPlace, setFetchingPlace] = useState(false);
  const {
    handleAutoComplete,
    fetchPlace,
    buildAddress,
    suggestions,
    isPending,
  } = useAutoFill();

  // React to form errors
  const error = useMemo(() => {
    for (const key of ['line1', 'city', 'state', 'zipCode']) {
      // Address field does not contemplate line2
      if (key === 'line2') continue;
      const childFieldState = form.getFieldState(`${name}.${key}`);
      if (childFieldState?.error?.message) {
        return `${toSentenceCase(key)} is invalid`;
      }
    }
    return undefined;
  }, [form, name, form.formState.errors]);

  const defaultValue = useMemo(() => {
    return toUSaddress({
      line1: _defaultValue?.line1 ?? '',
      city: _defaultValue?.city ?? '',
      state: _defaultValue?.state ?? '',
      zipCode: _defaultValue?.zipCode ?? '',
    });
  }, [_defaultValue]);

  const [value, setValue] = useState<Option>({
    title: defaultValue ?? '',
    value: '',
  });

  const [inputValue, setInputValue] = useState('');
  const previousInputValue = usePrevious(inputValue);
  const debouncedInputValue = useDebounceValue(inputValue);

  const handleChange = (
    value: string | Address,
    changeOptions?: { shouldValidate?: boolean },
  ): void => {
    let addressParts: string | Address | null;

    if (typeof value === 'string') {
      addressParts = fromUSAddress(value.replace(/\n/g, ''));
    } else {
      addressParts = value;
      // Update the input value to match the formatted address since the API may return an narrowed text.
      setInputValue(toUSaddress({ ...value, country: undefined }) ?? '');
    }

    // Call on change with the address parts so the implementation can update the form values.
    onChange(addressParts, changeOptions);
  };

  const handleOptionChange = async (option: Option): Promise<void> => {
    setValue(option);
    if (!option.value) return;
    setFetchingPlace(true);
    const [place] = await wrapPromise(fetchPlace(option.value));
    if (!place) return;
    const address = buildAddress(place);
    handleChange(address);
    setFetchingPlace(false);
  };

  const handleInputChange = (newInputValue: string): void => {
    setInputValue(newInputValue);
  };

  const handleClear = (): void => {
    setInputValue('');
    handleChange('', {
      shouldValidate: false,
    });
  };

  /**
   * Effect responsible to trigger autocomplete requests when the debounced input value changes.
   * It will trigger if enough value are inputted or the input is different from the previous value.
   */
  useEffect(() => {
    const handle = (): void => {
      // Handle change when input is cleared
      if (!debouncedInputValue.length) {
        handleChange('', undefined);
      }

      if (
        !debouncedInputValue ||
        debouncedInputValue.length <= 3 ||
        debouncedInputValue === previousInputValue
      ) {
        return;
      }

      // Handle value change without validation
      handleChange(debouncedInputValue, undefined);
      // Trigger autocomplete request
      handleAutoComplete(debouncedInputValue).catch(console.error);
    };
    handle();
  }, [debouncedInputValue]);

  return {
    value,
    inputValue,
    suggestions,
    isPending,
    isFetchingPlace,
    error,
    handleInputChange,
    handleOptionChange,
    handleClear,
  };
}
