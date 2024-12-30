import type { Meta, StoryObj } from '@storybook/react';
import { Counter } from '../../../components/animation/Counter';

const meta = {
  title: 'Animation/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof Counter>;

export const Basic: Story = {
  args: {
    from: 0,
    to: 100,
  },
};

export const WithCurrencyFormat: Story = {
  args: {
    from: 0,
    to: 1000,
    map: (value: number) => `$${value.toFixed(2)}`,
  },
};

export const WithPercentage: Story = {
  args: {
    from: 0,
    to: 100,
    map: (value: number) => `${value.toFixed(0)}%`,
  },
};

export const NegativeToPositive: Story = {
  args: {
    from: -50,
    to: 50,
  },
};
