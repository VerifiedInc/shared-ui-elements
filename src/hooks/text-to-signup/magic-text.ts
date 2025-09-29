import parsePhoneNumberFromString from 'libphonenumber-js';

export function useTTSMagicText({
  phoneNumber,
  keyword,
  text = 'Text',
  signature = 'to',
}: {
  phoneNumber: string;
  keyword: string;
  signature?: string;
  text?: string;
}) {
  if (phoneNumber) {
    phoneNumber =
      parsePhoneNumberFromString(phoneNumber)
        ?.format('NATIONAL')
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '-') ?? phoneNumber;
  }
  return {
    text,
    keyword,
    phoneNumber,
    signature,
  };
}
