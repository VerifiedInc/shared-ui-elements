import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickSignupOutcomeOverTimeChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/OneClickSignupOutcomeOverTimeChart',
  component: OneClickSignupOutcomeOverTimeChart,
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
} satisfies Meta<typeof OneClickSignupOutcomeOverTimeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-01-10T12:00:00Z',
        oneClickCreated: 225,
        oneClickSuccess: 190,
      },
      {
        date: '2026-01-11T12:00:00Z',
        oneClickCreated: 240,
        oneClickSuccess: 205,
      },
      {
        date: '2026-01-12T12:00:00Z',
        oneClickCreated: 215,
        oneClickSuccess: 180,
      },
      {
        date: '2026-01-13T12:00:00Z',
        oneClickCreated: 205,
        oneClickSuccess: 160,
      },
      {
        date: '2026-01-14T12:00:00Z',
        oneClickCreated: 185,
        oneClickSuccess: 130,
      },
      {
        date: '2026-01-15T12:00:00Z',
        oneClickCreated: 165,
        oneClickSuccess: 100,
      },
      {
        date: '2026-01-16T12:00:00Z',
        oneClickCreated: 160,
        oneClickSuccess: 90,
      },
      {
        date: '2026-01-17T12:00:00Z',
        oneClickCreated: 180,
        oneClickSuccess: 120,
      },
      {
        date: '2026-01-18T12:00:00Z',
        oneClickCreated: 200,
        oneClickSuccess: 155,
      },
      {
        date: '2026-01-19T12:00:00Z',
        oneClickCreated: 215,
        oneClickSuccess: 178,
      },
      {
        date: '2026-01-20T12:00:00Z',
        oneClickCreated: 230,
        oneClickSuccess: 198,
      },
      {
        date: '2026-01-21T12:00:00Z',
        oneClickCreated: 245,
        oneClickSuccess: 215,
      },
      {
        date: '2026-01-22T12:00:00Z',
        oneClickCreated: 235,
        oneClickSuccess: 208,
      },
      {
        date: '2026-01-23T12:00:00Z',
        oneClickCreated: 250,
        oneClickSuccess: 222,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    chartData: mockRawData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Loading: Story = {
  args: {
    chartData: [],
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Empty: Story = {
  args: {
    chartData: [],
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Fetching: Story = {
  args: {
    chartData: mockRawData,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: { timezone: 'UTC' },
  },
};
