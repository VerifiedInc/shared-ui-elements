import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

export interface NetworkRuleDiscardDialogProps {
  open: boolean;
  onKeepEditing: () => void;
  onDiscard: () => void;
  title?: string;
  description?: string;
  keepEditingLabel?: string;
  discardLabel?: string;
}

export function NetworkRuleDiscardDialog({
  open,
  onKeepEditing,
  onDiscard,
  title = 'Discard Changes?',
  description = 'You have unsaved changes that will be lost.',
  keepEditingLabel = 'Keep editing',
  discardLabel = 'Discard',
}: Readonly<NetworkRuleDiscardDialogProps>) {
  return (
    <Dialog open={open} onClose={onKeepEditing} maxWidth='xs' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant='body2'>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='text' color='neutral' onClick={onKeepEditing}>
          {keepEditingLabel}
        </Button>
        <Button variant='contained' color='error' onClick={onDiscard}>
          {discardLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
