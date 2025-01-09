import { type ReactElement, type ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  titleRightChildren?: ReactNode;
}

export function PageHeader(props: Readonly<PageHeaderProps>): ReactElement {
  return (
    <Box sx={{ mt: 6.25 }}>
      <Stack
        direction='row'
        alignItems='center'
        spacing={1}
        sx={{
          // This is a hack to fix the button alignment, ButtonBase MUI style overrides the margin (shouldn't be like that).
          '& button': {
            marginTop: '4px!important',
          },
        }}
      >
        <Typography variant='h3' fontSize={50} fontWeight='800'>
          {props.title}
        </Typography>
        {props.titleRightChildren}
      </Stack>
      {!!props.description && (
        <Typography
          variant='h4'
          fontSize={30}
          fontWeight='700'
          color='text.disabled'
        >
          {props.description}
        </Typography>
      )}
    </Box>
  );
}
