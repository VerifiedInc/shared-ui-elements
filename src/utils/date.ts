/**
 * Formats a timestamp into a pretty format of MM/DD/YYYY.
 * @param timestamp
 * @param separator
 */
export const formatDateMMDDYYYY = (timestamp?: string): string => {
  let date = new Date(Number(timestamp));

  if (!timestamp) {
    const nowDate = new Date();
    date = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDate(),
    );
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return [month, day, year].join('/');
};

export const formatDateToTimestamp = (
  dateValue: number | string | Date,
): string => {
  const date = new Date(dateValue);

  date.setUTCHours(12);

  return String(+date);
};

/**
 * Formats a timestamp into a pretty format of MM/YY.
 * @param date - date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns formatted date
 */
export const formatDateMMYY = (
  date: number | string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  return new Date(Number(date)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour12: false,
    ...options,
  });
};

/**
 * Formats a date into an extended format including weekday, year, month, day, hour, and minute.
 * @param date - date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns formatted date in extended format
 */
export const formatExtendedDate = (
  date: number | string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  return new Date(Number(date)).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...options,
  });
};
