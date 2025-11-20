import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickHealthOverTimeChart } from '../../../components/chart/OneClickHealthOverTimeChart/OneClickHealthOverTimeChart';
import { mapOneClickHealthTimeSeriesData } from '../../../components/chart/OneClickHealthOverTimeChart/OneClickHealthOverTimeChart.map';

const meta = {
  title: 'components/chart/OneClickHealthOverTimeChart',
  component: OneClickHealthOverTimeChart,
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
} satisfies Meta<typeof OneClickHealthOverTimeChart>;

/**
 * OneClickHealthOverTimeChart displays time series data for OneClick health metrics over time, grouped by keyword.
 * Each series represents a unique keyword across all brands, showing aggregated OneClick health metrics.
 * It supports both 'created' and 'success' data keys to show different OneClick health-related metrics.
 */

export default meta;
type Story = StoryObj<typeof meta>;

// Mock brands data for the mapper
const mockBrands = [
  {
    name: 'Moomoo',
    value: 'moomoo-uuid',
    _raw: {
      brandUuid: 'moomoo-uuid',
      brandName: 'Moomoo',
      customerUuid: 'customer-1',
      integrationType: 'sms',
      additionalData: { primaryColor: '#2196f3' },
    },
  },
  {
    name: 'ClickMe',
    value: 'clickme-uuid',
    _raw: {
      brandUuid: 'clickme-uuid',
      brandName: 'ClickMe',
      customerUuid: 'customer-2',
      integrationType: 'sms',
      additionalData: { primaryColor: '#f44336' },
    },
  },
  {
    name: 'AHA',
    value: 'aha-uuid',
    _raw: {
      brandUuid: 'aha-uuid',
      brandName: 'AHA',
      customerUuid: 'customer-3',
      integrationType: 'sms',
      additionalData: { primaryColor: '#4caf50' },
    },
  },
  {
    name: 'Wellness Co',
    value: 'wellness-uuid',
    _raw: {
      brandUuid: 'wellness-uuid',
      brandName: 'Wellness Co',
      customerUuid: 'customer-4',
      integrationType: 'sms',
      additionalData: { primaryColor: '#9c27b0' },
    },
  },
];

// Mock raw data in the format expected by the mapper
const mockRawOneClickHealthData = [
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickCreated: 45,
        oneClickSuccess: 41,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickCreated: 52,
        oneClickSuccess: 48,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickCreated: 38,
        oneClickSuccess: 35,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickCreated: 61,
        oneClickSuccess: 57,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickCreated: 43,
        oneClickSuccess: 39,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickCreated: 55,
        oneClickSuccess: 51,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickCreated: 49,
        oneClickSuccess: 45,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickCreated: 67,
        oneClickSuccess: 62,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickCreated: 41,
        oneClickSuccess: 38,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickCreated: 58,
        oneClickSuccess: 54,
      },
    ],
  },
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickCreated: 32,
        oneClickSuccess: 29,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickCreated: 28,
        oneClickSuccess: 25,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickCreated: 45,
        oneClickSuccess: 42,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickCreated: 39,
        oneClickSuccess: 36,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickCreated: 51,
        oneClickSuccess: 47,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickCreated: 33,
        oneClickSuccess: 30,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickCreated: 47,
        oneClickSuccess: 43,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickCreated: 42,
        oneClickSuccess: 38,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickCreated: 56,
        oneClickSuccess: 52,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickCreated: 37,
        oneClickSuccess: 34,
      },
    ],
  },
  {
    brandUuid: 'aha-uuid',
    brandName: 'AHA',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickCreated: 63,
        oneClickSuccess: 59,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickCreated: 71,
        oneClickSuccess: 67,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickCreated: 58,
        oneClickSuccess: 54,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickCreated: 74,
        oneClickSuccess: 70,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickCreated: 69,
        oneClickSuccess: 65,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickCreated: 65,
        oneClickSuccess: 61,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickCreated: 77,
        oneClickSuccess: 73,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickCreated: 62,
        oneClickSuccess: 58,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickCreated: 80,
        oneClickSuccess: 76,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickCreated: 68,
        oneClickSuccess: 64,
      },
    ],
  },
  {
    brandUuid: 'wellness-uuid',
    brandName: 'Wellness Co',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickCreated: 25,
        oneClickSuccess: 23,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickCreated: 31,
        oneClickSuccess: 28,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickCreated: 22,
        oneClickSuccess: 20,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickCreated: 35,
        oneClickSuccess: 32,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickCreated: 28,
        oneClickSuccess: 26,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickCreated: 24,
        oneClickSuccess: 22,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickCreated: 30,
        oneClickSuccess: 27,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickCreated: 26,
        oneClickSuccess: 24,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickCreated: 33,
        oneClickSuccess: 30,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickCreated: 21,
        oneClickSuccess: 19,
      },
    ],
  },
];

/**
 * Default story showing OneClick created data over time grouped by keywords.
 * This represents the number of times OneClick events have been created across all brands.
 * Data is aggregated by keyword, showing combined metrics from multiple brands using the same keyword.
 */
export const Created: Story = {
  args: {
    label: 'Keywords Created',
    data: mapOneClickHealthTimeSeriesData({
      brands: mockBrands,
      data: mockRawOneClickHealthData,
      keyValue: 'oneClickCreated',
      filterOutZeroValues: false,
    }),
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Story showing OneClick success data over time grouped by keywords.
 * This represents the number of OneClick events that were successfully completed.
 * Data is aggregated by keyword, showing combined success metrics from multiple brands.
 * Typically, success counts are lower than created counts due to failures or incomplete flows.
 */
export const Success: Story = {
  args: {
    label: 'Keywords Success',
    data: mapOneClickHealthTimeSeriesData({
      brands: mockBrands,
      data: mockRawOneClickHealthData,
      keyValue: 'oneClickSuccess',
      filterOutZeroValues: false,
    }),
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
    label: 'Keywords Created',
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
    label: 'Keywords Created',
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
    label: 'Keywords Created',
    data: mapOneClickHealthTimeSeriesData({
      brands: mockBrands,
      data: mockRawOneClickHealthData,
      keyValue: 'oneClickCreated',
      filterOutZeroValues: false,
    }),
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Single keyword story showing OneClick health data for just one keyword.
 * Useful for focused analysis of a specific keyword's OneClick health performance across brands.
 */
export const SingleKeyword: Story = {
  args: {
    label: 'Keywords Created',
    data: mapOneClickHealthTimeSeriesData({
      brands: [mockBrands[0], mockBrands[2]],
      data: mockRawOneClickHealthData.filter(
        (item) => item.brandName === 'Moomoo' || item.brandName === 'AHA',
      ),
      keyValue: 'oneClickCreated',
      filterOutZeroValues: false,
    }),
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
    label: 'Custom OneClick Health Metrics by Keyword',
    data: mapOneClickHealthTimeSeriesData({
      brands: mockBrands,
      data: mockRawOneClickHealthData,
      keyValue: 'oneClickCreated',
      filterOutZeroValues: false,
    }),
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};

/**
 * Story demonstrating filtering out zero values from the chart data.
 * This is useful when you want to hide periods with no activity.
 */
export const FilterZeroValues: Story = {
  args: {
    label: 'Keywords Created (Zero Values Filtered)',
    data: mapOneClickHealthTimeSeriesData({
      brands: mockBrands,
      data: mockRawOneClickHealthData,
      keyValue: 'oneClickCreated',
      filterOutZeroValues: true,
    }),
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
    },
  },
};
