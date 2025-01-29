import { MandatoryEnum } from '../../../types/request';

// Check if the display info is strictly required by looking at the mandatory.
export const isRequiredCredentialDisplayInfo = (displayInfo: {
  mandatory?: MandatoryEnum;
}) =>
  displayInfo.mandatory === MandatoryEnum.YES ||
  displayInfo.mandatory === MandatoryEnum.IF_AVAILABLE;
