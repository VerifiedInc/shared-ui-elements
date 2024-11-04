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

// Get the minimum date instance with the given date, month, and year.
export const getMinDateInstance = (
  minDate = 1,
  minMonth = 1,
  minYear = 1900,
): Date => {
  return new Date(minYear, minMonth - 1, minDate, 0, 0, 0, 0);
};

// Get the maximum date instance.
export const getMaxDateInstance = (allowFutureDates = true): Date => {
  const nowDate = new Date();
  const maxDate = allowFutureDates ? 31 : nowDate.getDate();
  const maxMonth = allowFutureDates ? 12 : nowDate.getMonth() + 1;
  const maxYear = allowFutureDates ? 2200 : nowDate.getFullYear();

  return new Date(maxYear, maxMonth - 1, maxDate, 23, 59, 59, 999);
};
