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

  const magicText = {
    text,
    keyword,
    phoneNumber,
    signature,
  };

  return {
    ...magicText,
    displayValue: `${magicText.text} ${magicText.keyword} ${magicText.signature} ${magicText.phoneNumber}`,
  };
}
