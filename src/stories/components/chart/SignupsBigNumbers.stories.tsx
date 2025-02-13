import type { Meta, StoryObj } from '@storybook/react';
import { SignupsBigNumbers } from '../../../components/SignupsBigNumbers/SignupsBigNumbers';

const meta = {
  title: 'Components/chart/SignupsBigNumbers',
  component: SignupsBigNumbers,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupsBigNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllMetrics: Story = {
  args: {
    totalSignups: 1234,
    totalSuccess: 987,
    totalCost: 12345.67,
    successRate: 0.8,
  },
};

export const OnlySignups: Story = {
  args: {
    totalSignups: 1234,
  },
};

export const SignupsAndSuccess: Story = {
  args: {
    totalSignups: 1234,
    totalSuccess: 987,
  },
};

export const WithCustomFormatters: Story = {
  args: {
    totalSignups: 1234,
    totalSuccess: 987,
    totalCost: 12345.67,
    successRate: 0.8,
    formatNumber: (value) => `${value.toLocaleString()} signups`,
    formatCurrency: (value) => `$${value.toLocaleString()} USD`,
    formatPercentage: (value) => `${(value * 100).toFixed(1)}% completed`,
  },
};

export const EmptyComponent: Story = {
  args: {},
};

export const OnlyCostAndRate: Story = {
  args: {
    totalCost: 12345.67,
    successRate: 0.8,
  },
};

export const LargeNumbers: Story = {
  args: {
    totalSignups: 1234567,
    totalSuccess: 987654,
    totalCost: 9876543.21,
    successRate: 0.7987,
  },
};

export const OnlySuccessRate: Story = {
  args: {
    successRate: 0.999,
  },
};
