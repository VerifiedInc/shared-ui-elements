import { format } from 'date-fns';
import { TZDate } from '@date-fns/tz';

/**
 * Formats a timestamp into a pretty format of DD/MM/YYYY.
 * @param timestamp
 * @param separator
 */
export const formatDateDDMMYYYY = (timestamp?: string) => {
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
 * Formats a timestamp into a pretty format from MMDD to MM/DD/YYYY always enforcing year to be 1970.
 * @param date
 * @returns
 */
export const formatDateMMDD = (date: string) => {
  const formattedDate = date.slice(0, 2) + '/' + date.slice(2, 4) + '/1970';
  return formattedDate;
};

export const formatMMDDYYYYTime = (date: number | string) => {
  return new Date(Number(date)).toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
};

export const formatMMMDD = (
  date: number | string,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Date(Number(date)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour12: false,
    ...options,
  });
};

export const formatExtendedDate = (
  date: number | string,
  options?: Intl.DateTimeFormatOptions,
) => {
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

export const getTimestampWithOffset = (
  date: Date | string | number,
  timezone: string,
) => {
  const newDate = new Date(
    format(date, "yyyy-MM-dd'T'HH:mm:ss.000'Z'"),
  ).toString();
  return (
    new TZDate(newDate, timezone).getTime() -
    new TZDate(newDate, timezone).getTimezoneOffset() * 60 * 1000
  );
};

export const dateUtils = {
  /**
   * Convert date from MM-DD-YYYY to YYYY-MM-DD
   * @param date
   * @returns
   */
  toYYYYDDMM: (date: string): string => {
    // extract the components from the date format
    const [month, day, year] = date.split('/');
    return `${year}-${month}-${day}`;
  },
  /**
   * Formats a timestamp into a pretty format from MMDD to MM/DD/YYYY always enforcing year to be 1970.
   * @param date
   * @returns
   */
  formatDateMMDD: (date: string) => {
    const formattedDate = date.slice(0, 2) + '/' + date.slice(2, 4) + '/1970';
    return formattedDate;
  },
};
