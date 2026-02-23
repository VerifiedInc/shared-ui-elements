import { ComponentType } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';

import { FormContextValue } from '../core/form.context';

import { useOneClickForm } from './form.context';
import { ReadonlyFields } from './fields/readonly/field';
import { EditFields } from './fields/input/field';

type OneClickFormContentProps = {
  FooterComponent?: ComponentType<{ form: FormContextValue }>;
};

function FormButtons() {
  const context = useOneClickForm();
  const canEdit =
    !context.options.features.editMode?.hide &&
    !context.formContext.state.form?.isDisabled;

  const buttonSx = {
    position: 'absolute',
    zIndex: 1,
  } as const;

  return (
    <>
      {canEdit && !context.editMode && (
        <Button
          aria-controls='credentials-region'
          variant='text'
          size='small'
          color='neutral'
          startIcon={<Edit aria-hidden='true' />}
          sx={{
            ...buttonSx,
            top: 0,
            right: 0,
            transform: 'translateY(calc(-100% - 16px))',
          }}
          onClick={() => {
            context.setEditMode(true);
            context.setUserInitiatedEdit(true);
          }}
        >
          Edit
        </Button>
      )}
      {context.editMode && context.userInitiatedEdit && (
        <Button
          aria-controls='credentials-region'
          variant='text'
          size='small'
          color='neutral'
          startIcon={<ArrowBack aria-hidden='true' />}
          sx={{
            ...buttonSx,
            top: 0,
            left: 0,
            transform: 'translateY(calc(-100% - 16px))',
          }}
          onClick={() => {
            context.formContext.resetForm();
            context.setEditMode(false);
            context.setUserInitiatedEdit(false);
          }}
        >
          Back
        </Button>
      )}
    </>
  );
}

function RenderReadonlyMode() {
  return <ReadonlyFields />;
}

function RenderEditMode() {
  return <EditFields />;
}

export function OneClickFormContent({
  FooterComponent,
}: OneClickFormContentProps) {
  const context = useOneClickForm();

  return (
    <Stack
      data-testid='one-click-form-wrapper'
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
        data-testid='one-click-form-content'
        position='relative'
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ flex: 1, width: '100%' }}
      >
        <FormButtons />
        <>{context.editMode ? <RenderEditMode /> : <RenderReadonlyMode />}</>
      </Box>
      {FooterComponent && <FooterComponent form={context.formContext} />}
    </Stack>
  );
}
