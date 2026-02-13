import type { Meta, StoryObj } from '@storybook/react';

import { OneClickVerificationPieChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/OneClickVerificationPieChart',
  component: OneClickVerificationPieChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A donut chart displaying OneClick verification outcomes. Pass only the keys you need.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OneClickVerificationPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      verified: 7788,
      expired: 1506,
      failed: 1003,
    },
    isLoading: false,
    isFetching: false,
    isSuccess: true,
    sx: {
      width: 500,
    },
  },
};

export const WithAllStatuses: Story = {
  args: {
    ...Default.args,
    data: {
      created: 12000,
      delivered: 10500,
      verified: 7788,
      failed: 1003,
      sending: 200,
      undelivered: 350,
      expired: 1506,
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    data: {},
    isLoading: true,
    isSuccess: false,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: {},
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
