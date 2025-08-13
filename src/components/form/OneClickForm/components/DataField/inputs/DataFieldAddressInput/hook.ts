import { useMemo, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { wrapPromise } from '../../../../../../../utils';
import { useDebounceValue, usePrevious } from '../../../../../../../hooks';
import { fromUSAddress, toUSaddress } from '../../../../../../../utils/address';

import { extractChildrenFromCredentialFieldSet } from '../../../CredentialsDisplay/utils';
import { useCredentialsDisplayItem } from '../../../CredentialsDisplay/CredentialsDisplayItemContext';

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
  credentialsDisplayItem,
}: {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
}): DataFieldAddressInputReturn {
  const form = useFormContext();
  const { objectController } = credentialsDisplayItem;
  const fieldName = objectController.field.name;
  const fieldValue = objectController.field.value;

  const [isFetchingPlace, setFetchingPlace] = useState(false);
  const {
    handleAutoComplete,
    fetchPlace,
    buildAddress,
    suggestions,
    isPending,
  } = useAutoFill();

  const disabled = useMemo(() => {
    if (credentialsDisplayItem.isDisabled) {
      return true;
    }
    for (const [key] of Object.entries(
      extractChildrenFromCredentialFieldSet(fieldValue),
    )) {
      if (key === 'line2') continue;

      const childFieldValue = form.getValues(`${fieldName}.${key}`);

      // If any of the child field used in this component is not allowed to be edited, the address field should be disabled
      if (
        !childFieldValue.credentialDisplayInfo.credentialRequest.allowUserInput
      ) {
        return true;
      }
    }
    return false;
  }, [form, credentialsDisplayItem]);

  const error = useMemo(() => {
    for (const [key] of Object.entries(
      extractChildrenFromCredentialFieldSet(fieldValue),
    )) {
      // Composite address data field does not changes line 2
      if (key === 'line2') continue;
      const childFieldState = form.getFieldState(`${fieldName}.${key}`);
      if (childFieldState.error?.message) {
        return `${fieldValue.credentialDisplayInfo.label} is invalid`;
      }
    }
    return undefined;
  }, [form]);

  const defaultValue = useMemo(() => {
    return toUSaddress({
      line1: fieldValue.line1.value,
      city: fieldValue.city.value,
      state: fieldValue.state.value,
      zipCode: fieldValue.zipCode.value,
    });
  }, []);

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

    // Update all existing child values in the form context.
    for (const [key] of Object.entries(
      extractChildrenFromCredentialFieldSet(fieldValue),
    )) {
      // Composite address data field does not changes line 2
      if (key === 'line2') continue;

      credentialsDisplayItem.handleChangeChildValueCredential(
        key,
        addressParts?.[key as keyof typeof addressParts] ?? '',
        changeOptions,
      );
    }
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
    disabled,
    handleInputChange,
    handleOptionChange,
    handleClear,
  };
}
