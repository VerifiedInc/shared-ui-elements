import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import {
  OneClickVerificationSuccessOverTimeChart,
  type OneClickVerificationChartData,
} from '../../../components/chart/OneClickVerificationSuccessOverTimeChart/OneClickVerificationSuccessOverTimeChart';

const meta = {
  title: 'components/chart/OneClickVerificationSuccessOverTimeChart',
  component: OneClickVerificationSuccessOverTimeChart,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Stack
        direction='row'
        sx={{
          width: 900,
          height: 500,
          p: 2,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 500 }}>
          <Story />
        </Box>
      </Stack>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof OneClickVerificationSuccessOverTimeChart>;

/**
 * OneClickVerificationSuccessOverTimeChart displays verification success percentage over time as a line chart.
 * Values represent percentages calculated as (verified / (verified + expired + failed)) * 100.
 */

export default meta;
type Story = StoryObj<typeof meta>;

const singleSeriesData: OneClickVerificationChartData[] = [
  {
    uuid: 'brand-uuid-disney',
    name: 'Disney',
    color: '#1E88E5',
    chartData: [
      {
        date: '2024-12-18T00:35:00.000Z',
        verificationPercentage: 80,
        verificationTotal: 95,
      },
      {
        date: '2024-12-18T01:05:00.000Z',
        verificationPercentage: 95,
        verificationTotal: 113,
      },
      {
        date: '2024-12-19T03:08:00.000Z',
        verificationPercentage: 60,
        verificationTotal: 75,
      },
      {
        date: '2024-12-19T03:09:00.000Z',
        verificationPercentage: 130,
        verificationTotal: 143,
      },
      {
        date: '2024-12-19T03:11:00.000Z',
        verificationPercentage: 72,
        verificationTotal: 83,
      },
      {
        date: '2024-12-19T03:14:00.000Z',
        verificationPercentage: 175,
        verificationTotal: 190,
      },
      {
        date: '2024-12-19T04:08:00.000Z',
        verificationPercentage: 88,
        verificationTotal: 105,
      },
      {
        date: '2024-12-19T04:09:00.000Z',
        verificationPercentage: 45,
        verificationTotal: 53,
      },
      {
        date: '2024-12-23T17:14:00.000Z',
        verificationPercentage: 150,
        verificationTotal: 164,
      },
      {
        date: '2024-12-23T18:26:00.000Z',
        verificationPercentage: 105,
        verificationTotal: 119,
      },
    ],
  },
];

const multipleSeriesData: OneClickVerificationChartData[] = [
  {
    uuid: 'brand-uuid-disney',
    name: 'Disney',
    color: '#1E88E5',
    chartData: [
      {
        date: '2024-12-18T00:35:00.000Z',
        verificationPercentage: 80,
        verificationTotal: 95,
      },
      {
        date: '2024-12-18T01:05:00.000Z',
        verificationPercentage: 95,
        verificationTotal: 113,
      },
      {
        date: '2024-12-19T03:08:00.000Z',
        verificationPercentage: 60,
        verificationTotal: 75,
      },
      {
        date: '2024-12-19T03:09:00.000Z',
        verificationPercentage: 130,
        verificationTotal: 143,
      },
      {
        date: '2024-12-19T03:11:00.000Z',
        verificationPercentage: 72,
        verificationTotal: 83,
      },
      {
        date: '2024-12-19T03:14:00.000Z',
        verificationPercentage: 175,
        verificationTotal: 190,
      },
      {
        date: '2024-12-19T04:08:00.000Z',
        verificationPercentage: 88,
        verificationTotal: 105,
      },
      {
        date: '2024-12-19T04:09:00.000Z',
        verificationPercentage: 45,
        verificationTotal: 53,
      },
      {
        date: '2024-12-23T17:14:00.000Z',
        verificationPercentage: 150,
        verificationTotal: 164,
      },
      {
        date: '2024-12-23T18:26:00.000Z',
        verificationPercentage: 105,
        verificationTotal: 119,
      },
    ],
  },
  {
    uuid: 'brand-uuid-spotify',
    name: 'Spotify',
    color: '#1DB954',
    chartData: [
      {
        date: '2024-12-18T00:35:00.000Z',
        verificationPercentage: 65,
        verificationTotal: 90,
      },
      {
        date: '2024-12-18T01:05:00.000Z',
        verificationPercentage: 70,
        verificationTotal: 90,
      },
      {
        date: '2024-12-19T03:08:00.000Z',
        verificationPercentage: 52,
        verificationTotal: 80,
      },
      {
        date: '2024-12-19T03:09:00.000Z',
        verificationPercentage: 98,
        verificationTotal: 120,
      },
      {
        date: '2024-12-19T03:11:00.000Z',
        verificationPercentage: 57,
        verificationTotal: 75,
      },
      {
        date: '2024-12-19T03:14:00.000Z',
        verificationPercentage: 132,
        verificationTotal: 150,
      },
      {
        date: '2024-12-19T04:08:00.000Z',
        verificationPercentage: 71,
        verificationTotal: 90,
      },
      {
        date: '2024-12-19T04:09:00.000Z',
        verificationPercentage: 37,
        verificationTotal: 50,
      },
      {
        date: '2024-12-23T17:14:00.000Z',
        verificationPercentage: 119,
        verificationTotal: 140,
      },
      {
        date: '2024-12-23T18:26:00.000Z',
        verificationPercentage: 81,
        verificationTotal: 100,
      },
    ],
  },
  {
    uuid: 'brand-uuid-netflix',
    name: 'Netflix',
    color: '#E50914',
    chartData: [
      {
        date: '2024-12-18T00:35:00.000Z',
        verificationPercentage: 190,
        verificationTotal: 200,
      },
      {
        date: '2024-12-18T01:05:00.000Z',
        verificationPercentage: 138,
        verificationTotal: 150,
      },
      {
        date: '2024-12-19T03:08:00.000Z',
        verificationPercentage: 110,
        verificationTotal: 125,
      },
      {
        date: '2024-12-19T03:09:00.000Z',
        verificationPercentage: 173,
        verificationTotal: 180,
      },
      {
        date: '2024-12-19T03:11:00.000Z',
        verificationPercentage: 93,
        verificationTotal: 100,
      },
      {
        date: '2024-12-19T03:14:00.000Z',
        verificationPercentage: 214,
        verificationTotal: 220,
      },
      {
        date: '2024-12-19T04:08:00.000Z',
        verificationPercentage: 109,
        verificationTotal: 120,
      },
      {
        date: '2024-12-19T04:09:00.000Z',
        verificationPercentage: 63,
        verificationTotal: 70,
      },
      {
        date: '2024-12-23T17:14:00.000Z',
        verificationPercentage: 175,
        verificationTotal: 185,
      },
      {
        date: '2024-12-23T18:26:00.000Z',
        verificationPercentage: 130,
        verificationTotal: 140,
      },
    ],
  },
];

/**
 * Default story showing OneClick verification success percentage over time for a single brand.
 */
export const Default: Story = {
  args: {
    data: singleSeriesData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {},
  },
};

/**
 * Multiple series story showing OneClick verification success percentage over time for multiple brands.
 */
export const MultipleSeries: Story = {
  args: {
    data: multipleSeriesData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {},
  },
};

/**
 * Loading state story showing the loading spinner while data is being fetched.
 */
export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: {},
  },
};

/**
 * Empty state story showing what happens when no data is available or the request fails.
 */
export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    filter: {},
  },
};

/**
 * Fetching state story showing the chart with reduced opacity while new data is being loaded.
 */
export const Fetching: Story = {
  args: {
    data: singleSeriesData,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: {},
  },
};
