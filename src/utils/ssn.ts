/**
 * Formats a SSN to the following format: •••-••-3333
 * accepts SSNs with or without dashes (e.g. '111-22-3333' or '11223333')
 * @param {string} rawValue the raw value of the ssncredential
 * @returns {string} the formatted value
 */
export const ssnFormatter = (rawValue: string): string =>
  rawValue.replace(/(\d{3})-?(\d{2})-?(\d{4})/, '•••-••-$3');

// SSN schema, validation regex were gathered from: https://uibakery.io/regex-library/ssn
// The 000 allows for SSN testing. Ref: https://secure.ssa.gov/poms.nsf/lnx/0110201020
export const ssnRegex = /^(?!666|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/;
