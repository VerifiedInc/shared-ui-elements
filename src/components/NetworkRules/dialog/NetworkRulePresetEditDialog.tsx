import { useEffect, useState, type FormEvent } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';

import { useHeldWhileClosed } from '../hooks/useHeldWhileClosed';
import { validatePresetValue } from '../utils/presets';

export interface NetworkRulePresetEditOptions {
  /** The user ticked "Edit existing rules that use this preset". */
  updateRules: boolean;
}

export interface NetworkRulePresetEditDialogProps {
  open: boolean;
  /** The preset as it is stored. */
  value?: string;
  /** Every preset of the same field, for the uniqueness check; `value` itself is allowed. */
  presets?: readonly string[];
  maxLength?: number;
  /**
   * Offer to change the rules that carry the preset as well. Off, the dialog says instead that
   * rules are left alone.
   */
  canUpdateRules?: boolean;
  /** Called with the trimmed new text. Not called when the text did not change. */
  onSave: (
    value: string,
    options: NetworkRulePresetEditOptions,
  ) => void | Promise<void>;
  onClose: () => void;
  isSaving?: boolean;
  /** Why the last save failed, e.g. the server refused the list. */
  error?: string;
  title?: string;
  /** Shown when `canUpdateRules` is off. */
  description?: string;
  updateRulesLabel?: string;
  saveLabel?: string;
  cancelLabel?: string;
}

/**
 * Renames one preset. Presets are suggestions, so rules that carry the old text keep it unless
 * the user asks for them to follow.
 */
export function NetworkRulePresetEditDialog({
  open,
  value: valueProp,
  presets = [],
  maxLength,
  canUpdateRules = false,
  onSave,
  onClose,
  isSaving = false,
  error,
  title = 'Edit Preset',
  description = 'Rules that already use this preset are not changed.',
  updateRulesLabel = 'Edit existing rules that use this preset',
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
}: Readonly<NetworkRulePresetEditDialogProps>) {
  const value = useHeldWhileClosed(open, valueProp ?? '');
  const [draft, setDraft] = useState(value);
  const [touched, setTouched] = useState(false);
  const [updateRules, setUpdateRules] = useState(false);

  // A fresh draft each time the dialog opens on a preset; the rules choice starts off, on purpose.
  useEffect(() => {
    if (open) {
      setDraft(valueProp ?? '');
      setTouched(false);
      setUpdateRules(false);
    }
  }, [open, valueProp]);

  const validationError = validatePresetValue(draft, {
    presets,
    current: value,
    maxLength,
  });
  const unchanged = draft.trim() === value;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    // The dialog is portaled, but React still bubbles the submit to a form around it.
    event.preventDefault();
    event.stopPropagation();
    setTouched(true);
    if (isSaving || validationError) return;
    if (unchanged) {
      onClose();
      return;
    }
    void onSave(draft.trim(), { updateRules: canUpdateRules && updateRules });
  };

  return (
    <Dialog
      open={open}
      onClose={isSaving ? undefined : onClose}
      maxWidth='xs'
      fullWidth
    >
      <form noValidate onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            required
            label='Preset'
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
            }}
            onBlur={() => {
              setTouched(true);
            }}
            disabled={isSaving}
            error={touched && validationError !== undefined}
            helperText={touched ? validationError : undefined}
            inputProps={{ maxLength }}
            sx={{ mt: 1 }}
          />
          {canUpdateRules ? (
            <FormControlLabel
              sx={{ mt: 1 }}
              label={updateRulesLabel}
              control={
                <Checkbox
                  checked={updateRules}
                  onChange={(_event, checked) => {
                    setUpdateRules(checked);
                  }}
                  disabled={isSaving}
                />
              }
            />
          ) : (
            <DialogContentText sx={{ mt: 2 }}>{description}</DialogContentText>
          )}
          {error && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button color='neutral' onClick={onClose} disabled={isSaving}>
            {cancelLabel}
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={isSaving || (touched && validationError !== undefined)}
            startIcon={
              isSaving ? (
                <CircularProgress size={16} color='inherit' />
              ) : undefined
            }
          >
            {saveLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
