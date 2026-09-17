import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import type { NetworkRule } from '../types';
import {
  formatMetadataValue,
  metadataTypeLabel,
  typeOfMetadataValue,
} from '../utils/metadata';

export interface NetworkRuleMetadataTableProps {
  rule: NetworkRule;
}

/**
 * The rule's metadata as the editor lays it out: key, type, value. Read-only; a pair is changed
 * through the rule editor, there being no per-entry endpoint to hang row actions on.
 */
export function NetworkRuleMetadataTable({
  rule,
}: Readonly<NetworkRuleMetadataTableProps>) {
  const entries = Object.entries(rule.metadata ?? {});

  if (entries.length === 0) {
    return (
      <Typography variant='body2' color='text.secondary'>
        No metadata
      </Typography>
    );
  }

  return (
    <Table aria-label={`Metadata for ${rule.name}`}>
      <TableHead>
        <TableRow>
          <TableCell>Key</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map(([key, value]) => (
          <TableRow key={key}>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
              <Chip label={key} />
            </TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
              {metadataTypeLabel(typeOfMetadataValue(value))}
            </TableCell>
            <TableCell sx={{ width: '100%', overflowWrap: 'anywhere' }}>
              {formatMetadataValue(value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
