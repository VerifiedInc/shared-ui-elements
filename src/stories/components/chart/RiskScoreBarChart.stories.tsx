import type { Meta, StoryObj } from '@storybook/react';

import { RiskScoreBarChart } from '../../../components/chart/RiskScoreBarChart';

const meta = {
  title: 'components/chart/RiskScoreBarChart',
  component: RiskScoreBarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RiskScoreBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        0: 10,
        1: 12,
        2: 8,
        500: 5,
        1000: 3,
      },
      {
        0: 5,
        1: 8,
        2: 15,
      },
    ],
    sx: {
      width: 800,
      height: 400,
    },
  },
};
