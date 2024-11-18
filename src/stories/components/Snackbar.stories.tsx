import type { Meta, StoryObj } from '@storybook/react';

import { Portal, Stack } from '@mui/material';
import { fn } from '@storybook/test';
import { Button } from '../../components';
import { SnackbarProvider, useSnackbar } from '../../components/Snackbar';

const Snackbar = (): React.JSX.Element => {
  const { updateSnackbar, closeSnackbar } = useSnackbar();

  const renderButton = (
    message: string,
    severity: string,
  ): React.JSX.Element => (
    <Button
      onClick={() => {
        updateSnackbar(message, severity as any);
      }}
    >
      {message}
    </Button>
  );

  return (
    <Stack>
      <Portal>
        <SnackbarProvider />
      </Portal>
      {renderButton('Success', 'success')}
      {renderButton('Error', 'error')}
      {renderButton('Warning', 'warning')}
      {renderButton('Info', 'info')}
      <Button
        onClick={() => {
          closeSnackbar();
        }}
      >
        Clear all
      </Button>
    </Stack>
  );
};

const meta = {
  title: 'Components/Snackbar',

  component: Snackbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    name: 'otp',
    onChange: fn(),
    disabled: false,
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof Snackbar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
