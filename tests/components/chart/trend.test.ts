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
  test('fits against x when given, so uneven spacing is honoured', () => {
    // Same values, but the middle sample sits far from the others.
    const ys = [0, 10, 11];
    const even = olsFit(ys);
    const timed = olsFit(ys, [0, 100, 101]);
    expect(even.slope).toBeCloseTo(5.5, 10);
    // 704 / 6734 - roughly fifty times shallower than the index-based fit
    expect(timed.slope).toBeCloseTo(704 / 6734, 10);
    expect(Math.abs(timed.slope)).toBeLessThan(Math.abs(even.slope) / 50);
  });

  test('is flat when every x is identical', () => {
    expect(olsFit([1, 2, 3], [5, 5, 5]).slope).toBe(0);
  });

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
    // +2 per 8h bucket, reported against the measured 8h spacing
    const trend = trendSeries(rows, 'value')!;
    expect(trend.slopePerInterval).toBeCloseTo(2, 10);
    expect(trend.stepMs).toBe(8 * HOUR);
  });

  test('reports the slope in the requested interval', () => {
    // +2 per 8h == +0.25 per hour == +6 per day
    expect(
      trendSeries(rows, 'value', { interval: MetricsInterval.HOUR })!
        .slopePerInterval,
    ).toBeCloseTo(0.25, 10);
    expect(
      trendSeries(rows, 'value', { interval: MetricsInterval.DAY })!
        .slopePerInterval,
    ).toBeCloseTo(6, 10);
  });

  test('measures elapsed time, not row count, when buckets are missing', () => {
    // The metrics API returns only non-empty buckets, so an "hourly" series can
    // jump four days between rows. Fitting the index would call this -1/hour.
    const sparse = [
      { date: Date.UTC(2026, 7, 17, 13), value: 4 },
      { date: Date.UTC(2026, 7, 21, 10), value: 20 },
      { date: Date.UTC(2026, 7, 21, 11), value: 2 },
    ];
    const perHour = trendSeries(sparse, 'value', {
      interval: MetricsInterval.HOUR,
    })!.slopePerInterval;

    expect(Math.abs(perHour)).toBeLessThan(0.2);
    expect(perHour).not.toBeCloseTo(-1, 1);
  });

  test('places fitted values at their real timestamps', () => {
    const sparse = [
      { date: 0, value: 0 },
      { date: 100 * HOUR, value: 100 },
      { date: 101 * HOUR, value: 101 },
    ];
    const values = trendSeries(sparse, 'value')!.values;
    // y = x is the exact fit, so each point sits on its own timestamp
    expect(values[0]).toBeCloseTo(0, 6);
    expect(values[1]).toBeCloseTo(100, 6);
    expect(values[2]).toBeCloseTo(101, 6);
  });

  test('treats missing keys as zero rather than NaN', () => {
    const trend = trendSeries(rows, 'absent')!;
    expect(trend.values.every((v) => Number.isFinite(v))).toBe(true);
    expect(trend.slopePerInterval).toBe(0);
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

  test('clamping flattens the drawn segment without changing the slope', () => {
    // A rate that sits at 100% and then drops fits a line whose intercept is
    // above 100%. Clamping pulls that endpoint down, so the segment the user
    // sees is shallower than the number in the tooltip. The reported slope is
    // the true one - measuring the line with a ruler will disagree with it.
    const rate = [
      { date: 0, value: 100 },
      { date: 7 * DAY, value: 100 },
      { date: 14 * DAY, value: 100 },
      { date: 28 * DAY, value: 100 },
      { date: 63 * DAY, value: 100 },
      { date: 105 * DAY, value: (18 / 26) * 100 },
    ];
    const trend = trendSeries(rate, 'value', {
      clampTo: [0, 100],
      interval: MetricsInterval.WEEK,
    })!;

    expect(trend.slopePerInterval).toBeCloseTo(-1.814, 3);
    expect(trend.values[0]).toBe(100); // unclamped this is 104.24
    expect(trend.values.at(-1)).toBeCloseTo(77.04, 2);

    const drawnPerWeek = (trend.values.at(-1)! - trend.values[0]) / 15;
    expect(drawnPerWeek).toBeCloseTo(-1.53, 2);
  });

  test('returns null when there is nothing to fit', () => {
    expect(trendSeries([], 'value')).toBeNull();
    expect(trendSeries([{ date: 0, value: 1 }], 'value')).toBeNull();
  });

  test('returns null rather than a NaN readout for an unparseable date', () => {
    const broken = [
      { date: 0, value: 1 },
      { date: Number(new Date('not a date')), value: 2 },
      { date: 2 * DAY, value: 3 },
    ];
    expect(trendSeries(broken, 'value')).toBeNull();
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
