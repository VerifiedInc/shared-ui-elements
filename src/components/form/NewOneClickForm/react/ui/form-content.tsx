import { ComponentType } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { FormContextValue } from '../core/form.context';

import { useOneClickForm } from './form.context';
import { ReadonlyFields } from './fields/readonly/field';
import { EditFields } from './fields/input/field';

type OneClickFormContentProps = {
  FooterComponent?: ComponentType<{ form: FormContextValue }>;
};

function RenderReadonlyMode() {
  const context = useOneClickForm();
  return (
    <>
      <ReadonlyFields />
      <Button
        aria-controls='credentials-region'
        variant='text'
        size='small'
        color='neutral'
        startIcon={<Edit aria-hidden='true' />}
        sx={{
          position: 'absolute',
          top: 4,
          right: 0,
          zIndex: 1,
        }}
        onClick={() => {
          context.setEditMode(true);
        }}
      >
        Edit
      </Button>
    </>
  );
}

function RenderEditMode() {
  return <EditFields />;
}

export function OneClickFormContent({
  FooterComponent,
}: OneClickFormContentProps) {
  const context = useOneClickForm();

  console.log(context.formContext.state.form.fields);

  return (
    <Stack
      component='form'
      id='credentials-region'
      role='region'
      aria-label={
        context.editMode ? 'Edit your information' : 'Review your information'
      }
      onSubmit={(e) => {
        e.preventDefault();
        void context.formContext.submitForm();
      }}
      spacing={2}
      sx={{
        display: 'flex',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        // Traverse the card image elements to apply flex to them.
        '& > div, & > div > div': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        position='relative'
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ flex: 1, width: '100%' }}
      >
        {context.editMode ? <RenderEditMode /> : <RenderReadonlyMode />}
      </Box>
      {FooterComponent && <FooterComponent form={context.formContext} />}
    </Stack>
  );
}
