import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { isCompositeBySchema } from '../../../utils/isCompositeBySchema';
import { compareCredentialData } from '../../../utils/compareCredentialData';

import {
  CredentialDisplayInfo,
  CredentialRequests,
  Credentials,
  MandatoryEnum,
} from '../types';
import {
  filterRepeatedCredentials,
  getCredentialTypeDisplayInfo,
  getReferencedSchemaNames,
  isRequiredCredentialDisplayInfo,
  sortCredentialsBySchema,
} from '../utils';

/**
 * Orders credentials by the order from the list of credential requests.
 * Used for displaying credentials on the Request page
 * @param {Credentials[]} credentials the credentials to order
 * @param {CredentialRequests[]} credentialRequests the credential requests to order by
 * @param {any} schema the schema to use to get the display info for each credential
 * @param options Attributes or properties to cascade down to children
 * @returns {CredentialDisplayInfo[]} the ordered credential display info
 */
export const makeCredentialDisplayInfoList = (
  credentials: Credentials[],
  credentialRequests: CredentialRequests[],
  schema: any,
  options?: {
    allowUserInput?: boolean;
    mandatory?: MandatoryEnum;
  },
): CredentialDisplayInfo[] => {
  // Root display info does not contain options.
  const isRoot = !options;

  // Build the display info type.
  const makeCredentialDisplayInfoIncomplete = (
    credential: Credentials,
    credentialRequest: CredentialRequests,
    schema: any,
  ): CredentialDisplayInfo => {
    // get the display info for the credential type
    const credentialTypeDisplayInfo = getCredentialTypeDisplayInfo(
      schema,
      credential.type,
    );

    // Retrieve credential value to know if it is composite or atomic.
    const isComposed = Array.isArray(credential.data);

    // Build description along with the receiverName.
    const description = credentialRequest.description ?? '';

    const credentialData = Object.values(credential.data ?? {})?.[0] as string;

    const compoundCredentialRequest = {
      ...credentialRequest,
      mandatory:
        credentialRequest.mandatory ?? options?.mandatory ?? MandatoryEnum.NO,
      // The SDK currently will allow user input always
      allowUserInput: true,
      description,
    };

    const isRequired = isRequiredCredentialDisplayInfo({
      mandatory: compoundCredentialRequest.mandatory,
    });

    const mapCredentialRequests = (credentialDto: any) => ({
      type: credentialDto.type,
      mandatory: credentialRequest.mandatory,
      allowUserInput: (options ?? credentialRequest)?.allowUserInput,
    });

    // Make CredentialRequests list from children or from credentials.
    const makeCredentialRequestsList = (): CredentialRequests[] => {
      if (credentialRequest.children) return credentialRequest.children;

      // Make CredentialRequests from Credentials and sort by schema.
      return credential.data
        .slice(0)
        .sort(sortCredentialsBySchema(credential, schema))
        .map(mapCredentialRequests);
    };

    return {
      id: credential.uuid,
      label: credentialTypeDisplayInfo.label,
      // We do not need to assign any value for the composed credential, as its value will be the data array of atomic credentials.
      value: isComposed ? '' : credentialData,
      // Setup new credential later in the upper function.
      isNewCredential: false,
      displayFormat: credentialTypeDisplayInfo.displayFormat,
      // Assign the children from the credential and credential requests child nodes.
      children: isComposed
        ? makeCredentialDisplayInfoList(
            credential.data as any[],
            makeCredentialRequestsList(),
            schema,
            options ?? {
              allowUserInput: credentialRequest.allowUserInput,
              mandatory: credentialRequest.mandatory,
            },
          )
        : undefined,
      credentialRequest: compoundCredentialRequest,
      schema: credentialTypeDisplayInfo.schema,
      credential,
      // Have multi value instances.
      instances: [],
      // Set original Instance for value comparison between the current data and here.
      originalInstance: null,
      // This state will control the UI and also will let us better manipulate the data structure.
      uiState: {
        isEditMode: false,
        isChecked: isComposed
          ? true
          : isRequired
            ? true
            : credentialData.length > 0,
        // Default valid state should be true to readonly and false to editable.
        isValid: !compoundCredentialRequest?.allowUserInput,
        isDirty: false,
        errorMessage: null,
      },
    } as any satisfies CredentialDisplayInfo;
  };

  // Retrieve the instances of the same type of the credential requests,
  // the instances gathered are checked from root level only.
  const buildInstances = (
    credentials: Credentials[],
    credentialRequest: any,
  ): CredentialDisplayInfo[] => {
    return (
      _.chain(credentials)
        // Filter to return only credentials of exact same structure of types.
        .filter((credential: any) => credential.type === credentialRequest.type)
        // Remove duplicated credentials by value.
        .uniqWith(compareCredentialData)
        // Map the credentials to be in display info type.
        .map((credential) =>
          makeCredentialDisplayInfoIncomplete(
            credential,
            credentialRequest,
            schema,
          ),
        )
        // Return the value from the chain.
        .value()
    );
  };

  // Build credential DTO mock for the empty state.
  const buildCredential = ({ type }: { type: string }): Credentials => {
    // Find the schema property key from credential request type.
    const selectedSchema = schema[type];
    let schemaProperty;
    let credentialData: any;

    if (isCompositeBySchema(selectedSchema)) {
      // Construct credential data using schema references.
      credentialData = getReferencedSchemaNames(selectedSchema, 1).map((type) =>
        buildCredential({ type }),
      );
    } else {
      // Atomic schemas contains properties at root level.
      schemaProperty = selectedSchema.properties;
      credentialData = { [Object.keys(schemaProperty)[0]]: '' };
    }

    const id = uuid();

    return {
      uuid: id,
      id,
      type,
      data: credentialData,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
  };

  // Build the display info type with the other properties it needs.
  const makeCredentialDisplayInfoComplete = (
    credentialRequest: CredentialRequests,
  ) => {
    const credentialsSameType = credentials.filter(
      (credential) => credential.type === credentialRequest.type,
    );
    let credential = credentialsSameType[0];

    // there should always be a credential for each credential request
    // if not, we'll filter out the undefined values later
    if (!credential) {
      // Create a new credential for user to input with empty value to fill in.
      credential = buildCredential({ type: credentialRequest.type });
    }

    const credentialDisplayInfo = makeCredentialDisplayInfoIncomplete(
      credential,
      credentialRequest,
      schema,
    );
    const instances = isRoot
      ? buildInstances(credentialsSameType, credentialRequest)
      : [];

    credentialDisplayInfo.instances = instances;
    // Clone the original data and save in a property.
    credentialDisplayInfo.originalInstance = _.cloneDeep(credentialDisplayInfo);

    return credentialDisplayInfo;
  };

  // Filter only set credentialDisplayInfo type.
  const filterOnlySetList = (
    credentialDisplayInfo: CredentialDisplayInfo | undefined,
  ): credentialDisplayInfo is CredentialDisplayInfo =>
    Boolean(credentialDisplayInfo);

  // Return a unique set of credentialDisplayInfo type.
  return filterRepeatedCredentials(
    credentialRequests
      .map(makeCredentialDisplayInfoComplete)
      .filter(filterOnlySetList),
  );
};
