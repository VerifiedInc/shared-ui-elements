import { DisplayFormatEnum } from '../types/display-format';

import { addressFormatter } from './addressFormatter';
import { calendarDateFormatter } from './calendarDateFormatter';
import { currencyRangeFormatter } from './currencyRangeFormatter';
import phoneNumberFormatter from './phoneNumberFormatter';
import { ssnFormatter } from './ssnFormatter';

/**
 * Formats a credential value based on its type.
 * @param {string} rawValue the raw value of the credential
 * @param {DisplayFormatEnum | string} type the type of the credential
 * @returns {string} the formatted value
 */
export const formatCredentialValue = (
  rawValue: string,
  type: DisplayFormatEnum | string | undefined,
): string => {
  // Do not format empty values.
  if (!rawValue?.length) return '';

  switch (type) {
    case DisplayFormatEnum.Phone: {
      return phoneNumberFormatter(rawValue);
    }
    case DisplayFormatEnum.Ssn: {
      return ssnFormatter(rawValue);
    }
    case DisplayFormatEnum.Date: {
      return calendarDateFormatter(rawValue);
    }
    case DisplayFormatEnum.Address:
      return addressFormatter(rawValue);
    case DisplayFormatEnum.CurrencyRange:
      return currencyRangeFormatter(rawValue);
    default:
      return rawValue;
  }
};
