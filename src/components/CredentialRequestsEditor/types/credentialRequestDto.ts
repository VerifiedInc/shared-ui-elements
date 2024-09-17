import { type MandatoryEnum } from './mandatoryEnum';

export interface CredentialRequestDto {
  type: string;
  issuers?: string[];
  required?: boolean;
  mandatory?: MandatoryEnum;
  description?: string;
  allowUserInput?: boolean;
  children?: CredentialRequestDto[];
}
