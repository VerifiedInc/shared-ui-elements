import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useHeldWhileClosed } from '../hooks/useHeldWhileClosed';

export interface NetworkRulePresetDeleteDialogProps {
  open: boolean;
  /** The preset about to go. */
  value?: string;
  onConfirm: (value: string) => void | Promise<void>;
  onClose: () => void;
  isDeleting?: boolean;
  /** Why the last attempt failed, e.g. the server refused the list. */
  error?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/** Removes one preset from a field's suggestions. Rules that carry the text keep it. */
export function NetworkRulePresetDeleteDialog({
  open,
  value: valueProp,
  onConfirm,
  onClose,
  isDeleting = false,
  error,
  title = 'Delete Preset?',
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}: Readonly<NetworkRulePresetDeleteDialogProps>) {
  const value = useHeldWhileClosed(open, valueProp);
  const resolvedDescription =
    description ??
    (value === undefined
      ? undefined
      : `"${value}" will no longer be suggested. Rules that already use it are not changed.`);

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{resolvedDescription}</DialogContentText>
        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='neutral' onClick={onClose} disabled={isDeleting}>
          {cancelLabel}
        </Button>
        <Button
          color='error'
          variant='contained'
          disabled={isDeleting || value === undefined}
          startIcon={
            isDeleting ? (
              <CircularProgress size={16} color='inherit' />
            ) : undefined
          }
          onClick={() => {
            if (value === undefined) return;
            void onConfirm(value);
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
