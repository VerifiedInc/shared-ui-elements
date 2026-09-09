import type { Meta, StoryObj } from '@storybook/react';

import { PhoneInput } from '../../../components/form/PhoneInput';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/form/PhoneInput',
  component: PhoneInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Docgen cannot see through `Readonly<PhoneInputProps>`, so it documents these two as "other" (object control).
  argTypes: {
    pretty: { control: 'boolean', table: { type: { summary: 'boolean' } } },
    loading: { control: 'boolean', table: { type: { summary: 'boolean' } } },
  },
  args: {
    shouldHaveClearButton: true,
    pretty: false,
    loading: false,
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Helper text',
    onBlur: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Pretty: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Helper text',
    onBlur: fn(),
    pretty: true,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PrettyLoading: Story = {
  args: {
    name: 'date',
    label: 'Label',
    initialValue: '12065550123',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Looking up this number…',
    onBlur: fn(),
    pretty: true,
    loading: true,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const USOnlyPhone: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Helper text',
    shouldHaveSelectCountryButton: false,
    onBlur: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithoutClearButton: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Helper text',
    shouldHaveSelectCountryButton: false,
    shouldHaveClearButton: false,
    onBlur: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Autocomplete: Story = {
  args: {
    name: 'date',
    label: 'Label',
    onChange: fn(),
    onValidPhone: fn(),
    error: false,
    helperText: 'Helper text',
    shouldHaveSelectCountryButton: true,
    shouldHaveClearButton: false,
    onBlur: fn(),
    placeholder: '+1 (___) ___-____',
    lazy: true,
  },
};
