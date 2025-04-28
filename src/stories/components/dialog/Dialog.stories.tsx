import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import Dialog from '../../../components/dialog/Dialog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    open: {
      control: 'boolean',
      description: 'If true, the dialog is open',
    },
    maxWidth: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      control: { type: 'select' },
      description: 'Determine the max-width of the dialog',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the dialog stretches to maximum width',
    },
  },
  // Use `fn` to spy on the onClose arg
  args: { onClose: fn() },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic dialog with title, content and actions
export const Basic: Story = {
  args: {
    open: true,
    'aria-labelledby': 'dialog-title',
    'aria-describedby': 'dialog-description',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle id='dialog-title'>Dialog Title</DialogTitle>
      <DialogContent>
        <Typography id='dialog-description'>
          This is a simple dialog with basic content. Dialogs inform users about
          a task and can contain critical information, require decisions, or
          involve multiple tasks.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={args.onClose as () => void}>Cancel</Button>
        <Button variant='contained' onClick={args.onClose as () => void}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  ),
};

// Interactive Dialog Story
export const Interactive: Story = {
  args: {
    open: false,
  },
  render: function Render() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button variant='contained' onClick={handleOpen}>
          Open Dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='interactive-dialog-title'
          aria-describedby='interactive-dialog-description'
        >
          <DialogTitle id='interactive-dialog-title'>
            <Typography variant='h1'>Important Information</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography id='interactive-dialog-description'>
              This dialog demonstrates the custom styling applied to typography
              elements. Notice how the title is centered with a larger font size
              and bold weight.
            </Typography>
            <Typography variant='h2' sx={{ mt: 2 }}>
              Secondary Heading
            </Typography>
            <Typography>
              The secondary heading is also centered and bold, following the
              design system.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleClose}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

// Dialog with long content to demonstrate scrolling
export const LongContent: Story = {
  args: {
    open: true,
    'aria-labelledby': 'long-dialog-title',
    'aria-describedby': 'long-dialog-description',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle id='long-dialog-title'>Dialog with Long Content</DialogTitle>
      <DialogContent>
        <Typography id='long-dialog-description' paragraph>
          This dialog contains a lot of text to demonstrate how the dialog
          handles long content with scrolling.
        </Typography>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Typography key={index} paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in
              nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
            </Typography>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={args.onClose as () => void}>Close</Button>
      </DialogActions>
    </Dialog>
  ),
};

// Dialog with custom width
export const CustomWidth: Story = {
  args: {
    open: true,
    maxWidth: false,
    'aria-labelledby': 'custom-width-dialog-title',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle id='custom-width-dialog-title'>
        Custom Width Dialog
      </DialogTitle>
      <DialogContent sx={{ minWidth: '600px' }}>
        <Typography>
          This dialog has a custom width set to 600px using the sx prop on
          DialogContent. The Dialog component itself has maxWidth set to false
          to allow for custom sizing.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={args.onClose as () => void}>Close</Button>
      </DialogActions>
    </Dialog>
  ),
};
