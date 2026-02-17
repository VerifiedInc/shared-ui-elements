import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickVerificationSmsOverTimeChart } from '../../../components/chart/OneClickVerificationSmsOverTimeChart/OneClickVerificationSmsOverTimeChart';
import { mapOneClickVerificationAreaSeriesData } from '../../../components/chart/OneClickVerificationSmsOverTimeChart/OneClickVerificationSmsOverTimeChart.map';

const meta = {
  title: 'components/chart/OneClickVerificationSmsOverTimeChart',
  component: OneClickVerificationSmsOverTimeChart,
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
} satisfies Meta<typeof OneClickVerificationSmsOverTimeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Moomoo',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 45,
        oneClickVerificationDelivered: 41,
        oneClickVerificationVerified: 38,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 52,
        oneClickVerificationDelivered: 48,
        oneClickVerificationVerified: 45,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 2,
        oneClickVerificationUndelivered: 0,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 38,
        oneClickVerificationDelivered: 35,
        oneClickVerificationVerified: 32,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 61,
        oneClickVerificationDelivered: 57,
        oneClickVerificationVerified: 53,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 43,
        oneClickVerificationDelivered: 39,
        oneClickVerificationVerified: 36,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 55,
        oneClickVerificationDelivered: 51,
        oneClickVerificationVerified: 48,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 49,
        oneClickVerificationDelivered: 45,
        oneClickVerificationVerified: 42,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 67,
        oneClickVerificationDelivered: 62,
        oneClickVerificationVerified: 58,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 41,
        oneClickVerificationDelivered: 38,
        oneClickVerificationVerified: 35,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 58,
        oneClickVerificationDelivered: 54,
        oneClickVerificationVerified: 50,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
    ],
  },
  {
    brandUuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    brandName: 'AHA',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 63,
        oneClickVerificationDelivered: 59,
        oneClickVerificationVerified: 55,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 71,
        oneClickVerificationDelivered: 67,
        oneClickVerificationVerified: 63,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 58,
        oneClickVerificationDelivered: 54,
        oneClickVerificationVerified: 50,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 74,
        oneClickVerificationDelivered: 70,
        oneClickVerificationVerified: 65,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 69,
        oneClickVerificationDelivered: 65,
        oneClickVerificationVerified: 61,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 65,
        oneClickVerificationDelivered: 61,
        oneClickVerificationVerified: 57,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 77,
        oneClickVerificationDelivered: 73,
        oneClickVerificationVerified: 68,
        oneClickVerificationFailed: 3,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 62,
        oneClickVerificationDelivered: 58,
        oneClickVerificationVerified: 54,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 80,
        oneClickVerificationDelivered: 76,
        oneClickVerificationVerified: 71,
        oneClickVerificationFailed: 3,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 68,
        oneClickVerificationDelivered: 64,
        oneClickVerificationVerified: 60,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
    ],
  },
  {
    brandUuid: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    brandName: 'Wellness Co',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 25,
        oneClickVerificationDelivered: 23,
        oneClickVerificationVerified: 21,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 2,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 31,
        oneClickVerificationDelivered: 28,
        oneClickVerificationVerified: 26,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 22,
        oneClickVerificationDelivered: 20,
        oneClickVerificationVerified: 18,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 2,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 35,
        oneClickVerificationDelivered: 32,
        oneClickVerificationVerified: 30,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 28,
        oneClickVerificationDelivered: 26,
        oneClickVerificationVerified: 24,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 2,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 24,
        oneClickVerificationDelivered: 22,
        oneClickVerificationVerified: 20,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 2,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 30,
        oneClickVerificationDelivered: 27,
        oneClickVerificationVerified: 25,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 26,
        oneClickVerificationDelivered: 24,
        oneClickVerificationVerified: 22,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 2,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 33,
        oneClickVerificationDelivered: 30,
        oneClickVerificationVerified: 28,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 21,
        oneClickVerificationDelivered: 19,
        oneClickVerificationVerified: 17,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 2,
      },
    ],
  },
];

const chartData = mapOneClickVerificationAreaSeriesData({
  data: mockRawData,
});

export const Default: Story = {
  args: {
    label: 'SMS Over Time',
    data: chartData.data,
    series: chartData.series,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Loading: Story = {
  args: {
    label: 'SMS Over Time',
    data: [],
    series: [],
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Empty: Story = {
  args: {
    label: 'SMS Over Time',
    data: [],
    series: [],
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Fetching: Story = {
  args: {
    label: 'SMS Over Time',
    data: chartData.data,
    series: chartData.series,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: { timezone: 'UTC' },
  },
};

const singleBrandData = mapOneClickVerificationAreaSeriesData({
  data: mockRawData.filter((item) => item.brandName === 'Moomoo'),
});

export const SingleBrand: Story = {
  args: {
    label: 'SMS Over Time',
    data: singleBrandData.data,
    series: singleBrandData.series,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};
