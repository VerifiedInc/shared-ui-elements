import { useMemo } from 'react';
import {
  Chip,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { useResolvedConditionOptions } from '../hooks/useResolvedConditionOptions';
import { OptionChips } from '../shared/OptionChips';
import type {
  NetworkRule,
  NetworkRuleCatalog,
  NetworkRuleCondition,
} from '../types';
import { getKeyDef, getKeyLabel, getOperatorLabel } from '../utils/catalog';
import { normalizeConditionValues } from '../utils/condition';

export interface NetworkRuleConditionsTableProps {
  rule: NetworkRule;
  catalog?: NetworkRuleCatalog;
  readOnly?: boolean;
  onEditCondition?: (rule: NetworkRule, index: number) => void;
  onDeleteCondition?: (rule: NetworkRule, index: number) => void;
}

interface ConditionRowProps {
  rule: NetworkRule;
  condition: NetworkRuleCondition;
  index: number;
  catalog?: NetworkRuleCatalog;
  showActions: boolean;
  onEditCondition?: (rule: NetworkRule, index: number) => void;
  onDeleteCondition?: (rule: NetworkRule, index: number) => void;
}

function ConditionRow({
  rule,
  condition,
  index,
  catalog,
  showActions,
  onEditCondition,
  onDeleteCondition,
}: Readonly<ConditionRowProps>) {
  const keyDef = getKeyDef(catalog, condition.key);
  const values = useMemo(
    () => normalizeConditionValues(condition.value),
    [condition.value],
  );
  const { options, isLoading, service } = useResolvedConditionOptions(
    keyDef,
    values,
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
          <OptionChips options={options} renderChip={service?.renderChip} />
        )}
      </TableCell>
      {showActions && (
        <TableCell align='right' sx={{ whiteSpace: 'nowrap' }}>
          {onEditCondition && (
            <IconButton
              size='small'
              color='primary'
              aria-label={`Edit condition ${index + 1}`}
              onClick={() => onEditCondition(rule, index)}
            >
              <Edit fontSize='small' />
            </IconButton>
          )}
          {onDeleteCondition && (
            <IconButton
              size='small'
              color='error'
              aria-label={`Delete condition ${index + 1}`}
              // A rule needs at least one condition; delete the rule instead.
              disabled={rule.conditions.length <= 1}
              onClick={() => onDeleteCondition(rule, index)}
            >
              <Delete fontSize='small' />
            </IconButton>
          )}
        </TableCell>
      )}
    </TableRow>
  );
}

export function NetworkRuleConditionsTable({
  rule,
  catalog,
  readOnly = false,
  onEditCondition,
  onDeleteCondition,
}: Readonly<NetworkRuleConditionsTableProps>) {
  const showActions =
    !readOnly &&
    (onEditCondition !== undefined || onDeleteCondition !== undefined);

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
          {showActions && <TableCell align='right'>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {rule.conditions.map((condition, index) => (
          <ConditionRow
            key={`${condition.key}-${condition.operator}-${index}`}
            rule={rule}
            condition={condition}
            index={index}
            catalog={catalog}
            showActions={showActions}
            onEditCondition={onEditCondition}
            onDeleteCondition={onDeleteCondition}
          />
        ))}
      </TableBody>
    </Table>
  );
}
