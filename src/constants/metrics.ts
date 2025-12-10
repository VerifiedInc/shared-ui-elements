export const MetricsInterval = Object.freeze({
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
});

export type MetricsIntervalType =
  (typeof MetricsInterval)[keyof typeof MetricsInterval];
