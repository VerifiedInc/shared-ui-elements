import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickVerificationSuccessOverTimeChart } from '../../../components/chart/OneClickVerificationSuccessOverTimeChart/OneClickVerificationSuccessOverTimeChart';
import { mapOneClickVerificationSuccessTimeSeriesData } from '../../../components/chart/OneClickVerificationSuccessOverTimeChart/OneClickVerificationSuccessOverTimeChart.map';

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
 * OneClickVerificationSuccessOverTimeChart displays verification success percentage over time as an area chart.
 * Values represent percentages calculated as (delivered / verified) * 100.
 */

export default meta;
type Story = StoryObj<typeof meta>;

const rawData = [
  {
    brandUuid: 'brand-uuid-disney',
    brandName: 'Disney',
    interval: [
      {
        date: '2024-12-18T00:35:00.000Z',
        oneClickVerificationCreated: 100,
        oneClickVerificationDelivered: 45,
        oneClickVerificationVerified: 80,
        oneClickVerificationFailed: 5,
        oneClickVerificationSending: 3,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 10,
      },
      {
        date: '2024-12-18T01:05:00.000Z',
        oneClickVerificationCreated: 120,
        oneClickVerificationDelivered: 82,
        oneClickVerificationVerified: 95,
        oneClickVerificationFailed: 8,
        oneClickVerificationSending: 2,
        oneClickVerificationUndelivered: 5,
        oneClickVerificationExpired: 10,
      },
      {
        date: '2024-12-19T03:08:00.000Z',
        oneClickVerificationCreated: 80,
        oneClickVerificationDelivered: 20,
        oneClickVerificationVerified: 60,
        oneClickVerificationFailed: 10,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 4,
        oneClickVerificationExpired: 5,
      },
      {
        date: '2024-12-19T03:09:00.000Z',
        oneClickVerificationCreated: 150,
        oneClickVerificationDelivered: 95,
        oneClickVerificationVerified: 130,
        oneClickVerificationFailed: 3,
        oneClickVerificationSending: 5,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 10,
      },
      {
        date: '2024-12-19T03:11:00.000Z',
        oneClickVerificationCreated: 90,
        oneClickVerificationDelivered: 60,
        oneClickVerificationVerified: 72,
        oneClickVerificationFailed: 6,
        oneClickVerificationSending: 4,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 5,
      },
      {
        date: '2024-12-19T03:14:00.000Z',
        oneClickVerificationCreated: 200,
        oneClickVerificationDelivered: 30,
        oneClickVerificationVerified: 175,
        oneClickVerificationFailed: 5,
        oneClickVerificationSending: 8,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 10,
      },
      {
        date: '2024-12-19T04:08:00.000Z',
        oneClickVerificationCreated: 110,
        oneClickVerificationDelivered: 70,
        oneClickVerificationVerified: 88,
        oneClickVerificationFailed: 7,
        oneClickVerificationSending: 2,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 10,
      },
      {
        date: '2024-12-19T04:09:00.000Z',
        oneClickVerificationCreated: 60,
        oneClickVerificationDelivered: 40,
        oneClickVerificationVerified: 45,
        oneClickVerificationFailed: 8,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 6,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-23T17:14:00.000Z',
        oneClickVerificationCreated: 170,
        oneClickVerificationDelivered: 110,
        oneClickVerificationVerified: 150,
        oneClickVerificationFailed: 4,
        oneClickVerificationSending: 3,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 10,
      },
      {
        date: '2024-12-23T18:26:00.000Z',
        oneClickVerificationCreated: 130,
        oneClickVerificationDelivered: 55,
        oneClickVerificationVerified: 105,
        oneClickVerificationFailed: 9,
        oneClickVerificationSending: 6,
        oneClickVerificationUndelivered: 5,
        oneClickVerificationExpired: 5,
      },
    ],
  },
];

const chartData = mapOneClickVerificationSuccessTimeSeriesData(rawData);

/**
 * Default story showing OneClick verification success percentage over time.
 */
export const Default: Story = {
  args: {
    chartData,
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
    chartData: { data: [], series: [] },
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
    chartData: { data: [], series: [] },
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
    chartData,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: {},
  },
};
