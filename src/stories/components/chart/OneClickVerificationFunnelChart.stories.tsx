import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import {
  OneClickVerificationFunnelChart,
  mapOneClickVerificationFunnelChartData,
} from '../../../components/chart';

const meta = {
  title: 'components/chart/OneClickVerificationFunnelChart',
  component: OneClickVerificationFunnelChart,
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
} satisfies Meta<typeof OneClickVerificationFunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-02-17T17:00:00.000Z',
        oneClickVerificationCreated: 45,
        oneClickVerificationSending: 44,
        oneClickVerificationDelivered: 40,
        oneClickVerificationVerified: 33,
        oneClickVerificationFailed: 2,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2026-02-17T16:00:00.000Z',
        oneClickVerificationCreated: 52,
        oneClickVerificationSending: 51,
        oneClickVerificationDelivered: 46,
        oneClickVerificationVerified: 38,
        oneClickVerificationFailed: 1,
        oneClickVerificationUndelivered: 0,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2026-02-17T15:00:00.000Z',
        oneClickVerificationCreated: 38,
        oneClickVerificationSending: 37,
        oneClickVerificationDelivered: 33,
        oneClickVerificationVerified: 27,
        oneClickVerificationFailed: 1,
        oneClickVerificationUndelivered: 2,
        oneClickVerificationExpired: 3,
      },
    ],
  },
  {
    brandUuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    brandName: 'Another Brand',
    interval: [
      {
        date: '2026-02-17T17:00:00.000Z',
        oneClickVerificationCreated: 63,
        oneClickVerificationSending: 62,
        oneClickVerificationDelivered: 55,
        oneClickVerificationVerified: 45,
        oneClickVerificationFailed: 2,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2026-02-17T16:00:00.000Z',
        oneClickVerificationCreated: 71,
        oneClickVerificationSending: 70,
        oneClickVerificationDelivered: 62,
        oneClickVerificationVerified: 50,
        oneClickVerificationFailed: 2,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2026-02-17T15:00:00.000Z',
        oneClickVerificationCreated: 58,
        oneClickVerificationSending: 57,
        oneClickVerificationDelivered: 51,
        oneClickVerificationVerified: 41,
        oneClickVerificationFailed: 2,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
    ],
  },
];

const chartData = mapOneClickVerificationFunnelChartData({ data: mockRawData });

// Partial steps mock: Delivered = 0 (3-step funnel)
const partialMockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-02-17T17:00:00.000Z',
        oneClickVerificationCreated: 100,
        oneClickVerificationSending: 95,
        oneClickVerificationDelivered: 0,
        oneClickVerificationVerified: 72,
        oneClickVerificationFailed: 2,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
    ],
  },
];

const partialChartData = mapOneClickVerificationFunnelChartData({
  data: partialMockRawData,
});

export const Default: Story = {
  args: {
    data: chartData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    isSuccess: false,
    isFetching: false,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    isSuccess: false,
    isFetching: false,
  },
};

export const Fetching: Story = {
  args: {
    data: chartData,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
  },
};

export const PartialSteps: Story = {
  args: {
    data: partialChartData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
  },
};
