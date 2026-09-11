import { Check, Close, QuestionMark } from '@mui/icons-material';

import type { NetworkRuleStatusPresentation } from './types';

// The one place the module carries catalog values. A status missing here still renders:
// Title Case label, default color, no icon.
export const NETWORK_RULE_STATUSES: Record<
  string,
  NetworkRuleStatusPresentation
> = {
  IN_NETWORK: {
    label: 'In Network',
    color: 'success',
    icon: <Check fontSize='small' />,
  },
  INDETERMINATE: {
    label: 'Indeterminate',
    color: 'warning',
    icon: <QuestionMark fontSize='small' />,
  },
  OUT_OF_NETWORK: {
    label: 'Out of Network',
    color: 'error',
    icon: <Close fontSize='small' />,
  },
};

const toTitleCase = (code: string): string =>
  code
    .toLowerCase()
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

export function getStatusPresentation(
  status: string,
): NetworkRuleStatusPresentation {
  return NETWORK_RULE_STATUSES[status] ?? { label: toTitleCase(status) };
}
