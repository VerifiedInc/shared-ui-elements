import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickHealthOutcomeOverTimeChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/OneClickHealthOutcomeOverTimeChart',
  component: OneClickHealthOutcomeOverTimeChart,
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
} satisfies Meta<typeof OneClickHealthOutcomeOverTimeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-01-10T12:00:00Z',
        oneClickHealthSucceeded: 180,
        oneClickHealthPartial: 25,
        oneClickHealthFailed: 10,
      },
      {
        date: '2026-01-11T12:00:00Z',
        oneClickHealthSucceeded: 195,
        oneClickHealthPartial: 28,
        oneClickHealthFailed: 12,
      },
      {
        date: '2026-01-12T12:00:00Z',
        oneClickHealthSucceeded: 170,
        oneClickHealthPartial: 22,
        oneClickHealthFailed: 8,
      },
      {
        date: '2026-01-13T12:00:00Z',
        oneClickHealthSucceeded: 160,
        oneClickHealthPartial: 30,
        oneClickHealthFailed: 15,
      },
      {
        date: '2026-01-14T12:00:00Z',
        oneClickHealthSucceeded: 140,
        oneClickHealthPartial: 35,
        oneClickHealthFailed: 20,
      },
      {
        date: '2026-01-15T12:00:00Z',
        oneClickHealthSucceeded: 120,
        oneClickHealthPartial: 40,
        oneClickHealthFailed: 25,
      },
      {
        date: '2026-01-16T12:00:00Z',
        oneClickHealthSucceeded: 115,
        oneClickHealthPartial: 38,
        oneClickHealthFailed: 22,
      },
      {
        date: '2026-01-17T12:00:00Z',
        oneClickHealthSucceeded: 135,
        oneClickHealthPartial: 32,
        oneClickHealthFailed: 18,
      },
      {
        date: '2026-01-18T12:00:00Z',
        oneClickHealthSucceeded: 155,
        oneClickHealthPartial: 28,
        oneClickHealthFailed: 14,
      },
      {
        date: '2026-01-19T12:00:00Z',
        oneClickHealthSucceeded: 175,
        oneClickHealthPartial: 24,
        oneClickHealthFailed: 11,
      },
      {
        date: '2026-01-20T12:00:00Z',
        oneClickHealthSucceeded: 190,
        oneClickHealthPartial: 20,
        oneClickHealthFailed: 9,
      },
      {
        date: '2026-01-21T12:00:00Z',
        oneClickHealthSucceeded: 200,
        oneClickHealthPartial: 22,
        oneClickHealthFailed: 10,
      },
      {
        date: '2026-01-22T12:00:00Z',
        oneClickHealthSucceeded: 195,
        oneClickHealthPartial: 18,
        oneClickHealthFailed: 8,
      },
      {
        date: '2026-01-23T12:00:00Z',
        oneClickHealthSucceeded: 210,
        oneClickHealthPartial: 20,
        oneClickHealthFailed: 9,
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
