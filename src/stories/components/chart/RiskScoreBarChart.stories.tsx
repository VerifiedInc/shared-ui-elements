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
    isLoading: false,
    isFetching: false,
    isSuccess: true,
    sx: {
      width: 800,
    },
  },
};

export const NoData: Story = {
  args: {
    data: [],
    isLoading: false,
    isFetching: false,
    isSuccess: true,
    sx: {
      width: 800,
    },
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    isFetching: true,
    isSuccess: false,
    sx: {
      width: 800,
    },
  },
};

export const Fetching: Story = {
  args: {
    data: [
      {
        0: 10,
        1: 12,
        2: 8,
      },
    ],
    isLoading: false,
    isFetching: true,
    isSuccess: true,
    sx: {
      width: 800,
    },
  },
};
