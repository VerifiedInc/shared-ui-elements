import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode } from 'react';
import { Alert } from '../../components/Alert';
import { Button } from '@mui/material';

// Define the type of props this component receives
type PropsAndCustomArgs = React.ComponentProps<typeof Alert> & {
  text?: string;
  withAction?: boolean;
};

const renderActions = (withAction: boolean): ReactNode => {
  return withAction ? <Button>Action</Button> : undefined;
};

const meta: Meta<PropsAndCustomArgs> = {
  title: 'Components/Alert',
  component: Alert,
  render: ({ withAction = false, text = 'A default alert', ...args }) => {
    return (
      <Alert action={renderActions(withAction)} {...args}>
        {text}
      </Alert>
    );
  },
};

export default meta;
type Story = StoryObj<PropsAndCustomArgs>;

// A default alert
export const Default: Story = {};

// An alert with an action Button
export const WithButton: Story = {
  args: {
    withAction: true,
    severity: 'info',
    text: 'An alert with an action',
  },
};
