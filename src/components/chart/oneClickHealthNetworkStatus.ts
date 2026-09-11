import { green, red, yellow } from '../../styles/colors';
import type { AreaSeriesChartData } from './AreaChart';
import type { OverviewBreakdownCard } from './OverviewBreakdownBigNumbers';

/** Which 1-Click Health lookup the status fields describe. */
export type OneClickHealthLookupKind = 'Autofill' | 'Check';

const NETWORK_STATUSES = [
  { key: 'InNetwork', label: 'In Network', color: green },
  { key: 'Indeterminate', label: 'Indeterminate', color: yellow },
  { key: 'OutOfNetwork', label: 'Out of Network', color: red },
] as const;

type NetworkStatusKey = (typeof NETWORK_STATUSES)[number]['key'];

export function oneClickHealthNetworkStatusDataKey(
  kind: OneClickHealthLookupKind,
  status: NetworkStatusKey,
): string {
  return `oneClickHealth${kind}${status}`;
}

/** Series for the Network Status breakdown of succeeded autofills or checks. */
export function oneClickHealthNetworkStatusSeries(
  kind: OneClickHealthLookupKind,
): AreaSeriesChartData[] {
  return NETWORK_STATUSES.map((status) => ({
    key: status.label,
    dataKey: oneClickHealthNetworkStatusDataKey(kind, status.key),
    color: status.color,
  }));
}

/** Overview cards: each status summed over autofills and checks. */
export const oneClickHealthNetworkStatusCards: OverviewBreakdownCard[] =
  NETWORK_STATUSES.map((status) => ({
    key: status.key,
    label: status.label,
    dataKeys: [
      oneClickHealthNetworkStatusDataKey('Autofill', status.key),
      oneClickHealthNetworkStatusDataKey('Check', status.key),
    ],
    sx: { color: status.color },
  }));
