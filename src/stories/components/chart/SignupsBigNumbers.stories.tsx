import type { Meta, StoryObj } from '@storybook/react';
import { SignupBigNumbers } from '../../../components/chart/SignupBigNumbers/SignupBigNumbers';
import { TimeSeriesChartData } from '../../../components/chart/OneClickOverTimeChart/OneClickTimeSeriesDataMapper';

const meta = {
  title: 'Components/chart/SignupBigNumbers',
  component: SignupBigNumbers,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupBigNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    isLoading: true,
    oneClickSuccess: undefined,
    oneClickCreated: undefined,
  },
};

export const NoData: Story = {
  args: {
    isLoading: false,
    oneClickSuccess: undefined,
    oneClickCreated: undefined,
  },
};

export const OnlyCreated: Story = {
  args: {
    isLoading: false,
    oneClickSuccess: undefined,
    oneClickCreated: [
      {
        uuid: '1',
        name: 'Brand 1',
        color: '#FF0000',
        integrationType: 'oneClickCreated',
        chartData: [
          { date: 1707854065000, value: 500 },
          { date: 1707940465000, value: 800 },
        ],
      },
    ],
  },
};

export const OnlySuccess: Story = {
  args: {
    isLoading: false,
    oneClickCreated: undefined,
    oneClickSuccess: [
      {
        uuid: '1',
        name: 'Brand 1',
        color: '#FF0000',
        integrationType: 'oneClickSuccess',
        chartData: [
          { date: 1707854065000, value: 400 },
          { date: 1707940465000, value: 600 },
        ],
      },
    ],
  },
};

export const WithData: Story = {
  args: {
    isLoading: false,
    oneClickSuccess: [
      {
        uuid: '1',
        name: 'Brand 1',
        color: '#FF0000',
        integrationType: 'oneClickSuccess',
        chartData: [
          { date: 1707854065000, value: 400 },
          { date: 1707940465000, value: 600 },
        ],
      },
    ],
    oneClickCreated: [
      {
        uuid: '2',
        name: 'Brand 2',
        color: '#00FF00',
        integrationType: 'oneClickCreated',
        chartData: [
          { date: 1707854065000, value: 500 },
          { date: 1707940465000, value: 800 },
        ],
      },
    ],
  },
};
