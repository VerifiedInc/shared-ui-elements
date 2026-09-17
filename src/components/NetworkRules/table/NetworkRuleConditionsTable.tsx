import {
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useResolvedConditionOptions } from '../hooks/useResolvedConditionOptions';
import { OptionChips } from '../shared/OptionChips';
import type {
  NetworkRule,
  NetworkRuleCatalog,
  NetworkRuleCondition,
} from '../types';
import { getKeyDef, getKeyLabel, getOperatorLabel } from '../utils/catalog';

export interface NetworkRuleConditionsTableProps {
  rule: NetworkRule;
  catalog?: NetworkRuleCatalog;
}

interface ConditionRowProps {
  condition: NetworkRuleCondition;
  catalog?: NetworkRuleCatalog;
}

/** Read-only, like the metadata table: a condition is changed through the rule editor. */
function ConditionRow({ condition, catalog }: Readonly<ConditionRowProps>) {
  const keyDef = getKeyDef(catalog, condition.key);
  const { options, isLoading, service } = useResolvedConditionOptions(
    keyDef,
    condition.values,
  );

  return (
    <TableRow>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Chip label={getKeyLabel(catalog, condition.key)} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {getOperatorLabel(catalog, condition.operator)}
      </TableCell>
      <TableCell sx={{ width: '100%' }}>
        {isLoading ? (
          <Skeleton variant='text' width={160} />
        ) : (
          <OptionChips options={options} withLogo={service !== undefined} />
        )}
      </TableCell>
    </TableRow>
  );
}

export function NetworkRuleConditionsTable({
  rule,
  catalog,
}: Readonly<NetworkRuleConditionsTableProps>) {
  if (rule.conditions.length === 0) {
    return (
      <Typography variant='body2' color='text.secondary'>
        No conditions
      </Typography>
    );
  }

  return (
    <Table aria-label={`Conditions for ${rule.name}`}>
      <TableHead>
        <TableRow>
          <TableCell>Key</TableCell>
          <TableCell>Operator</TableCell>
          <TableCell>Values</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rule.conditions.map((condition, index) => (
          <ConditionRow
            key={`${condition.key}-${condition.operator}-${index}`}
            condition={condition}
            catalog={catalog}
          />
        ))}
      </TableBody>
    </Table>
  );
}
