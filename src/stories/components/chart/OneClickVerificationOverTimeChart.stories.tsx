import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickVerificationOverTimeChart } from '../../../components/chart/OneClickVerificationOverTimeChart/OneClickVerificationOverTimeChart';
import { mapOneClickVerificationTimeSeriesData } from '../../../components/chart/OneClickVerificationOverTimeChart/OneClickVerificationOverTimeChart.map';

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
 * OneClickVerificationOverTimeChart displays time series data for OneClick verification metrics over time, grouped by keyword.
 * Each series represents a unique keyword across all brands, showing aggregated OneClick verification metrics.
 * It supports data keys like 'oneClickVerificationCreated', 'oneClickVerificationDelivered', etc.
 */

export default meta;
type Story = StoryObj<typeof meta>;

// Mock brands data for the mapper
const mockBrands = [
  {
    name: 'Moomoo',
    value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    _raw: {
      brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      brandName: 'Moomoo',
      customerUuid: '11111111-1111-1111-1111-111111111111',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#2196f3' },
    },
  },
  {
    name: 'ClickMe',
    value: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    _raw: {
      brandUuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      brandName: 'ClickMe',
      customerUuid: '22222222-2222-2222-2222-222222222222',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#f44336' },
    },
  },
  {
    name: 'AHA',
    value: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    _raw: {
      brandUuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      brandName: 'AHA',
      customerUuid: '33333333-3333-3333-3333-333333333333',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#4caf50' },
    },
  },
  {
    name: 'Wellness Co',
    value: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    _raw: {
      brandUuid: 'd4e5f6a7-b8c9-0123-defa-234567890123',
      brandName: 'Wellness Co',
      customerUuid: '44444444-4444-4444-4444-444444444444',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#9c27b0' },
    },
  },
];

// Mock raw data in the format expected by the mapper
const mockRawOneClickVerificationData = [
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
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Moomoo',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 32,
        oneClickVerificationDelivered: 29,
        oneClickVerificationVerified: 27,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 28,
        oneClickVerificationDelivered: 25,
        oneClickVerificationVerified: 23,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 45,
        oneClickVerificationDelivered: 42,
        oneClickVerificationVerified: 39,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 39,
        oneClickVerificationDelivered: 36,
        oneClickVerificationVerified: 33,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 51,
        oneClickVerificationDelivered: 47,
        oneClickVerificationVerified: 44,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 33,
        oneClickVerificationDelivered: 30,
        oneClickVerificationVerified: 28,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 47,
        oneClickVerificationDelivered: 43,
        oneClickVerificationVerified: 40,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 42,
        oneClickVerificationDelivered: 38,
        oneClickVerificationVerified: 35,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 0,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 56,
        oneClickVerificationDelivered: 52,
        oneClickVerificationVerified: 48,
        oneClickVerificationFailed: 2,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 4,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 37,
        oneClickVerificationDelivered: 34,
        oneClickVerificationVerified: 31,
        oneClickVerificationFailed: 1,
        oneClickVerificationSending: 1,
        oneClickVerificationUndelivered: 1,
        oneClickVerificationExpired: 3,
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

/**
 * Default story showing OneClick verification created data over time grouped by keywords.
 * This represents the number of times OneClick verification events have been created across all brands.
 * Data is aggregated by keyword, showing combined metrics from multiple brands using the same keyword.
 */
export const Created: Story = {
  args: {
    label: 'Keywords Created',
    data: mapOneClickVerificationTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawOneClickVerificationData,
      keyValue: 'oneClickVerificationCreated',
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
 * Story showing OneClick verification delivered data over time grouped by keywords.
 * This represents the number of OneClick verification events that were delivered.
 */
export const Delivered: Story = {
  args: {
    label: 'Keywords Delivered',
    data: mapOneClickVerificationTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawOneClickVerificationData,
      keyValue: 'oneClickVerificationDelivered',
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
 * Story showing OneClick verification verified data over time grouped by keywords.
 * This represents the number of OneClick verification events that were successfully verified.
 */
export const Verified: Story = {
  args: {
    label: 'Keywords Verified',
    data: mapOneClickVerificationTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawOneClickVerificationData,
      keyValue: 'oneClickVerificationVerified',
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
    data: mapOneClickVerificationTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawOneClickVerificationData,
      keyValue: 'oneClickVerificationCreated',
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
 * Single keyword story showing OneClick verification data for just one keyword.
 * Useful for focused analysis of a specific keyword's OneClick verification performance across brands.
 */
export const SingleKeyword: Story = {
  args: {
    label: 'Keywords Created',
    data: mapOneClickVerificationTimeSeriesData({
      colorMap: new Map(),
      brands: [mockBrands[0], mockBrands[2]],
      data: mockRawOneClickVerificationData.filter(
        (item) => item.brandName === 'Moomoo' || item.brandName === 'AHA',
      ),
      keyValue: 'oneClickVerificationCreated',
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
    data: mapOneClickVerificationTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawOneClickVerificationData,
      keyValue: 'oneClickVerificationCreated',
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
