/**
 * Formats a currency range string into a human-readable format.
 * @param {string} rawValue the raw value from the credential, e.g. "USD min100000_max200000"
 * @returns {string} the formatted value, e.g. "USD 100,000 - 200,000"
 */
export const currencyRangeFormatter = (rawValue: string): string => {
  // split the raw value into currency and range
  const [currency, rawRange] = rawValue.split(' ');

  // split the range into min and max
  const [rawMin, rawMax] = rawRange.split('_');

  // parse the min and max numerical values from the raw strings
  const minValue = parseInt(rawMin.slice(3));
  const maxValue = parseInt(rawMax.slice(3));

  // format the min and max values (with commas in the US and whatever delimiter is appropriate for other locales)
  const formattedMinValue = minValue.toLocaleString();
  const formattedMaxValue = maxValue.toLocaleString();

  // combine the min and max values into a range to be displayed
  const formattedRange = `${formattedMinValue} - ${formattedMaxValue}`;

  // add the currency symbol back to the range
  const formattedValue = `${currency} ${formattedRange}`;

  return formattedValue;
};
