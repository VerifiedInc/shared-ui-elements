import type { SxProps } from '@mui/material';

/**
 * One card in a breakdown row. `dataKeys` are the interval fields summed into
 * the card, across every brand and interval in the chart data.
 */
export interface OverviewBreakdownCard {
  key: string;
  label: string;
  dataKeys: string[];
  sx?: SxProps;
}

export type OverviewBreakdownTotals = Record<string, number>;
