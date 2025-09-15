export const validateTimestamp = (timestampString: string): boolean => {
  const timestampRegex = /^-?\d+$/;
  if (!timestampRegex.test(timestampString)) {
    return false;
  }

  // Handle invalid date strings (e.g., "NaN")
  if (timestampString === 'NaN' || timestampString === '') {
    return false;
  }

  const timestamp = parseInt(timestampString, 10);
  if (isNaN(timestamp)) {
    return false;
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return false;
  }

  // Ensure the timestamp represents exactly 12:00 PM (noon) UTC
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  const utcSeconds = date.getUTCSeconds();
  const utcMilliseconds = date.getUTCMilliseconds();

  // Only accept timestamps that represent exactly 12:00:00.000 UTC
  if (
    utcHours !== 12 ||
    utcMinutes !== 0 ||
    utcSeconds !== 0 ||
    utcMilliseconds !== 0
  ) {
    return false;
  }

  return true;
};

export const validateMinimumDate1900 = (timestampString: string): boolean => {
  // Handle invalid date strings (e.g., "NaN")
  if (timestampString === 'NaN' || timestampString === '') {
    return false;
  }

  const timestamp = parseInt(timestampString, 10);
  if (isNaN(timestamp)) {
    return false;
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return false;
  }

  // Set minimum valid date (January 1, 1900 at 00:00:00 UTC)
  const minValidTimestamp = Date.UTC(1900, 0, 1, 0, 0, 0, 0);

  // Date must be on or after January 1, 1900
  return timestamp >= minValidTimestamp;
};

export const refineTimestamp = (value: string) => {
  return validateTimestamp(value);
};

export const refineMinimumDate1900 = (value: string) => {
  // First validate it's a valid timestamp (accepts both positive and negative numbers)
  const timestampRegex = /^-?\d+$/;
  if (!timestampRegex.test(value)) {
    return false;
  }
  return validateMinimumDate1900(value);
};
