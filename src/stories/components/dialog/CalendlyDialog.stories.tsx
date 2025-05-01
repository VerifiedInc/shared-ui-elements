import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useRef } from 'react';
import { Button } from '@mui/material';

import {
  CalendlyDialog,
  CalendlyDialogRef,
} from '../../../components/dialog/CalendlyDialog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/dialog/CalendlyDialog',
  component: CalendlyDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    calendlyUrl: {
      control: 'text',
      description: 'The Calendly URL to embed in the dialog',
    },
  },
} satisfies Meta<typeof CalendlyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with default props
export const Basic: Story = {
  args: {
    calendlyUrl:
      'https://calendly.com/verified-inc/intro-with-verified?primary_color=0dbc3d',
  },
  render: function Render(args) {
    const calendlyDialogRef = useRef<CalendlyDialogRef>(null);

    return (
      <>
        <Button
          variant='contained'
          onClick={() => calendlyDialogRef.current?.show()}
        >
          Open Calendly
        </Button>
        <CalendlyDialog
          ref={calendlyDialogRef}
          calendlyUrl={args.calendlyUrl}
        />
      </>
    );
  },
};

// Example with different Calendly URL
export const CustomUrl: Story = {
  args: {
    calendlyUrl: 'https://calendly.com/verified-inc/30min?primary_color=0000ff',
  },
  render: function Render(args) {
    const calendlyDialogRef = useRef<CalendlyDialogRef>(null);

    return (
      <>
        <Button
          variant='contained'
          onClick={() => calendlyDialogRef.current?.show()}
        >
          Schedule 30-Minute Meeting
        </Button>
        <CalendlyDialog
          ref={calendlyDialogRef}
          calendlyUrl={args.calendlyUrl}
        />
      </>
    );
  },
};

// Example demonstrating all ref methods
export const RefMethods: Story = {
  args: {
    calendlyUrl:
      'https://calendly.com/verified-inc/intro-with-verified?primary_color=0dbc3d',
  },
  render: function Render(args) {
    const calendlyDialogRef = useRef<CalendlyDialogRef>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => calendlyDialogRef.current?.show()}
        >
          Show Dialog
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => calendlyDialogRef.current?.hide()}
        >
          Hide Dialog
        </Button>
        <Button
          variant='contained'
          color='info'
          onClick={() => calendlyDialogRef.current?.toggle()}
        >
          Toggle Dialog
        </Button>
        <Button
          variant='outlined'
          onClick={() =>
            alert(
              `Dialog is ${calendlyDialogRef.current?.isOpen ? 'open' : 'closed'}`,
            )
          }
        >
          Check Dialog State
        </Button>
        <CalendlyDialog
          ref={calendlyDialogRef}
          calendlyUrl={args.calendlyUrl}
        />
      </div>
    );
  },
};
