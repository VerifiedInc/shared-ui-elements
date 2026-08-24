import {
  MetricsInterval,
  type MetricsIntervalType,
} from '../../constants/metrics';

export interface TrendFit {
  /** Change per data point. */
  slope: number;
  intercept: number;
}

/**
 * Ordinary least squares against the point index, which is what a "line of best
 * fit" means here: one straight line over the window currently in view. Points
 * are treated as evenly spaced, matching how the charts render them.
 */
export function olsFit(values: number[]): TrendFit {
  const n = values.length;
  if (n < 2) return { slope: 0, intercept: values[0] ?? 0 };

  const meanX = (n - 1) / 2;
  const meanY = values.reduce((sum, value) => sum + value, 0) / n;

  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < n; i += 1) {
    numerator += (i - meanX) * (values[i] - meanY);
    denominator += (i - meanX) ** 2;
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  return { slope, intercept: meanY - slope * meanX };
}

/**
 * Median gap between consecutive timestamps, used to name the bucket when the
 * caller doesn't tell us which interval is selected.
 */
export function medianStepMs(dates: number[]): number {
  if (dates.length < 2) return 0;
  const gaps = [];
  for (let i = 1; i < dates.length; i += 1) gaps.push(dates[i] - dates[i - 1]);
  gaps.sort((a, b) => a - b);
  const mid = Math.floor(gaps.length / 2);
  return gaps.length % 2 === 0 ? (gaps[mid - 1] + gaps[mid]) / 2 : gaps[mid];
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Average lengths - months and quarters vary, so these are used for matching only. */
export const INTERVAL_MS: Record<MetricsIntervalType, number> = {
  [MetricsInterval.MINUTE]: MINUTE,
  [MetricsInterval.HOUR]: HOUR,
  [MetricsInterval.DAY]: DAY,
  [MetricsInterval.WEEK]: 7 * DAY,
  [MetricsInterval.MONTH]: 30.44 * DAY,
  [MetricsInterval.QUARTER]: 91.31 * DAY,
  [MetricsInterval.YEAR]: 365.25 * DAY,
};

/**
 * Names the bucket from the spacing actually present in the data. Matching is
 * on the ratio rather than the difference, so a 31-day month doesn't get
 * mistaken for a quarter.
 */
export function intervalFromStep(stepMs: number): MetricsIntervalType | null {
  if (stepMs <= 0) return null;

  let best: MetricsIntervalType | null = null;
  let bestRatio = Number.POSITIVE_INFINITY;
  for (const [name, ms] of Object.entries(INTERVAL_MS)) {
    const ratio = stepMs > ms ? stepMs / ms : ms / stepMs;
    if (ratio < bestRatio) {
      bestRatio = ratio;
      best = name as MetricsIntervalType;
    }
  }

  return bestRatio <= 1.5 ? best : null;
}

/** Compact label for a bucket that matches no named interval, e.g. `8h`. */
export function formatStepShort(stepMs: number): string {
  if (stepMs <= 0) return '';
  if (stepMs >= DAY) return `${+(stepMs / DAY).toFixed(1)}d`;
  if (stepMs >= HOUR) return `${+(stepMs / HOUR).toFixed(1)}h`;
  return `${Math.max(1, Math.round(stepMs / MINUTE))}m`;
}

export interface TrendSeries {
  /** Fitted value per point, aligned with the input rows. */
  values: number[];
  /**
   * Change per data point. One point is one interval bucket, so this is
   * already the change per interval - no conversion, and nothing to get wrong
   * when the operator switches from minutes to years.
   */
  slopePerPoint: number;
  /** Measured spacing, so the caller can name the bucket. */
  stepMs: number;
}

/**
 * Fits `dataKey` across `rows` and returns the fitted column plus its slope.
 * Returns null when there is nothing meaningful to fit.
 */
export function trendSeries(
  rows: Array<Record<string, number>>,
  dataKey: string,
  options: { clampTo?: [number, number] } = {},
): TrendSeries | null {
  if (rows.length < 2) return null;

  const values = rows.map((row) => Number(row[dataKey]) || 0);
  const fit = olsFit(values);
  const [min, max] = options.clampTo ?? [0, Number.POSITIVE_INFINITY];

  return {
    values: values.map((_, i) =>
      Math.min(max, Math.max(min, fit.intercept + fit.slope * i)),
    ),
    slopePerPoint: fit.slope,
    stepMs: medianStepMs(rows.map((row) => Number(row.date))),
  };
}

export interface FormatSlopeOptions {
  /** `percent` reports percentage points, since a change in a rate is not a rate. */
  unit?: 'count' | 'percent';
  /** The selected interval. Falls back to naming the measured spacing. */
  interval?: MetricsIntervalType | null;
  stepMs?: number;
}

/**
 * `+4.2 / day`, `+18 / hour`, `+150 / month` - the slope is always reported per
 * whichever interval the operator is looking at.
 */
export function formatSlope(
  value: number,
  { unit = 'count', interval, stepMs = 0 }: FormatSlopeOptions = {},
): string {
  const magnitude = Math.abs(value);
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  const digits = magnitude >= 10 ? 0 : magnitude >= 1 ? 1 : 2;
  const amount = `${sign}${magnitude.toFixed(digits)}${
    unit === 'percent' ? ' pp' : ''
  }`;

  const bucket =
    interval ?? intervalFromStep(stepMs) ?? formatStepShort(stepMs);
  return bucket ? `${amount} / ${bucket}` : amount;
}
