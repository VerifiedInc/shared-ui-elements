import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Draft, produce } from 'immer';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useOneClickFormOptions } from '../../contexts/one-click-form-options.context';

import {
  CredentialDisplayInfo,
  CredentialFieldSet,
  CredentialRequests,
  Credentials,
} from './types';
import {
  isRequiredCredentialDisplayInfo,
  makeCredentialDisplayInfoList,
  transformToFormObject,
  transformToFormSchema,
} from './utils';

export type CredentialsDisplayContext = {
  credentialRequests: any[];
  credentials: any[];
  displayInfoList: CredentialDisplayInfo[];
  schema: any;
  handleChangeCredentialInstance(path: string, credentialId: string): void;
  handleChangeValueCredential(
    path: string,
    value: unknown,
    options?: { shouldValidate?: boolean },
  ): void;
  handleClearValueCredential(path: string): void;
  handleChangeValidationCredential(
    path: string,
    valid: boolean,
    message?: string,
  ): void;
  handleSelectCredential(
    path: string,
    checked: boolean,
    shouldCascade: boolean,
  ): void;
  handleToggleEditModeCredential(path: string, editMode: boolean): void;
};

type CredentialDisplayReducer = (
  state: CredentialDisplayReducerState,
  action: CredentialDisplayReducerDispatch,
) => CredentialDisplayReducerState;

type CredentialDisplayReducerState = Omit<
  CredentialsDisplayContext,
  | 'handleSelectCredential'
  | 'handleChangeValueCredential'
  | 'handleClearValueCredential'
  | 'handleChangeValidationCredential'
  | 'handleChangeCredentialInstance'
  | 'handleToggleEditModeCredential'
>;

type CredentialDisplayReducerDispatch = (
  state: Draft<CredentialDisplayReducerState>,
) => void;

type CredentialValue = {
  credentials: Credentials[];
  credentialRequests: CredentialRequests[];
  schema: any;
};

const Context = createContext<CredentialsDisplayContext | null>(null);

/**
 * Hook that hold the context value, should be used in nested components to avoid props drilling.
 */
export function useCredentialsDisplay() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'The component calling this hook is missing a parent with *CredentialDisplayProvider*',
    );
  }

  return context;
}

/**
 * Credentials display context, on it we have all the business logic to control the display info state by handlers.
 * @param value
 * @param children
 * @constructor
 */
export default function CredentialsDisplayProvider({
  value,
  children,
}: {
  value: CredentialValue;
  children: ReactNode | ReactNode[];
}) {
  const oneClickFormOptions = useOneClickFormOptions();

  const displayInfoList = useMemo(
    () =>
      makeCredentialDisplayInfoList(
        value.credentials,
        value.credentialRequests,
        value.schema,
      ),
    [value.credentialRequests, value.credentials, value.schema],
  );

  // Declare the state manager for the context.
  const [state] = useReducer<CredentialDisplayReducer>(produce, {
    credentials: value.credentials,
    credentialRequests: value.credentialRequests,
    schema: value.schema,
    displayInfoList,
  });

  const form = useForm({
    mode: 'onChange',
    defaultValues: transformToFormObject(state.displayInfoList),
    resolver: zodResolver(
      transformToFormSchema(state.displayInfoList, oneClickFormOptions.options),
    ),
  });

  /**
   * Changes the credential in displayInfoList by id.
   * @param path
   * @param credentialId   */
  const handleChangeCredentialInstance = (
    path: string,
    credentialId: string,
  ) => {
    const field = form.getValues(path);

    const matchDisplayInfo = field.credentialDisplayInfo.instances.find(
      (instance: any) => instance.id === credentialId,
    );

    if (!matchDisplayInfo) {
      throw new Error('matchDisplayInfo should not be undefined.');
    }

    // Keep instances list.
    matchDisplayInfo.instances = JSON.parse(
      JSON.stringify(field.credentialDisplayInfo.instances),
    );

    const formFieldChunk = transformToFormObject([matchDisplayInfo]);
    const newField = Object.values(formFieldChunk)[0];

    // Replaces the entire field object and down.
    form.setValue(path, newField, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
  };

  /**
   * Select/unselect the credential in displayInfoList by path.
   * @param path
   * @param checked
   * @param shouldCascade
   */
  const handleSelectCredential = (
    path: string,
    checked: boolean,
    shouldCascade = true,
  ) => {
    // Update when credential is available to be checked/unchecked.
    const update = (path: string, credentialFieldSet: CredentialFieldSet) => {
      const field = produce(credentialFieldSet, (draft: CredentialFieldSet) => {
        // Only changes select if is an optional field.
        if (
          !isRequiredCredentialDisplayInfo(
            draft.credentialDisplayInfo.credentialRequest,
          )
        ) {
          draft.credentialDisplayInfo.uiState.isChecked = checked;
        }
      });

      // Replaces the entire field object.
      form.setValue(path, field, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });

      if (shouldCascade) {
        // Removing properties that are not to be included in the update check.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, value, credentialDisplayInfo, ...rest } =
          credentialFieldSet;

        Object.entries(rest).forEach(([key, value]) =>
          update(`${path}.${key}`, value),
        );
      }
    };

    update(path, form.getValues(path));
  };

  /**
   * Changes a specific credential value.
   * @param path
   * @param value
   * @param options
   */
  const handleChangeValueCredential = (
    path: string,
    value: unknown,
    options?: { shouldValidate?: boolean },
  ) => {
    const field = produce(form.getValues(path), (draft: CredentialFieldSet) => {
      draft.value = value as any;
    });
    form.setValue(path, field, {
      shouldValidate: options?.shouldValidate ?? true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  /**
   * Changes a specific credential validation value.
   * @param path
   * @param valid
   * @param message
   */
  const handleChangeValidationCredential = (
    path: string,
    valid: boolean,
    message?: string,
  ) => {
    if (valid) {
      form.clearErrors(path);
    } else {
      form.setError(path, { type: 'custom', message });
    }
  };

  /**
   * Clears the credential value by the path.
   * @param path
   */
  const handleClearValueCredential = (path: string) => {
    const field = produce(form.getValues(path), (draft: CredentialFieldSet) => {
      draft.value = '';
    });
    form.setValue(path, field, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  /**
   * Toggle the edit mode of a credential.
   * @param path
   * @param editMode
   */
  const handleToggleEditModeCredential = (path: string, editMode: boolean) => {
    // Update when credential is available to be checked/unchecked.
    const update = (path: string, credentialFieldSet: CredentialFieldSet) => {
      const field = produce(credentialFieldSet, (draft: CredentialFieldSet) => {
        // Reverting the value to the original value.
        draft.value = draft.credentialDisplayInfo.value;
        draft.credentialDisplayInfo.uiState.isEditMode = editMode;
      });

      // Replaces the entire field object.
      form.setValue(path, field, {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: true,
      });

      // Removing properties that are not to be included in the update method.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, value, credentialDisplayInfo, ...rest } = credentialFieldSet;
      Object.entries(rest).forEach(([key, value]) =>
        update(`${path}.${key}`, value),
      );
    };

    update(path, form.getValues(path));
  };

  return (
    <FormProvider {...form}>
      <Context.Provider
        value={{
          ...state,
          handleChangeCredentialInstance,
          handleSelectCredential,
          handleChangeValueCredential,
          handleClearValueCredential,
          handleChangeValidationCredential,
          handleToggleEditModeCredential,
        }}
      >
        {children}
      </Context.Provider>
    </FormProvider>
  );
}
