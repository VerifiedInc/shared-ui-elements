import { useCallback, useEffect, useId, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  type DialogProps,
} from '@mui/material';

import { NetworkRuleDiscardDialog } from '../dialog/NetworkRuleDiscardDialog';
import { useHeldWhileClosed } from '../hooks/useHeldWhileClosed';
import {
  NetworkRuleEditorForm,
  type NetworkRuleEditorFormProps,
} from './NetworkRuleEditorForm';

export interface NetworkRuleEditorDialogProps extends Omit<
  NetworkRuleEditorFormProps,
  'id' | 'hideActions' | 'onCancel' | 'onDirtyChange'
> {
  open: boolean;
  /** With unsaved changes the user is asked to confirm first. */
  onClose: () => void;
  title?: string;
  maxWidth?: DialogProps['maxWidth'];
}

function defaultTitle(rule: NetworkRuleEditorFormProps['rule']): string {
  return rule?.uuid ? 'Edit Network Rule' : 'Create Network Rule';
}

export function NetworkRuleEditorDialog({
  open,
  onClose,
  title,
  maxWidth = 'md',
  rule: ruleProp,
  focusConditionIndex: focusConditionIndexProp,
  isSubmitting = false,
  disabled = false,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  ...formProps
}: Readonly<NetworkRuleEditorDialogProps>) {
  const formId = useId();
  const [isDirty, setIsDirty] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  useEffect(() => {
    if (open) {
      setIsDirty(false);
      setConfirmDiscard(false);
    }
  }, [open]);

  const requestClose = useCallback(() => {
    if (isSubmitting) return;
    if (isDirty) {
      setConfirmDiscard(true);
      return;
    }
    onClose();
  }, [isSubmitting, isDirty, onClose]);

  const rule = useHeldWhileClosed(open, ruleProp);
  const focusConditionIndex = useHeldWhileClosed(open, focusConditionIndexProp);
  const resolvedTitle = useHeldWhileClosed(
    open,
    title ?? defaultTitle(ruleProp),
  );

  return (
    <Dialog
      open={open}
      onClose={requestClose}
      fullWidth
      maxWidth={maxWidth}
      aria-labelledby={`${formId}-title`}
    >
      <DialogTitle id={`${formId}-title`}>{resolvedTitle}</DialogTitle>
      <DialogContent>
        <NetworkRuleEditorForm
          {...formProps}
          rule={rule}
          focusConditionIndex={focusConditionIndex}
          id={formId}
          hideActions
          isSubmitting={isSubmitting}
          disabled={disabled}
          onDirtyChange={setIsDirty}
        />
      </DialogContent>
      <DialogActions>
        <Button color='neutral' onClick={requestClose} disabled={isSubmitting}>
          {cancelLabel}
        </Button>
        <Button
          type='submit'
          form={formId}
          variant='contained'
          disabled={disabled || isSubmitting}
        >
          {submitLabel}
        </Button>
      </DialogActions>
      <NetworkRuleDiscardDialog
        open={confirmDiscard}
        onKeepEditing={() => {
          setConfirmDiscard(false);
        }}
        onDiscard={() => {
          setConfirmDiscard(false);
          onClose();
        }}
      />
    </Dialog>
  );
}
