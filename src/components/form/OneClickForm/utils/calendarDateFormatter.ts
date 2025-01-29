/**
 * Formats a calendar date in a human readable format
 * @param {string} epoch string representation of ms since epoch
 * @returns {string} formatted date
 */
export const calendarDateFormatter = (epoch: string): string => {
  return new Date(Number(epoch)).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // use utc because we don't care about time/tz
  });
};
