import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { TTSBigNumbers } from '../../../components/chart';

const meta = {
  title: 'components/chart/TTSBigNumbers',
  component: TTSBigNumbers,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Stack
        direction='row'
        sx={{
          width: 900,
          height: 200,
          p: 2,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 200 }}>
          <Story />
        </Box>
      </Stack>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof TTSBigNumbers>;

/**
 * TTSBigNumbers displays key metrics for Text-to-Speech (TTS) campaigns in a big number format.
 * It shows total signups, finished signups, total cost, and success rate calculated from the provided data.
 * The component aggregates data across all brands and keywords to provide overall campaign performance metrics.
 */

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data in the format expected by TTSBigNumbers (using the same structure as TTSOverTimeChart)
const mockTTSBigNumbersData = [
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
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
    brandName: 'ClickMe',
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
 * Default story showing TTS big numbers with aggregated metrics.
 * This displays the total signups, finished signups, and success rate across all brands.
 * The data is calculated from the interval data for each brand.
 */
export const Default: Story = {
  args: {
    chartData: mockTTSBigNumbersData,
    isLoading: false,
    hideTotalCost: false,
  },
};

/**
 * Loading state story showing the big numbers in loading state.
 * All values will show as 0 while the loading indicator is active.
 */
export const Loading: Story = {
  args: {
    chartData: [],
    isLoading: true,
    hideTotalCost: false,
  },
};

/**
 * Empty state story showing what happens when no data is available.
 * All metrics will display as 0 when there's no data to calculate from.
 */
export const Empty: Story = {
  args: {
    chartData: [],
    isLoading: false,
    hideTotalCost: false,
  },
};

/**
 * Story with total cost hidden.
 * This is useful when cost information is not relevant or should not be displayed.
 */
export const HideTotalCost: Story = {
  args: {
    chartData: mockTTSBigNumbersData,
    isLoading: false,
    hideTotalCost: true,
  },
};

/**
 * Single brand story showing TTS metrics for just one brand.
 * Useful for focused analysis of a specific brand's TTS performance.
 */
export const SingleBrand: Story = {
  args: {
    chartData: [mockTTSBigNumbersData[0]], // Only Moomoo brand
    isLoading: false,
    hideTotalCost: false,
  },
};

/**
 * High volume story demonstrating the component with larger numbers.
 * This shows how the formatting handles bigger values.
 */
export const HighVolume: Story = {
  args: {
    chartData: mockTTSBigNumbersData.map((brand) => ({
      ...brand,
      interval: brand.interval.map((item) => ({
        ...item,
        ttsSent: item.ttsSent * 10, // 10x the volume
        ttsVerified: item.ttsVerified * 8, // Slightly lower success rate
      })),
    })),
    isLoading: false,
    hideTotalCost: false,
  },
};

/**
 * Low success rate story showing poor performance metrics.
 * This demonstrates how the component displays when verification rates are low.
 */
export const LowSuccessRate: Story = {
  args: {
    chartData: mockTTSBigNumbersData.map((brand) => ({
      ...brand,
      interval: brand.interval.map((item) => ({
        ...item,
        ttsSent: item.ttsSent,
        ttsVerified: Math.floor(item.ttsVerified * 0.3), // Only 30% success rate
      })),
    })),
    isLoading: false,
    hideTotalCost: false,
  },
};
