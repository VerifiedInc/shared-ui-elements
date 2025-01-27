import type { Meta, StoryObj } from '@storybook/react';

import { RiskScorePieChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/RiskScorePieChart',
  component: RiskScorePieChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized pie chart for displaying risk scores. Shows a semi-circular gauge with three segments (Allow, Flag, Block) and a needle indicating the current score.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RiskScorePieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { value: Math.random() * 100000 },
  { value: Math.random() * 100000 },
  { value: Math.random() * 100000 },
];

export const Default: Story = {
  args: {
    data,
    score: 300,
    sx: {
      width: 450,
      height: 400,
    },
  },
};
