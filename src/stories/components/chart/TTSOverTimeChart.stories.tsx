import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { TTSOverTimeChart } from '../../../components/chart';
import { mapTTSTimeSeriesData } from '../../../components/chart/TTSOverTimeChart/TTSOverTimeChart.map';

const meta = {
  title: 'components/chart/TTSOverTimeChart',
  component: TTSOverTimeChart,
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
} satisfies Meta<typeof TTSOverTimeChart>;

/**
 * TTSOverTimeChart displays time series data for Text-to-Speech (TTS) metrics over time, grouped by keyword.
 * Each series represents a unique keyword across all brands, showing aggregated TTS metrics.
 * It supports both ttsSent and ttsVerified data keys to show different TTS-related metrics.
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
      integrationType: 'hosted',
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
      integrationType: 'hosted',
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
      integrationType: 'hosted',
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
      integrationType: 'hosted',
      additionalData: { primaryColor: '#9c27b0' },
    },
  },
];

// Mock raw data in the format expected by the mapper
const mockRawTTSData = [
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
    keyword: 'MOOMOO',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 45, ttsVerified: 41 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 52, ttsVerified: 48 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 38, ttsVerified: 35 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 61, ttsVerified: 57 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 43, ttsVerified: 39 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 55, ttsVerified: 51 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 49, ttsVerified: 45 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 67, ttsVerified: 62 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 41, ttsVerified: 38 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 58, ttsVerified: 54 },
    ],
  },
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
    keyword: 'CLICKME',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 32, ttsVerified: 29 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 28, ttsVerified: 25 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 45, ttsVerified: 42 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 39, ttsVerified: 36 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 51, ttsVerified: 47 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 33, ttsVerified: 30 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 47, ttsVerified: 43 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 42, ttsVerified: 38 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 56, ttsVerified: 52 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 37, ttsVerified: 34 },
    ],
  },
  {
    brandUuid: 'aha-uuid',
    brandName: 'AHA',
    keyword: 'AHA',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 63, ttsVerified: 59 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 71, ttsVerified: 67 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 58, ttsVerified: 54 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 74, ttsVerified: 70 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 69, ttsVerified: 65 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 65, ttsVerified: 61 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 77, ttsVerified: 73 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 62, ttsVerified: 58 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 80, ttsVerified: 76 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 68, ttsVerified: 64 },
    ],
  },
  {
    brandUuid: 'wellness-uuid',
    brandName: 'Wellness Co',
    keyword: 'WELLNESSCO',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 25, ttsVerified: 23 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 31, ttsVerified: 28 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 22, ttsVerified: 20 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 35, ttsVerified: 32 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 28, ttsVerified: 26 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 24, ttsVerified: 22 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 30, ttsVerified: 27 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 26, ttsVerified: 24 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 33, ttsVerified: 30 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 21, ttsVerified: 19 },
    ],
  },
];

/**
 * Default story showing TTS sent data over time grouped by keywords.
 * This represents the number of times keywords have been sent across all brands.
 * Data is aggregated by keyword, showing combined metrics from multiple brands using the same keyword.
 */
export const TTSSent: Story = {
  args: {
    label: 'Keywords Sent',
    data: mapTTSTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawTTSData,
      keyValue: 'ttsSent',
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
 * Story showing TTS verified data over time grouped by keywords.
 * This represents the number of text-to-speech messages that were successfully verified.
 * Data is aggregated by keyword, showing combined verified metrics from multiple brands.
 * Typically, verified counts are lower than sent counts due to verification failures.
 */
export const TTSVerified: Story = {
  args: {
    label: 'Keywords Verified',
    data: mapTTSTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawTTSData,
      keyValue: 'ttsVerified',
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
    data: mapTTSTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawTTSData,
      keyValue: 'ttsSent',
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
 * Single keyword story showing TTS data for just one keyword.
 * Useful for focused analysis of a specific keyword's TTS performance across brands.
 */
export const SingleKeyword: Story = {
  args: {
    label: 'Keywords Sent',
    data: mapTTSTimeSeriesData({
      colorMap: new Map(),
      brands: [mockBrands[0], mockBrands[2]], // Only brands with 'VERIFY' keyword
      data: mockRawTTSData.filter((item) => item.keyword === 'MOOMOO'),
      keyValue: 'ttsSent',
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
    label: 'Custom TTS Metrics by Keyword',
    data: mapTTSTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawTTSData,
      keyValue: 'ttsSent',
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
    label: 'Keywords Sent (Zero Values Filtered)',
    data: mapTTSTimeSeriesData({
      colorMap: new Map(),
      brands: mockBrands,
      data: mockRawTTSData,
      keyValue: 'ttsSent',
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
