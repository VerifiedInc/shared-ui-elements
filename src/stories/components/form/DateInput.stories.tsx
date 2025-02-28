import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box, Stack } from '@mui/material';

import { DateInput } from '../../../components/form/DateInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/form/DateInput',
  component: DateInput,
  render: (args: any) => (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{ width: 500, height: 400 }}
    >
      <Box>
        <DateInput {...args} />
      </Box>
    </Stack>
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    value: { control: 'date' },
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    disabled: false,
    error: false,
    size: 'small',
    helperText: 'Helper text',
  },
  argTypes: {},
};

export const PickerOverflow: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    disabled: false,
    error: false,
    size: 'small',
    helperText: 'Helper text',
    overflowPicker: true,
  },
  argTypes: {},
};
