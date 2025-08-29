/**
 * Formats a calendar date in MM/DD/YYYY format
 * @param {string} epoch string representation of ms since epoch
 * @returns {string} formatted date
 */
export const calendarDateFormatter = (epoch: string): string => {
  return new Date(Number(epoch)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC', // use UTC as the credentials data is stored in UTC
  });
};
