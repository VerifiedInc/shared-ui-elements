import type { Meta, StoryObj } from '@storybook/react';

import { DateInput } from '../../../components/form/DateInput';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    error: false,
    helperText: 'Helper text',
    allowFutureDates: true,
  },
  argTypes: {
    allowFutureDates: {
      control: 'boolean',
      description:
        'Allow future dates. If false and the limit is reached, onChange will return an empty string.',
    },
  },
};
