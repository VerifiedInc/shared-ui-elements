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

const mockTimeSeriesData: TimeSeriesChartData[] = [
  {
    uuid: '1',
    name: 'Brand 1',
    color: '#FF0000',
    integrationType: 'type1',
    chartData: [
      { date: 1707854065000, value: 500 },
      { date: 1707940465000, value: 734 },
    ],
  },
  {
    uuid: '2',
    name: 'Brand 2',
    color: '#00FF00',
    integrationType: 'type2',
    chartData: [
      { date: 1707854065000, value: 300 },
      { date: 1707940465000, value: 687 },
    ],
  },
];

export const Loading: Story = {
  args: {
    isLoading: true,
    data: undefined,
  },
};

export const WithData: Story = {
  args: {
    isLoading: false,
    data: mockTimeSeriesData,
  },
};

export const NoData: Story = {
  args: {
    isLoading: false,
    data: undefined,
  },
};
