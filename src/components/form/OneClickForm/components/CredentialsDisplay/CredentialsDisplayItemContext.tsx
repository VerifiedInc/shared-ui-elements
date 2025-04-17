import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';
import {
  FieldValues,
  useController,
  UseControllerReturn,
  useFormContext,
} from 'react-hook-form';

import { DEBOUNCE_MS } from '../../components/DataField/utils';
import { useDebounceCallback } from '../../hooks/useDebounceCallback';

import { CredentialDisplayInfo, CredentialFieldSet } from './types';
import { useCredentialsDisplay } from './CredentialsDisplayContext';
import { extractChildrenFromCredentialFieldSet, getParentPath } from './utils';

export type CredentialsDisplayItemContext = {
  path: string;
  objectController: UseControllerReturn<FieldValues, string>;
  parentFieldSet?: CredentialFieldSet;
  credentialDisplayInfo: CredentialDisplayInfo;
  isChecked: boolean;
  isAllChecked: boolean;
  isSelectable: boolean;
  isDisabled: boolean;
  isRoot: boolean;
  handleSelectCredential(checked: boolean, shouldCascade?: boolean): void;
  handleChangeValueCredential(
    value: unknown,
    options?: { shouldValidate?: boolean },
  ): void;
  handleChangeDebouncedValueCredential(
    value: unknown,
    options?: { shouldValidate?: boolean },
  ): void;
  handleChangeChildValueCredential(
    childPath: string,
    value: unknown,
    options?: { shouldValidate?: boolean },
  ): void;
  handleClearValueCredential(): void;
  handleChangeValidationCredential(valid: boolean, message?: string): void;
  handleChangeCredentialInstance(credentialId: string): void;
  handleToggleEditModeCredential(editMode: boolean): void;
};

const Context = createContext<CredentialsDisplayItemContext | null>(null);

/**
 * This hook will give access to the credential in the level that it is being called.
 */
export function useCredentialsDisplayItem(): CredentialsDisplayItemContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'The component calling this hook is missing a parent with *CredentialsDisplayItemProvider*',
    );
  }

  return context;
}

type CredentialsDisplayItemProviderProps = {
  path: string;
  children: ReactNode | ReactNode[];
  credentialDisplayInfo: CredentialDisplayInfo;
  isSelectable: boolean;
  isRoot: boolean;
};

/**
 * This is a context for the usage of rendered display items and its data field components
 * for a more manageable state.
 * @param props
 * @constructor
 */
export default function CredentialsDisplayItemProvider(
  props: CredentialsDisplayItemProviderProps,
): ReactElement {
  const { children, isRoot, ...restProps } = props;
  const credentialDisplay = useCredentialsDisplay();
  const form = useFormContext();
  const objectController = useController({ name: props.path });
  const parentFieldSet = isRoot
    ? undefined
    : form.watch(getParentPath(props.path));
  // Has to watch for the path to listen to nested fields.
  const field: CredentialFieldSet = form.watch(props.path);
  /**
   * Select/unselect the credential in displayInfoList by the path.
   */
  const handleSelectCredential = (
    checked: boolean,
    shouldCascade = true,
  ): void => {
    credentialDisplay.handleSelectCredential(
      restProps.path,
      checked,
      shouldCascade,
    );
  };

  /**
   * Change credential instance by the credentialId and by the path.
   * @param credentialId
   */
  const handleChangeCredentialInstance = (credentialId: string): void => {
    credentialDisplay.handleChangeCredentialInstance(
      restProps.path,
      credentialId,
    );
  };

  /**
   * Changes the credential value by the path.
   * @param value
   * @param options
   */
  const handleChangeValueCredential = (
    value: unknown,
    options?: { shouldValidate?: boolean },
  ): void => {
    credentialDisplay.handleChangeValueCredential(
      restProps.path,
      value,
      options,
    );

    // Select the credential if it has a value.
    handleSelectCredential(!!value, true);
  };

  /**
   * Changes the credential value by the path with debounce. This is useful for input fields.
   * @param value
   */
  const handleChangeDebouncedValueCredential = useDebounceCallback(
    (value: unknown, options?: { shouldValidate?: boolean }) => {
      handleChangeValueCredential(value, options);
    },
    DEBOUNCE_MS,
  );

  /**
   * Changes the child credential value by the path.
   * @param childPath
   * @param value
   * @param options
   */
  const handleChangeChildValueCredential = (
    childPath: string,
    value: unknown,
    options?: { shouldValidate?: boolean },
  ): void => {
    credentialDisplay.handleChangeValueCredential(
      `${restProps.path}.${childPath}`,
      value,
      options,
    );
  };

  /**
   * Changes the credential validation by the path.
   * @param valid
   * @param message
   */
  const handleChangeValidationCredential = (
    valid: boolean,
    message?: string,
  ): void => {
    credentialDisplay.handleChangeValidationCredential(
      restProps.path,
      valid,
      message,
    );
  };

  /**
   * Clears the credential value by the path.
   */
  const handleClearValueCredential = (): void => {
    credentialDisplay.handleClearValueCredential(restProps.path);
  };

  /**
   * Toggles the edit mode of the credential by the path.
   * @param editMode
   */
  const handleToggleEditModeCredential = (editMode: boolean): void => {
    credentialDisplay.handleToggleEditModeCredential(restProps.path, editMode);
  };

  const isChecked = useMemo(() => {
    return field.credentialDisplayInfo.uiState.isChecked;
  }, [field.credentialDisplayInfo.uiState.isChecked]);

  const isAllChecked = useMemo(() => {
    const cascadeCheck = (credentialFieldSet: CredentialFieldSet): boolean => {
      const { credentialDisplayInfo } = credentialFieldSet;
      const children =
        extractChildrenFromCredentialFieldSet(credentialFieldSet);
      if (Object.values(children).length) {
        return Object.values(children).every(cascadeCheck);
      }

      return credentialDisplayInfo.uiState?.isChecked || false;
    };
    return cascadeCheck(field);
  }, [JSON.stringify(field)]);

  // Disabled prop that will be passed to the input only,
  // and not to the field controller as it may set the value to undefined, we do not want that.
  const isDisabled = useMemo(() => {
    return !restProps.credentialDisplayInfo?.credentialRequest?.allowUserInput;
  }, [JSON.stringify(restProps.credentialDisplayInfo)]);

  return (
    <Context.Provider
      value={{
        ...restProps,
        objectController,
        parentFieldSet,
        isRoot,
        isChecked,
        isAllChecked,
        isDisabled,
        handleSelectCredential,
        handleChangeCredentialInstance,
        handleChangeValueCredential,
        handleChangeDebouncedValueCredential,
        handleChangeChildValueCredential,
        handleChangeValidationCredential,
        handleClearValueCredential,
        handleToggleEditModeCredential,
      }}
    >
      {children}
    </Context.Provider>
  );
}
