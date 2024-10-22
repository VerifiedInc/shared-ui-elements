import type { Meta, StoryObj } from '@storybook/react';

import { SelectInput } from '../../../components/form/SelectInput';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/SelectInput',
  component: SelectInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    InputProps: {
      name: 'Select Input',
      label: 'Select Input',
      error: false,
      helperText: 'Helper text',
      sx: { width: '200px' },
    },
    onChange: fn(),
    onClear: fn(),
    options: [
      { label: 'Option 1', id: '1' },
      { label: 'Option 2', id: '2' },
      { label: 'Option 3', id: '3' },
    ],
    defaultOption: { label: 'Option 1', id: '1' },
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
