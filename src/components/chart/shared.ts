import type { YAxisProps } from 'recharts';

export const chartDefaultProps = {
  margin: {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  },
  // Recharts 3 turns this on by default, making every chart focusable; keep it off until that is a deliberate change.
  accessibilityLayer: false,
};

export const xAxisDefaultProps = {
  tickLine: false,
  fontSize: 12,
  tickMargin: 12,
};

export const yAxisDefaultProps = {
  textAnchor: 'end',
  tickLine: false,
} satisfies Partial<YAxisProps>;

/**
 * Tooltip item sorter that keeps the series in the order they are declared, as Recharts 2 did.
 * Recharts 3 sorts tooltip items by name unless told otherwise.
 */
export const keepDeclaredOrder = (): number => 0;
