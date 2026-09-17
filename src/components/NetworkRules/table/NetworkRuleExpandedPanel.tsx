import { Button, Stack, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { CopyableUuid } from '../../CopyableUuid';
import { SectionLabel } from '../../UI/SectionLabel';

import type { NetworkRule, NetworkRuleCatalog } from '../types';
import { NetworkRuleConditionsTable } from './NetworkRuleConditionsTable';
import { NetworkRuleMetadataTable } from './NetworkRuleMetadataTable';

export interface NetworkRuleRowHandlers {
  onToggleEnabled?: (rule: NetworkRule, enabled: boolean) => void;
  onEdit?: (rule: NetworkRule) => void;
  onDelete?: (rule: NetworkRule) => void;
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
}: Readonly<NetworkRuleExpandedPanelProps>) {
  const showActions =
    !readOnly && (onEdit !== undefined || onDelete !== undefined);

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
        <SectionLabel>Conditions</SectionLabel>
        <NetworkRuleConditionsTable rule={rule} catalog={catalog} />
      </Stack>

      <Stack spacing={1}>
        <SectionLabel>Metadata</SectionLabel>
        <NetworkRuleMetadataTable rule={rule} />
      </Stack>
    </Stack>
  );
}
