/**
 * Formats a timestamp into a pretty format of MM/DD/YYYY.
 * @param timestamp
 * @param separator
 */
export declare const formatDateMMDDYYYY: (timestamp?: string) => string;
export declare const getMinDateInstance: (minDate?: number, minMonth?: number, minYear?: number) => Date;
export declare const getMaxDateInstance: (allowFutureDates?: boolean) => Date;
