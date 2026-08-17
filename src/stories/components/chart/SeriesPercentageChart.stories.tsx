import type { Meta, StoryObj } from '@storybook/react';
import { SeriesPercentageChart } from '../../../components/chart/SeriesPercentageChart';

const meta = {
  title: 'components/chart/SeriesPercentageChart',
  component: SeriesPercentageChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SeriesPercentageChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateRandomData = (days = 30) => {
  const data: any = [];
  const now = new Date().getTime(); // Using provided current time

  for (let i = 0; i < days; i++) {
    // Generate timestamp for each day, starting from the most recent
    const date = now - i * 24 * 60 * 60 * 1000;

    // Generate random values between 0-5 for each series
    const oneClickCreated = Math.floor(Math.random() * 6);
    const oneClickSuccess = Math.floor(Math.random() * (oneClickCreated + 1)); // Success should be <= Created
    const oneClickCancelled = Math.floor(
      Math.random() * (oneClickCreated - oneClickSuccess + 1),
    ); // Cancelled should be <= (Created - Success)

    data.push({
      date,
      oneClickCreated,
      oneClickSuccess,
      oneClickCancelled,
    });
  }

  // Sort by date ascending
  return data.sort((a, b) => a.date - b.date);
};

const sampleData = [
  {
    uuid: 'b07cbc37-fe8f-4920-a6b9-c4e9dfe193cd',
    name: 'Series 1',
    chartData: [
      ...generateRandomData(20),
      {
        date: 1739971140000,
        oneClickSuccess: 1,
        oneClickCreated: 1,
      },
      {
        date: 1739970240000,
        oneClickSuccess: 1,
        oneClickCreated: 1,
      },

      {
        date: 1739968980000,
        oneClickSuccess: 1,
        oneClickCreated: 0,
      },
      {
        date: 1739968920000,
        oneClickSuccess: 0,
        oneClickCreated: 1,
      },
    ],
  },
];

const keyValues = [
  { key: 'oneClickSuccess', name: 'Success', color: '#0DBC3D' },
  {
    key: 'oneClickCreated',
    name: 'Created',
    color: '#808080',
    isTotal: true,
  },
  { key: 'oneClickCancelled', name: 'Cancelled', color: '#fbbc05' },
];

export const Default: Story = {
  args: {
    data: sampleData,
    filter: {
      timezone: 'UTC',
    },
    keyValues: keyValues,
    sx: {
      width: 800,
      height: 400,
    },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    filter: {
      timezone: 'UTC',
    },
    keyValues: keyValues,
    sx: {
      width: 800,
      height: 400,
    },
  },
};
