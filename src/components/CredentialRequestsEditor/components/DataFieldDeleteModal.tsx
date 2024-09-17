import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  type SxProps,
  Typography,
} from '@mui/material';

import { Button } from '../../Button';

const buttonStyle: SxProps = {
  minHeight: 20,
  mt: 2,
  py: 1,
  px: 1.25,
  fontWeight: '800',
  fontSize: '13px',
};

interface DataFieldDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DataFieldDeleteModal({
  open,
  onClose,
  onConfirm,
}: DataFieldDeleteModalProps): React.JSX.Element {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Data Field?</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this data field?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button
          variant='text'
          color='neutral'
          size='small'
          onClick={onClose}
          sx={buttonStyle}
          data-testid='custom-demo-dialog-data-field-delete-cancel-button'
        >
          Don't Delete
        </Button>
        <Button
          variant='contained'
          color='error'
          size='small'
          onClick={onConfirm}
          sx={buttonStyle}
          data-testid='custom-demo-dialog-data-field-delete-confirm-button'
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
