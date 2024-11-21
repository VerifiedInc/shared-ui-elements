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

export function Backdrop({
  open,
  sx,
  children,
}: BackdropProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <MUIBackdrop
      sx={{
        color: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Stack alignItems='center' spacing={3}>
        <CircularProgress color='inherit' />
      </Stack>
    </MUIBackdrop>
  );
}
