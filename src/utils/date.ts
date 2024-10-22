/**
 * Formats a timestamp into a pretty format of DD/MM/YYYY.
 * @param timestamp
 * @param separator
 */
export const formatDateDDMMYYYY = (timestamp?: string): string => {
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

/**
 * Formats a timestamp into a pretty format from MMDDYYY to MM/DD/YYYY.
 * @param date
 * @returns
 */
export const formatRawDateMMDDYYYY = (date: string) => {
  const formattedDate =
    date.slice(0, 2) + '/' + date.slice(2, 4) + '/' + date.slice(4, 8);
  return formattedDate;
};

/**
 * Formats a timestamp into a pretty format from MM/DD to MM/DD/YYYY always enforcing year to be 1970.
 * @param date
 * @returns
 */
export const formatDateMMDD = (date: string) => {
  const formattedDate = date.slice(0, 2) + '/' + date.slice(3, 5) + '/1970';
  return formattedDate;
};
