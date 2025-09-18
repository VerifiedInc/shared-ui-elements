import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { TTSOverTimeChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/TTSOverTimeChart',
  component: TTSOverTimeChart,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Stack
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          p: 2,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 500 }}>
          <Story />
        </Box>
      </Stack>
    ),
  ],
} satisfies Meta<typeof TTSOverTimeChart>;

/**
 * TTSOverTimeChart displays time series data for Text-to-Speech (TTS) metrics over time.
 * It supports both ttsSent and ttsVerified data keys to show different TTS-related metrics.
 */

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data with both ttsSent and ttsVerified values
const mockTTSData = [
  {
    uuid: 'moomoo-uuid',
    name: 'Moomoo',
    color: '#2196f3',
    chartData: [
      { date: 1734973560000, value: 45 }, // ttsSent data points
      { date: 1734969240000, value: 52 },
      { date: 1734562140000, value: 38 },
      { date: 1734562080000, value: 61 },
      { date: 1734558840000, value: 43 },
      { date: 1734558660000, value: 55 },
      { date: 1734558540000, value: 49 },
      { date: 1734558480000, value: 67 },
      { date: 1734464340000, value: 41 },
      { date: 1734462540000, value: 58 },
    ],
  },
  {
    uuid: 'clickme-uuid',
    name: 'ClickMe',
    color: '#f44336',
    chartData: [
      { date: 1734973560000, value: 32 },
      { date: 1734969240000, value: 28 },
      { date: 1734562140000, value: 45 },
      { date: 1734562080000, value: 39 },
      { date: 1734558840000, value: 51 },
      { date: 1734558660000, value: 33 },
      { date: 1734558540000, value: 47 },
      { date: 1734558480000, value: 42 },
      { date: 1734464340000, value: 56 },
      { date: 1734462540000, value: 37 },
    ],
  },
  {
    uuid: 'aha-uuid',
    name: 'AHA',
    color: '#4caf50',
    chartData: [
      { date: 1734973560000, value: 63 },
      { date: 1734969240000, value: 71 },
      { date: 1734562140000, value: 58 },
      { date: 1734562080000, value: 74 },
      { date: 1734558840000, value: 69 },
      { date: 1734558660000, value: 65 },
      { date: 1734558540000, value: 77 },
      { date: 1734558480000, value: 62 },
      { date: 1734464340000, value: 80 },
      { date: 1734462540000, value: 68 },
    ],
  },
];

const mockTTSVerifiedData = [
  {
    uuid: 'moomoo-uuid',
    name: 'Moomoo',
    color: '#2196f3',
    chartData: [
      { date: 1734973560000, value: 41 }, // ttsVerified data points (slightly lower than sent)
      { date: 1734969240000, value: 48 },
      { date: 1734562140000, value: 35 },
      { date: 1734562080000, value: 57 },
      { date: 1734558840000, value: 39 },
      { date: 1734558660000, value: 51 },
      { date: 1734558540000, value: 45 },
      { date: 1734558480000, value: 62 },
      { date: 1734464340000, value: 38 },
      { date: 1734462540000, value: 54 },
    ],
  },
  {
    uuid: 'clickme-uuid',
    name: 'ClickMe',
    color: '#f44336',
    chartData: [
      { date: 1734973560000, value: 29 },
      { date: 1734969240000, value: 25 },
      { date: 1734562140000, value: 42 },
      { date: 1734562080000, value: 36 },
      { date: 1734558840000, value: 47 },
      { date: 1734558660000, value: 30 },
      { date: 1734558540000, value: 43 },
      { date: 1734558480000, value: 38 },
      { date: 1734464340000, value: 52 },
      { date: 1734462540000, value: 34 },
    ],
  },
  {
    uuid: 'aha-uuid',
    name: 'AHA',
    color: '#4caf50',
    chartData: [
      { date: 1734973560000, value: 59 },
      { date: 1734969240000, value: 67 },
      { date: 1734562140000, value: 54 },
      { date: 1734562080000, value: 70 },
      { date: 1734558840000, value: 65 },
      { date: 1734558660000, value: 61 },
      { date: 1734558540000, value: 73 },
      { date: 1734558480000, value: 58 },
      { date: 1734464340000, value: 76 },
      { date: 1734462540000, value: 64 },
    ],
  },
];

/**
 * Default story showing TTS sent data over time for multiple brands.
 * This represents the number of times keywords have been sent to brand phone numbers.
 */
export const TTSSent: Story = {
  args: {
    label: 'Keywords Sent',
    data: mockTTSData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Story showing TTS verified data over time for multiple brands.
 * This represents the number of text-to-speech messages that were successfully verified.
 * Typically, verified counts are lower than sent counts due to verification failures.
 */
export const TTSVerified: Story = {
  args: {
    label: 'Keywords Verified',
    data: mockTTSVerifiedData,
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
    label: 'Keywords Sent',
    data: [],
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
    label: 'Keywords Sent',
    data: [],
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
 * This happens when the chart is refreshing data in the background.
 */
export const Fetching: Story = {
  args: {
    label: 'Keywords Sent',
    data: mockTTSData,
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Single brand story showing TTS data for just one brand.
 * Useful for focused analysis of a specific brand's TTS performance.
 */
export const SingleBrand: Story = {
  args: {
    label: 'Keywords Sent',
    data: [mockTTSData[0]],
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Custom label story demonstrating how to override the default label.
 */
export const CustomLabel: Story = {
  args: {
    label: 'Keywords Sent',
    data: mockTTSData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};
