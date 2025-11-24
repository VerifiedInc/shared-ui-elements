import type { Meta, StoryObj } from '@storybook/react';

import { NPIInput } from '../../../components/form/NPIInput';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/form/NPIInput',
  component: NPIInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    shouldHaveClearButton: true,
  },
} satisfies Meta<typeof NPIInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    name: 'npi',
    label: 'NPI',
    onChange: fn(),
    onValidNPI: fn(),
    error: false,
    helperText: 'Enter your 10-digit National Provider Identifier',
    onBlur: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithValue: Story = {
  args: {
    name: 'npi',
    label: 'NPI',
    onChange: fn(),
    onValidNPI: fn(),
    error: false,
    helperText: 'Enter your 10-digit National Provider Identifier',
    onBlur: fn(),
    value: '1234567890',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithError: Story = {
  args: {
    name: 'npi',
    label: 'NPI',
    onChange: fn(),
    onValidNPI: fn(),
    error: true,
    helperText: 'Invalid NPI - must be 10 digits',
    onBlur: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithoutClearButton: Story = {
  args: {
    name: 'npi',
    label: 'NPI',
    onChange: fn(),
    onValidNPI: fn(),
    error: false,
    helperText: 'Enter your 10-digit National Provider Identifier',
    shouldHaveClearButton: false,
    onBlur: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Disabled: Story = {
  args: {
    name: 'npi',
    label: 'NPI',
    onChange: fn(),
    onValidNPI: fn(),
    error: false,
    helperText: 'Enter your 10-digit National Provider Identifier',
    onBlur: fn(),
    disabled: true,
    value: '1234567890',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AutoFocus: Story = {
  args: {
    name: 'npi',
    label: 'NPI',
    onChange: fn(),
    onValidNPI: fn(),
    error: false,
    helperText: 'Enter your 10-digit National Provider Identifier',
    onBlur: fn(),
    autoFocus: true,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CustomPlaceholder: Story = {
  args: {
    name: 'npi',
    label: 'Provider NPI',
    onChange: fn(),
    onValidNPI: fn(),
    error: false,
    helperText: 'Healthcare provider identification number',
    onBlur: fn(),
    placeholder: 'Enter NPI',
    lazy: false,
  },
};
