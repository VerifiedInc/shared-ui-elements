import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from '../../../components/form';

const meta = {
  title: 'Components/form/EmailInput',
  component: EmailInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Work Email',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your email address',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    error: true,
    helperText: 'Please enter a valid email address',
  },
};
