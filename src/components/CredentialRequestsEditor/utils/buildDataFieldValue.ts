import _ from 'lodash';
import { CredentialRequests } from '../types/form';
import { MandatoryEnum } from '../types/mandatoryEnum';

import { fields } from '../../form/NewOneClickForm/core/fields';

export function buildDataFieldValue(type: string): CredentialRequests {
  // if (isComposedSchema) {
  //   const children = extractTypes(selectedSchema, type)
  //     .map((item) => buildDataFieldValue(item, schema))
  //     .filter((child): child is CredentialRequests => child !== null);
  //   return {
  //     type,
  //     mandatory: MandatoryEnum.NO,
  //     description: '',
  //     allowUserInput: true,
  //     multi: false,
  //     ...(children.length > 0 ? { children } : {}),
  //   };
  // }
  // return {
  //   type,
  //   mandatory: MandatoryEnum.NO,
  //   description: '',
  //   allowUserInput: true,
  //   multi: type === 'EmailCredential',
  // };
}
