/**
 * Formats a SSN to the following format: •••-••-3333
 * accepts SSNs with or without dashes (e.g. '111-22-3333' or '11223333')
 * @param {string} rawValue the raw value of the ssncredential
 * @returns {string} the formatted value
 */
export const ssnFormatter = (rawValue: string) =>
  rawValue.replace(/(\d{3})-?(\d{2})-?(\d{4})/, '•••-••-$3');
