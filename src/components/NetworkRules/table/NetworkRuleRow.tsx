import type { ReactNode } from 'react';
import {
  Box,
  Chip,
  Collapse,
  Stack,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { flexRender, type Cell } from '@tanstack/react-table';

import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { useDataTableContext } from '../../DataTable/DataTable.context';
import type { DataTableRowContext } from '../../DataTable/DataTable.types';
import {
  EXPAND_COLUMN_ID,
  EXPAND_TRANSITION_MS,
  EXPANDED_ROW_PANEL_SX,
  ExpandRowToggle,
} from '../../DataTable/DataTableExpandRow';

import { NetworkStatusChip } from '../shared/NetworkStatusChip';
import type { NetworkRule, NetworkRuleCatalog } from '../types';
import { NETWORK_RULES_COLUMN_IDS } from './columns';
import {
  NetworkRuleExpandedPanel,
  type NetworkRuleRowHandlers,
} from './NetworkRuleExpandedPanel';

export interface NetworkRuleRowProps
  extends DataTableRowContext<NetworkRule>, NetworkRuleRowHandlers {
  catalog?: NetworkRuleCatalog;
  readOnly?: boolean;
}

/** A rule row plus its collapsible detail row, for `DataTable`'s `renderRow`. */
export function NetworkRuleRow({
  row,
  rowProps,
  getCellProps,
  catalog,
  readOnly = false,
  onToggleEnabled,
  ...handlers
}: Readonly<NetworkRuleRowProps>) {
  const open = row.getIsExpanded();
  const rule = row.original;
  const enabled = rule.enabled ?? true;
  const conditionCount = rule.conditions.length;
  const visibleCells = row.getVisibleCells();
  // The detail row spans the whole (possibly scrolled) table; the panel sticks
  // to the visible left edge and is exactly as wide as the visible area. The
  // observer re-renders on resize; clientWidth excludes the vertical scrollbar.
  const { scrollContainerRef } = useDataTableContext();
  useResizeObserver(scrollContainerRef);
  const clientWidth = scrollContainerRef.current?.clientWidth;
  const panelWidth =
    clientWidth !== undefined && clientWidth > 0 ? clientWidth : '100%';

  const renderCell = (cell: Cell<NetworkRule, unknown>): ReactNode => {
    switch (cell.column.id) {
      case EXPAND_COLUMN_ID:
        return <ExpandRowToggle row={row} />;
      case NETWORK_RULES_COLUMN_IDS.enabled:
        return (
          <Tooltip title={enabled ? 'Enabled' : 'Disabled'} placement='top'>
            <span>
              <Switch
                size='small'
                checked={enabled}
                disabled={readOnly || onToggleEnabled === undefined}
                onChange={(_event, checked) => onToggleEnabled?.(rule, checked)}
                inputProps={{
                  'aria-label': `${enabled ? 'Disable' : 'Enable'} rule ${rule.name}`,
                }}
              />
            </span>
          </Tooltip>
        );
      case NETWORK_RULES_COLUMN_IDS.name:
        return (
          <Stack direction='row' spacing={1} alignItems='center' minWidth={0}>
            <Box
              component='span'
              title={rule.name}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {rule.name}
            </Box>
            <Chip
              size='small'
              label={`${conditionCount} ${conditionCount === 1 ? 'condition' : 'conditions'}`}
            />
          </Stack>
        );
      case NETWORK_RULES_COLUMN_IDS.status:
        return <NetworkStatusChip status={rule.status} />;
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };

  return (
    <>
      <TableRow
        {...rowProps}
        hover
        sx={{ '& > td': { borderBottom: 'unset' } }}
      >
        {visibleCells.map((cell) => (
          <TableCell key={cell.id} {...getCellProps(cell)}>
            {renderCell(cell)}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0, px: 0 }} colSpan={visibleCells.length}>
          <Collapse in={open} timeout={EXPAND_TRANSITION_MS} unmountOnExit>
            <Box sx={{ ...EXPANDED_ROW_PANEL_SX, width: panelWidth }}>
              <NetworkRuleExpandedPanel
                rule={rule}
                catalog={catalog}
                readOnly={readOnly}
                {...handlers}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
