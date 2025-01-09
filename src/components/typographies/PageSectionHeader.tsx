import { type ReactElement, type ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface PageSectionHeaderProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  titleRightChildren?: ReactNode;
}

export function PageSectionHeader(
  props: Readonly<PageSectionHeaderProps>,
): ReactElement {
  return (
    <Box>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography variant='h4' fontSize={34} fontWeight='900'>
          {props.title}
        </Typography>
        {props.titleRightChildren}
      </Stack>
      {!!props.description && (
        <Typography variant='h5' fontSize={24} fontWeight='400'>
          {props.description}
        </Typography>
      )}
    </Box>
  );
}
