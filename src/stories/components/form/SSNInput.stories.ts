import type { StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import { SSNInput } from '../../../components/form/SSNInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/SSNInput',
  component: SSNInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    name: 'ssn',
    label: 'SSN',
    error: false,
    helperText: 'Helper text',
    shouldHaveCloseAdornment: false,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
