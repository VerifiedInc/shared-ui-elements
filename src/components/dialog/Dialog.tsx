import {
  Dialog as MuiDialog,
  type DialogProps,
  type SxProps,
} from '@mui/material';

const dialogStyle: SxProps = {
  '& .MuiDialog-container > .MuiPaper-root': {
    maxWidth: 'fit-content',
    width: 'auto',
    borderRadius: '6px!important',
  },
  '& .MuiTypography-root': {
    textAlign: 'center',
  },
  '& .MuiTypography-h1': {
    fontSize: '34px',
    fontWeight: '800!important',
  },
  '& .MuiTypography-h2': {
    fontWeight: '800!important',
  },
};

const CustomDialog = (props: DialogProps) => {
  return (
    <MuiDialog sx={dialogStyle} {...props}>
      {props.children}
    </MuiDialog>
  );
};

export default CustomDialog;
