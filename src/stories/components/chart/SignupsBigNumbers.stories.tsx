import type { Meta, StoryObj } from '@storybook/react';
import { SignupBigNumbers } from '../../../components/chart/SignupBigNumbers/SignupBigNumbers';
import { SignupBigNumbersChartData } from '../../../components/chart/SignupBigNumbers/SignupBigNumbersMapper';

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
    chartData: [],
  },
};

export const NoData: Story = {
  args: {
    isLoading: false,
    chartData: [],
  },
};

export const SingleBrand: Story = {
  args: {
    isLoading: false,
    chartData: [
      {
        brandUuid: '1',
        brandName: 'Brand 1',
        interval: [
          {
            date: 1707854065000,
            oneClickCreated: 500,
            oneClickSuccess: 400,
            totalCost: '$1000.00',
          },
          {
            date: 1707940465000,
            oneClickCreated: 800,
            oneClickSuccess: 600,
            totalCost: '$1500.00',
          },
        ],
        overall: {
          oneClickCreated: 1300,
          oneClickSuccess: 1000,
          totalCost: '$2500.00',
        },
      },
    ],
  },
};

export const WithoutTotalCost: Story = {
  args: {
    isLoading: false,
    hideTotalCost: true,
    chartData: [
      {
        brandUuid: '1',
        brandName: 'Brand 1',
        interval: [
          {
            date: 1707854065000,
            oneClickCreated: 500,
            oneClickSuccess: 400,
            totalCost: '$1000.00',
          },
          {
            date: 1707940465000,
            oneClickCreated: 800,
            oneClickSuccess: 600,
            totalCost: '$1500.00',
          },
        ],
        overall: {
          oneClickCreated: 1300,
          oneClickSuccess: 1000,
          totalCost: '$2500.00',
        },
      },
    ],
  },
};

export const MultipleBrands: Story = {
  args: {
    isLoading: false,
    chartData: [
      {
        brandUuid: '1',
        brandName: 'Brand 1',
        interval: [
          {
            date: 1707854065000,
            oneClickCreated: 500,
            oneClickSuccess: 400,
            totalCost: '$1000.00',
          },
          {
            date: 1707940465000,
            oneClickCreated: 800,
            oneClickSuccess: 600,
            totalCost: '$1500.00',
          },
        ],
        overall: {
          oneClickCreated: 1300,
          oneClickSuccess: 1000,
          totalCost: '$2500.00',
        },
      },
      {
        brandUuid: '2',
        brandName: 'Brand 2',
        interval: [
          {
            date: 1707854065000,
            oneClickCreated: 300,
            oneClickSuccess: 250,
            totalCost: '$800.00',
          },
          {
            date: 1707940465000,
            oneClickCreated: 600,
            oneClickSuccess: 500,
            totalCost: '$1200.00',
          },
        ],
        overall: {
          oneClickCreated: 900,
          oneClickSuccess: 750,
          totalCost: '$2000.00',
        },
      },
    ],
  },
};
