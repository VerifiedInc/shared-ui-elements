import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import {
  OneClickVerificationOutcomeOverTimeChart,
  mapOneClickVerificationOutcomeOverTimeChartData,
} from '../../../components/chart';

const meta = {
  title: 'components/chart/OneClickVerificationOutcomeOverTimeChart',
  component: OneClickVerificationOutcomeOverTimeChart,
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
} satisfies Meta<typeof OneClickVerificationOutcomeOverTimeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-01-10T12:00:00Z',
        oneClickVerificationCreated: 225,
        oneClickVerificationDelivered: 222,
        oneClickVerificationVerified: 190,
        oneClickVerificationFailed: 12,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 18,
      },
      {
        date: '2026-01-11T12:00:00Z',
        oneClickVerificationCreated: 240,
        oneClickVerificationDelivered: 237,
        oneClickVerificationVerified: 200,
        oneClickVerificationFailed: 13,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 22,
      },
      {
        date: '2026-01-12T12:00:00Z',
        oneClickVerificationCreated: 215,
        oneClickVerificationDelivered: 212,
        oneClickVerificationVerified: 178,
        oneClickVerificationFailed: 12,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 20,
      },
      {
        date: '2026-01-13T12:00:00Z',
        oneClickVerificationCreated: 205,
        oneClickVerificationDelivered: 202,
        oneClickVerificationVerified: 155,
        oneClickVerificationFailed: 15,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 30,
      },
      {
        date: '2026-01-14T12:00:00Z',
        oneClickVerificationCreated: 185,
        oneClickVerificationDelivered: 182,
        oneClickVerificationVerified: 120,
        oneClickVerificationFailed: 22,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 38,
      },
      {
        date: '2026-01-15T12:00:00Z',
        oneClickVerificationCreated: 165,
        oneClickVerificationDelivered: 162,
        oneClickVerificationVerified: 90,
        oneClickVerificationFailed: 25,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 45,
      },
      {
        date: '2026-01-16T12:00:00Z',
        oneClickVerificationCreated: 160,
        oneClickVerificationDelivered: 157,
        oneClickVerificationVerified: 78,
        oneClickVerificationFailed: 27,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 50,
      },
      {
        date: '2026-01-17T12:00:00Z',
        oneClickVerificationCreated: 180,
        oneClickVerificationDelivered: 177,
        oneClickVerificationVerified: 110,
        oneClickVerificationFailed: 25,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 40,
      },
      {
        date: '2026-01-18T12:00:00Z',
        oneClickVerificationCreated: 200,
        oneClickVerificationDelivered: 197,
        oneClickVerificationVerified: 145,
        oneClickVerificationFailed: 18,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 32,
      },
      {
        date: '2026-01-19T12:00:00Z',
        oneClickVerificationCreated: 215,
        oneClickVerificationDelivered: 212,
        oneClickVerificationVerified: 172,
        oneClickVerificationFailed: 13,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 25,
      },
      {
        date: '2026-01-20T12:00:00Z',
        oneClickVerificationCreated: 230,
        oneClickVerificationDelivered: 227,
        oneClickVerificationVerified: 193,
        oneClickVerificationFailed: 12,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 20,
      },
      {
        date: '2026-01-21T12:00:00Z',
        oneClickVerificationCreated: 245,
        oneClickVerificationDelivered: 242,
        oneClickVerificationVerified: 208,
        oneClickVerificationFailed: 14,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 18,
      },
      {
        date: '2026-01-22T12:00:00Z',
        oneClickVerificationCreated: 235,
        oneClickVerificationDelivered: 232,
        oneClickVerificationVerified: 202,
        oneClickVerificationFailed: 11,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 17,
      },
      {
        date: '2026-01-23T12:00:00Z',
        oneClickVerificationCreated: 250,
        oneClickVerificationDelivered: 247,
        oneClickVerificationVerified: 215,
        oneClickVerificationFailed: 12,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 18,
      },
    ],
  },
];

const chartData = mapOneClickVerificationOutcomeOverTimeChartData({
  data: mockRawData,
});

export const Default: Story = {
  args: {
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
    data: chartData.data,
    series: chartData.series,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: { timezone: 'UTC' },
  },
};
