import { describe, expect, test } from 'vitest';

import { MetricsInterval } from '../../../src/constants/metrics';
import {
  formatSlope,
  formatStepShort,
  intervalFromStep,
  medianStepMs,
  olsFit,
  trendSeries,
} from '../../../src/components/chart/trend';

const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

describe('olsFit', () => {
  test('recovers an exact line', () => {
    const fit = olsFit([2, 4, 6, 8, 10]);
    expect(fit.slope).toBeCloseTo(2, 10);
    expect(fit.intercept).toBeCloseTo(2, 10);
  });

  test('is flat for constant values', () => {
    const fit = olsFit([7, 7, 7, 7]);
    expect(fit.slope).toBe(0);
    expect(fit.intercept).toBeCloseTo(7, 10);
  });

  test('is negative for a falling series', () => {
    expect(olsFit([10, 8, 7, 4]).slope).toBeLessThan(0);
  });

  test('reads a symmetric dip as flat', () => {
    // The known weakness of a straight fit: a metric that crashed and
    // recovered reports no trend.
    expect(olsFit([10, 5, 2, 5, 10]).slope).toBeCloseTo(0, 10);
  });

  test('handles degenerate input', () => {
    expect(olsFit([])).toEqual({ slope: 0, intercept: 0 });
    expect(olsFit([5])).toEqual({ slope: 0, intercept: 5 });
  });
});

describe('medianStepMs', () => {
  test('returns the spacing of evenly spaced points', () => {
    expect(medianStepMs([0, HOUR, 2 * HOUR, 3 * HOUR])).toBe(HOUR);
  });

  test('is robust to a single gap', () => {
    expect(medianStepMs([0, HOUR, 2 * HOUR, 50 * HOUR, 51 * HOUR])).toBe(HOUR);
  });

  test('returns 0 when there is no spacing to measure', () => {
    expect(medianStepMs([])).toBe(0);
    expect(medianStepMs([DAY])).toBe(0);
  });
});

describe('intervalFromStep', () => {
  test('names every supported interval', () => {
    expect(intervalFromStep(MINUTE)).toBe(MetricsInterval.MINUTE);
    expect(intervalFromStep(HOUR)).toBe(MetricsInterval.HOUR);
    expect(intervalFromStep(DAY)).toBe(MetricsInterval.DAY);
    expect(intervalFromStep(7 * DAY)).toBe(MetricsInterval.WEEK);
    expect(intervalFromStep(30 * DAY)).toBe(MetricsInterval.MONTH);
    expect(intervalFromStep(92 * DAY)).toBe(MetricsInterval.QUARTER);
    expect(intervalFromStep(365 * DAY)).toBe(MetricsInterval.YEAR);
  });

  test('does not confuse a long month with a quarter', () => {
    expect(intervalFromStep(31 * DAY)).toBe(MetricsInterval.MONTH);
    expect(intervalFromStep(28 * DAY)).toBe(MetricsInterval.MONTH);
  });

  test('returns null for spacing that matches no named interval', () => {
    expect(intervalFromStep(8 * HOUR)).toBeNull();
    expect(intervalFromStep(0)).toBeNull();
  });
});

describe('formatStepShort', () => {
  test('labels an unnamed bucket compactly', () => {
    expect(formatStepShort(8 * HOUR)).toBe('8h');
    expect(formatStepShort(3 * DAY)).toBe('3d');
    expect(formatStepShort(15 * MINUTE)).toBe('15m');
    expect(formatStepShort(0)).toBe('');
  });
});

describe('trendSeries', () => {
  const rows = [
    { date: 0, value: 2 },
    { date: 8 * HOUR, value: 4 },
    { date: 16 * HOUR, value: 6 },
    { date: 24 * HOUR, value: 8 },
  ];

  test('returns a straight fitted column', () => {
    const trend = trendSeries(rows, 'value');
    expect(trend).not.toBeNull();
    const deltas = trend!.values
      .slice(1)
      .map((v, i) => +(v - trend!.values[i]).toFixed(10));
    expect(new Set(deltas).size).toBe(1);
  });

  test('reports the slope per bucket, not per day', () => {
    // +2 per bucket stays +2 whatever the bucket happens to be
    const trend = trendSeries(rows, 'value')!;
    expect(trend.slopePerPoint).toBeCloseTo(2, 10);
    expect(trend.stepMs).toBe(8 * HOUR);
  });

  test('treats missing keys as zero rather than NaN', () => {
    const trend = trendSeries(rows, 'absent')!;
    expect(trend.values.every((v) => Number.isFinite(v))).toBe(true);
    expect(trend.slopePerPoint).toBe(0);
  });

  test('clamps to the given range so a fit cannot leave the plot area', () => {
    const falling = [
      { date: 0, value: 100 },
      { date: DAY, value: 80 },
      { date: 2 * DAY, value: 10 },
    ];
    const trend = trendSeries(falling, 'value', { clampTo: [0, 100] })!;
    expect(Math.max(...trend.values)).toBeLessThanOrEqual(100);
    expect(Math.min(...trend.values)).toBeGreaterThanOrEqual(0);
  });

  test('returns null when there is nothing to fit', () => {
    expect(trendSeries([], 'value')).toBeNull();
    expect(trendSeries([{ date: 0, value: 1 }], 'value')).toBeNull();
  });
});

describe('formatSlope', () => {
  test('reports per the selected interval', () => {
    expect(formatSlope(4.23, { interval: MetricsInterval.DAY })).toBe(
      '+4.2 / day',
    );
    expect(formatSlope(4.23, { interval: MetricsInterval.HOUR })).toBe(
      '+4.2 / hour',
    );
    expect(formatSlope(150, { interval: MetricsInterval.MONTH })).toBe(
      '+150 / month',
    );
    expect(formatSlope(2, { interval: MetricsInterval.YEAR })).toBe(
      '+2.0 / year',
    );
  });

  test('the same slope never changes with the interval label', () => {
    // Guards the original bug: a per-bucket slope must not be rescaled.
    const minute = formatSlope(12, { interval: MetricsInterval.MINUTE });
    const year = formatSlope(12, { interval: MetricsInterval.YEAR });
    expect(minute).toBe('+12 / minute');
    expect(year).toBe('+12 / year');
  });

  test('falls back to naming the measured spacing', () => {
    expect(formatSlope(4.23, { stepMs: HOUR })).toBe('+4.2 / hour');
    expect(formatSlope(4.23, { stepMs: 7 * DAY })).toBe('+4.2 / week');
  });

  test('falls back to a compact label for an unnamed bucket', () => {
    expect(formatSlope(4.23, { stepMs: 8 * HOUR })).toBe('+4.2 / 8h');
  });

  test('omits the unit when the bucket is unknown', () => {
    expect(formatSlope(4.23)).toBe('+4.2');
  });

  test('signs and scales', () => {
    expect(formatSlope(-12.4, { interval: MetricsInterval.DAY })).toBe(
      '-12 / day',
    );
    expect(formatSlope(0, { interval: MetricsInterval.DAY })).toBe(
      '0.00 / day',
    );
  });

  test('uses percentage points for rates', () => {
    expect(
      formatSlope(1.34, { unit: 'percent', interval: MetricsInterval.DAY }),
    ).toBe('+1.3 pp / day');
  });
});
