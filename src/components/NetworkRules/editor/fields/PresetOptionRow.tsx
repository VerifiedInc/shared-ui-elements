import type { HTMLAttributes, Key, MouseEvent, ReactNode } from 'react';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { presetOptionLabel, type PresetOption } from './presetOptions';

export interface PresetManageHandlers {
  onEdit?: (value: string) => void;
  onDelete?: (value: string) => void;
}

export interface PresetOptionRowProps
  extends HTMLAttributes<HTMLLIElement>, PresetManageHandlers {
  option: PresetOption;
}

/**
 * The click must not reach the option, which would pick it. Mousedown is left alone on purpose:
 * the listbox prevents its default so the input keeps focus and the popup stays open.
 */
const stopClick = (event: MouseEvent): void => {
  event.stopPropagation();
};

/**
 * One dropdown row: the preset, and for a saved one the controls to edit or delete it. The
 * "Add … as a preset" row has nothing to manage, so it shows the label alone.
 */
export function PresetOptionRow({
  option,
  onEdit,
  onDelete,
  ...optionProps
}: Readonly<PresetOptionRowProps>) {
  const value = typeof option === 'string' ? option : undefined;
  const canManage =
    value !== undefined && (onEdit !== undefined || onDelete !== undefined);

  return (
    <li {...optionProps}>
      <Box
        component='span'
        sx={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}
      >
        {presetOptionLabel(option)}
      </Box>
      {canManage && (
        <Stack
          direction='row'
          spacing={0.5}
          sx={{ ml: 1, flexShrink: 0 }}
          onClick={stopClick}
        >
          {onEdit && (
            <Tooltip title='Edit Preset' placement='top'>
              <IconButton
                size='small'
                tabIndex={-1}
                aria-label='Edit Preset'
                onClick={() => {
                  onEdit(value);
                }}
              >
                <Edit fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title='Delete Preset' placement='top'>
              <IconButton
                size='small'
                color='error'
                tabIndex={-1}
                aria-label='Delete Preset'
                onClick={() => {
                  onDelete(value);
                }}
              >
                <Delete fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      )}
    </li>
  );
}

/** An Autocomplete `renderOption` for the preset inputs; `key` is lifted off the spread as React wants. */
export function renderPresetOption(handlers: PresetManageHandlers) {
  return (
    props: HTMLAttributes<HTMLLIElement> & { key?: Key },
    option: PresetOption,
  ): ReactNode => {
    const { key, ...optionProps } = props;
    return (
      <PresetOptionRow
        key={key}
        {...optionProps}
        option={option}
        onEdit={handlers.onEdit}
        onDelete={handlers.onDelete}
      />
    );
  };
}
