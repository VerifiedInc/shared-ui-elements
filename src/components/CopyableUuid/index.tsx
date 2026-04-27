import React from 'react';
import { ContentCopy } from '@mui/icons-material';
import {
  IconButton,
  Stack,
  Typography,
  type SxProps,
  type TypographyProps,
} from '@mui/material';

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useSnackbar } from '../Snackbar';

export type CopyableUuidVariant = 'text' | 'button';

export interface CopyableUuidProps {
  uuid: string | null | undefined;
  /** Snackbar label. Defaults to "UUID". */
  label?: string;
  /** Number of leading characters to keep when truncating. Defaults to 4. */
  head?: number;
  /**
   * Number of trailing characters to keep when truncating. Defaults to 4.
   * When 0, renders a head-only ellipsis ("abcd...").
   */
  tail?: number;
  /**
   * `text` — clickable monospace text that copies on click (inline legend style).
   * `button` — text followed by a hover-revealed copy icon (table cell style).
   * Defaults to `button`.
   */
  variant?: CopyableUuidVariant;
  /** Fallback rendered when `uuid` is nullish/empty. Defaults to `—`. */
  placeholder?: React.ReactNode;
  /** Whether to use monospace typography. Defaults to true. */
  mono?: boolean;
  typographyProps?: Omit<TypographyProps, 'children'>;
  /** Styles applied to the copy icon button (button variant only). */
  iconSx?: SxProps;
  sx?: SxProps;
}

function truncate(uuid: string, head: number, tail: number): string {
  if (tail === 0) {
    return uuid.length <= head ? uuid : `${uuid.slice(0, head)}...`;
  }

  if (uuid.length <= head + tail + 1) {
    return uuid;
  }

  return `${uuid.slice(0, head)}…${uuid.slice(-tail)}`;
}

export function CopyableUuid({
  uuid,
  label = 'UUID',
  head = 4,
  tail = 4,
  variant = 'button',
  placeholder = '—',
  mono = true,
  typographyProps,
  iconSx,
  sx,
}: Readonly<CopyableUuidProps>): React.ReactElement {
  const { copy } = useCopyToClipboard({ type: 'text/plain' });
  const { enqueueSnackbar } = useSnackbar();

  const { sx: typographySx, ...restTypographyProps } = typographyProps ?? {};
  const monoSx = mono ? { fontFamily: 'monospace' } : {};

  if (!uuid) {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        {...restTypographyProps}
        sx={[monoSx, typographySx as any, sx].filter(Boolean)}
      >
        {placeholder}
      </Typography>
    );
  }

  const truncated = truncate(uuid, head, tail);

  const handleCopy = async (
    event: React.MouseEvent<HTMLElement>,
  ): Promise<void> => {
    event.stopPropagation();
    try {
      await copy(uuid);
      enqueueSnackbar(`${label} copied to clipboard`, 'success');
    } catch {
      /* swallow — existing behavior */
    }
  };

  if (variant === 'text') {
    const textSx = {
      // Reset native <button> styles so it reads as plain text.
      background: 'transparent',
      border: 0,
      padding: 0,
      margin: 0,
      font: 'inherit',
      color: 'inherit',
      textAlign: 'inherit',
      cursor: 'pointer',
      '&:hover': { textDecoration: 'underline' },
      '&:focus-visible': {
        outline: '2px solid currentColor',
        outlineOffset: 2,
      },
    };
    return (
      <Typography
        component='button'
        type='button'
        variant='body2'
        aria-label={`Copy ${label}`}
        onClick={handleCopy}
        {...restTypographyProps}
        sx={[monoSx, textSx, typographySx as any, sx].filter(Boolean)}
      >
        {truncated}
      </Typography>
    );
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        '& .copyable-uuid__btn': { opacity: 0 },
        '&:hover .copyable-uuid__btn': { opacity: 1 },
        ...sx,
      }}
    >
      <Typography
        variant='body2'
        color='text.secondary'
        noWrap
        {...restTypographyProps}
        sx={[monoSx, typographySx as any].filter(Boolean)}
      >
        {truncated}
      </Typography>
      <IconButton
        className='copyable-uuid__btn'
        size='small'
        aria-label={`Copy ${label}`}
        onClick={handleCopy}
        sx={[{ p: 0.25, ml: 0.5, fontSize: 'inherit' }, iconSx as any].filter(
          Boolean,
        )}
      >
        <ContentCopy fontSize='inherit' />
      </IconButton>
    </Stack>
  );
}
