import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '../../components/TextField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      description: 'The variant to use.',
      type: { name: 'enum', value: ['outlined', 'standard', 'filled'] },
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    size: {
      description: 'The size of the component.',
      type: { name: 'enum', value: ['small', 'medium'] },
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
  },
  args: {
    size: 'medium',
    variant: 'standard',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Outlined: Story = {
  args: {
    label: 'Label',
    variant: 'outlined',
    placeholder: 'Placeholder',
  },
};

export const OutlinedFixedLabel: Story = {
  args: {
    label: 'Label',
    variant: 'outlined',
    placeholder: 'Placeholder',
    InputLabelProps: {
      shrink: true,
    },
  },
};
