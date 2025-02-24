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
  { value: 1000 }, // 0-299 range
  { value: 2000 }, // 300-599 range
  { value: 3000 }, // 600-1000 range
];

export const Default: Story = {
  args: {
    data,
    score: 300,
    isLoading: false,
    isFetching: false,
    isSuccess: true,
    sx: {
      width: 500,
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
    isSuccess: false,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
    isLoading: false,
    isSuccess: true,
  },
};

export const Fetching: Story = {
  args: {
    ...Default.args,
    isFetching: true,
  },
};

export const WithLegendLabel: Story = {
  args: {
    ...Default.args,
    legendLabel: 'Risk Score Distribution',
  },
};
