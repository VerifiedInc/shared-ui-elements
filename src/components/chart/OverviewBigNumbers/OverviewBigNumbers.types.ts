/**
 * Normalized metrics for product overview BigNumber cards.
 * Used by OverviewBigNumbers and all product-specific BigNumber wrappers.
 */
export interface OverviewMetrics {
  started: number;
  succeeded: number;
  /** Optional. If omitted and hideTotalCost is false, renders as $0.00. */
  totalCost?: number;
  /** Ratio in [0, 1], not a percentage. 0.85 renders as "85.00%". */
  successRate: number;
}

export const defaultOverviewMetrics: OverviewMetrics = {
  started: 0,
  succeeded: 0,
  totalCost: 0,
  successRate: 0,
};
