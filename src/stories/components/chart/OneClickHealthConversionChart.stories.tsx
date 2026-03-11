import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { ConversionOverTimeChart } from '../../../components/chart';
import { blue, green } from '../../../styles/colors';

const meta = {
  title: 'components/chart/ConversionOverTimeChart/HealthConversion',
  component: ConversionOverTimeChart,
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
} satisfies Meta<typeof ConversionOverTimeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const seriesConfig = [
  { key: 'Started', dataKey: 'oneClickHealthCreated', color: blue },
  { key: 'Succeeded', dataKey: 'oneClickHealthSucceeded', color: green },
];

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-01-10T12:00:00Z',
        oneClickHealthCreated: 215,
        oneClickHealthSucceeded: 180,
      },
      {
        date: '2026-01-11T12:00:00Z',
        oneClickHealthCreated: 235,
        oneClickHealthSucceeded: 195,
      },
      {
        date: '2026-01-12T12:00:00Z',
        oneClickHealthCreated: 200,
        oneClickHealthSucceeded: 170,
      },
      {
        date: '2026-01-13T12:00:00Z',
        oneClickHealthCreated: 205,
        oneClickHealthSucceeded: 160,
      },
      {
        date: '2026-01-14T12:00:00Z',
        oneClickHealthCreated: 195,
        oneClickHealthSucceeded: 140,
      },
      {
        date: '2026-01-15T12:00:00Z',
        oneClickHealthCreated: 185,
        oneClickHealthSucceeded: 120,
      },
      {
        date: '2026-01-16T12:00:00Z',
        oneClickHealthCreated: 175,
        oneClickHealthSucceeded: 115,
      },
      {
        date: '2026-01-17T12:00:00Z',
        oneClickHealthCreated: 185,
        oneClickHealthSucceeded: 135,
      },
      {
        date: '2026-01-18T12:00:00Z',
        oneClickHealthCreated: 197,
        oneClickHealthSucceeded: 155,
      },
      {
        date: '2026-01-19T12:00:00Z',
        oneClickHealthCreated: 210,
        oneClickHealthSucceeded: 175,
      },
      {
        date: '2026-01-20T12:00:00Z',
        oneClickHealthCreated: 219,
        oneClickHealthSucceeded: 190,
      },
      {
        date: '2026-01-21T12:00:00Z',
        oneClickHealthCreated: 232,
        oneClickHealthSucceeded: 200,
      },
      {
        date: '2026-01-22T12:00:00Z',
        oneClickHealthCreated: 221,
        oneClickHealthSucceeded: 195,
      },
      {
        date: '2026-01-23T12:00:00Z',
        oneClickHealthCreated: 239,
        oneClickHealthSucceeded: 210,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    chartData: mockRawData,
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Loading: Story = {
  args: {
    chartData: [],
    seriesConfig,
    stackMode: 'none',
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Empty: Story = {
  args: {
    chartData: [],
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Fetching: Story = {
  args: {
    chartData: mockRawData,
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: { timezone: 'UTC' },
  },
};
