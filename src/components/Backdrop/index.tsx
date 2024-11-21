import {
  CircularProgress,
  Backdrop as MUIBackdrop,
  Stack,
  useTheme,
  type SxProps,
} from '@mui/material';

interface BackdropProps {
  open: boolean;
  sx?: SxProps;
  children?: React.ReactNode;
}

export const Backdrop = ({
  open,
  sx,
  children,
}: BackdropProps): React.JSX.Element => {
  const theme = useTheme();

  return (
    <MUIBackdrop
      sx={{
        color: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
        ...sx,
      }}
      open={open}
    >
      <Stack alignItems='center' spacing={3}>
        <CircularProgress color='inherit' />
        {children}
      </Stack>
    </MUIBackdrop>
  );
};
