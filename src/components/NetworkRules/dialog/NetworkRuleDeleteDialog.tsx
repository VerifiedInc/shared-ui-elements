import type { ReactNode } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useHeldWhileClosed } from '../hooks/useHeldWhileClosed';
import { useNetworkRulesCatalog } from '../hooks/useNetworkRulesCatalog';
import type { NetworkRule, NetworkRuleCatalog } from '../types';
import { getKeyLabel, getOperatorLabel } from '../utils/catalog';
import { normalizeConditionValues } from '../utils/condition';

export interface NetworkRuleDeleteDialogProps {
  open: boolean;
  rule?: NetworkRule | null;
  /** When set, one condition of `rule` is being deleted instead of the rule. */
  conditionIndex?: number | null;
  onConfirm: (
    rule: NetworkRule,
    conditionIndex?: number,
  ) => void | Promise<void>;
  onClose: () => void;
  isDeleting?: boolean;
  title?: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
}

function describeDeletion(
  catalog: NetworkRuleCatalog | undefined,
  rule: NetworkRule,
  conditionIndex: number | undefined,
): string {
  if (conditionIndex === undefined) {
    const count = rule.conditions.length;
    return `"${rule.name}" and its ${count} ${
      count === 1 ? 'condition' : 'conditions'
    } will be removed. This cannot be undone.`;
  }
  const condition = rule.conditions[conditionIndex];
  const summary = condition
    ? `${getKeyLabel(catalog, condition.key)} ${getOperatorLabel(
        catalog,
        condition.operator,
      )} ${normalizeConditionValues(condition.value).join(', ')}`
    : `Condition ${conditionIndex + 1}`;
  return `"${summary}" will be removed from "${rule.name}". The rule keeps its other conditions.`;
}

export function NetworkRuleDeleteDialog({
  open,
  rule: ruleProp,
  conditionIndex: conditionIndexProp,
  onConfirm,
  onClose,
  isDeleting = false,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}: Readonly<NetworkRuleDeleteDialogProps>) {
  const { data: catalog } = useNetworkRulesCatalog();
  const rule = useHeldWhileClosed(open, ruleProp ?? undefined);
  const conditionIndex = useHeldWhileClosed(
    open,
    conditionIndexProp ?? undefined,
  );

  const isCondition = conditionIndex !== undefined;
  const resolvedTitle =
    title ?? (isCondition ? 'Delete condition?' : 'Delete rule?');
  const resolvedDescription =
    description ??
    (rule === undefined
      ? undefined
      : describeDeletion(catalog, rule, conditionIndex));

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>{resolvedTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{resolvedDescription}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='neutral' onClick={onClose} disabled={isDeleting}>
          {cancelLabel}
        </Button>
        <Button
          color='error'
          variant='contained'
          disabled={isDeleting || rule === undefined}
          startIcon={
            isDeleting ? (
              <CircularProgress size={16} color='inherit' />
            ) : undefined
          }
          onClick={() => {
            if (rule === undefined) return;
            void onConfirm(rule, conditionIndex);
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
