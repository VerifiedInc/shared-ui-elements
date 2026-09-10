import { Button, Stack, Typography } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

import { CopyableUuid } from '../../CopyableUuid';

import type { NetworkRule, NetworkRuleCatalog } from '../types';
import { NetworkRuleConditionsTable } from './NetworkRuleConditionsTable';

export interface NetworkRuleRowHandlers {
  onToggleEnabled?: (rule: NetworkRule, enabled: boolean) => void;
  onEdit?: (rule: NetworkRule) => void;
  onDelete?: (rule: NetworkRule) => void;
  onAddCondition?: (rule: NetworkRule) => void;
  onEditCondition?: (rule: NetworkRule, index: number) => void;
  onDeleteCondition?: (rule: NetworkRule, index: number) => void;
}

export interface NetworkRuleExpandedPanelProps extends NetworkRuleRowHandlers {
  rule: NetworkRule;
  catalog?: NetworkRuleCatalog;
  readOnly?: boolean;
}

export function NetworkRuleExpandedPanel({
  rule,
  catalog,
  readOnly = false,
  onEdit,
  onDelete,
  onAddCondition,
  onEditCondition,
  onDeleteCondition,
}: Readonly<NetworkRuleExpandedPanelProps>) {
  const showActions =
    !readOnly &&
    (onEdit !== undefined ||
      onAddCondition !== undefined ||
      onDelete !== undefined);

  return (
    <Stack spacing={2} useFlexGap sx={{ px: 3, py: 2 }}>
      {showActions && (
        <Stack direction='row' spacing={2} alignItems='center'>
          {onEdit && (
            <Button
              variant='text'
              startIcon={<Edit />}
              onClick={() => onEdit(rule)}
            >
              Edit
            </Button>
          )}
          {onAddCondition && (
            <Button
              variant='text'
              startIcon={<Add />}
              onClick={() => onAddCondition(rule)}
            >
              Add Condition
            </Button>
          )}
          {onDelete && (
            <Button
              variant='text'
              color='error'
              startIcon={<Delete />}
              onClick={() => onDelete(rule)}
            >
              Delete
            </Button>
          )}
        </Stack>
      )}

      <Stack direction='row' spacing={4} alignItems='flex-start'>
        <Stack>
          <Typography variant='caption' color='text.secondary'>
            Rule UUID
          </Typography>
          <CopyableUuid
            uuid={rule.uuid}
            label='Rule UUID'
            variant='button'
            head={36}
            tail={0}
            mono
            iconSx={{ fontSize: 14, p: 0.125 }}
          />
        </Stack>
        {rule.notes && (
          <Stack sx={{ maxWidth: 480 }}>
            <Typography variant='caption' color='text.secondary'>
              Notes
            </Typography>
            <Typography variant='body2'>{rule.notes}</Typography>
          </Stack>
        )}
      </Stack>

      <Stack spacing={1}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
          }}
        >
          Conditions
        </Typography>
        <NetworkRuleConditionsTable
          rule={rule}
          catalog={catalog}
          readOnly={readOnly}
          onEditCondition={onEditCondition}
          onDeleteCondition={onDeleteCondition}
        />
      </Stack>
    </Stack>
  );
}
