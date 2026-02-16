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
          'A donut chart displaying OneClick verification outcomes.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OneClickVerificationPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { name: 'Verified', value: 7788, color: '#0dbc3d' },
      { name: 'Expired', value: 1506, color: '#F5D328' },
      { name: 'Failed', value: 1003, color: '#eb0d28' },
    ],
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
    data: [
      { name: 'Created', value: 12000, color: '#90caf9' },
      { name: 'Delivered', value: 10500, color: '#42a5f5' },
      { name: 'Verified', value: 7788, color: '#0dbc3d' },
      { name: 'Failed', value: 1003, color: '#eb0d28' },
      { name: 'Sending', value: 200, color: '#ab47bc' },
      { name: 'Undelivered', value: 350, color: '#ff7043' },
      { name: 'Expired', value: 1506, color: '#F5D328' },
    ],
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    data: [],
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
