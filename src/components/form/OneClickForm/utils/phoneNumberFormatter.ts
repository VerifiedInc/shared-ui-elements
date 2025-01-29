/**
 * A helper function to format phone number - currently only works on 10 digit phone numbers
 * @param phoneNum string representation of a phone number
 * @returns {string} formatted 10 digit phone number
 */
const phoneNumberFormatter = (phoneNum: string): string => {
  return (
    phoneNum.slice(0, -10) +
    ' (' +
    phoneNum.slice(-10, -7) +
    ') ' +
    phoneNum.slice(-7, -4) +
    '-' +
    phoneNum.slice(-4)
  );
};

export default phoneNumberFormatter;
