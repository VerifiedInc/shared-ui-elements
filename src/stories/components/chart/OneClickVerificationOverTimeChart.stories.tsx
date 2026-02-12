import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickVerificationOverTimeChart } from '../../../components/chart/OneClickVerificationOverTimeChart/OneClickVerificationOverTimeChart';
import type { AreaSeriesChartData } from '../../../components/chart/AreaChart';

const meta = {
  title: 'components/chart/OneClickVerificationOverTimeChart',
  component: OneClickVerificationOverTimeChart,
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
} satisfies Meta<typeof OneClickVerificationOverTimeChart>;

/**
 * OneClickVerificationOverTimeChart displays verification percentage over time as an area chart.
 * Values represent percentages (0–100). Use the yAxis and tooltip props to customize formatting.
 */

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  { date: '2024-12-18 00:35', verificationRate: 12.3 },
  { date: '2024-12-18 01:05', verificationRate: 34.7 },
  { date: '2024-12-19 03:08', verificationRate: 8.1 },
  { date: '2024-12-19 03:09', verificationRate: 52.4 },
  { date: '2024-12-19 03:11', verificationRate: 27.9 },
  { date: '2024-12-19 03:14', verificationRate: 61.5 },
  { date: '2024-12-19 04:08', verificationRate: 43.2 },
  { date: '2024-12-19 04:09', verificationRate: 19.6 },
  { date: '2024-12-23 17:14', verificationRate: 55.8 },
  { date: '2024-12-23 18:26', verificationRate: 38.1 },
];

const series: AreaSeriesChartData[] = [
  { key: 'Verification Rate', dataKey: 'verificationRate', color: '#f97316' },
];

/**
 * Default story showing OneClick verification rate percentage over time.
 */
export const Default: Story = {
  args: {
    data: mockData,
    series,
    yAxis: { tickFormatter: (value: number) => `${value}%` },
    tooltip: {
      formatter: (value: number | string | Array<number | string>) => [
        `${value}%`,
        'Success Rate',
      ],
    },
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Loading state story showing the loading spinner while data is being fetched.
 */
export const Loading: Story = {
  args: {
    data: [],
    series,
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Empty state story showing what happens when no data is available or the request fails.
 */
export const Empty: Story = {
  args: {
    data: [],
    series,
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Fetching state story showing the chart with reduced opacity while new data is being loaded.
 */
export const Fetching: Story = {
  args: {
    data: mockData,
    series,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: {
      timezone: 'UTC',
    },
  },
};
