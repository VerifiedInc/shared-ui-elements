import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickHealthBigNumbers } from '../../../components/chart/OneClickHealthBigNumbers/OneClickHealthBigNumbers';

const meta = {
  title: 'components/chart/OneClickHealthBigNumbers',
  component: OneClickHealthBigNumbers,
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
} satisfies Meta<typeof OneClickHealthBigNumbers>;

/**
 * OneClickHealthBigNumbers displays key metrics for OneClick health in a big number format.
 * It shows total created, total success, total cost, and success rate calculated from the provided data.
 * The component aggregates data across all brands to provide overall OneClick performance metrics.
 */

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data in the format expected by OneClickHealthBigNumbers
const mockOneClickHealthBigNumbersData = [
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
    brandUuid: 'clickme-uuid',
    brandName: 'ClickMe',
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
 * Default story showing OneClick health big numbers with aggregated metrics.
 * This displays the total created, total success, and success rate across all brands.
 * The data is calculated from the interval data for each brand.
 */
export const Default: Story = {
  args: {
    chartData: mockOneClickHealthBigNumbersData,
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
    chartData: mockOneClickHealthBigNumbersData,
    isLoading: false,
    hideTotalCost: true,
  },
};

/**
 * Single brand story showing OneClick health metrics for just one brand.
 * Useful for focused analysis of a specific brand's OneClick performance.
 */
export const SingleBrand: Story = {
  args: {
    chartData: [mockOneClickHealthBigNumbersData[0]], // Only Moomoo brand
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
    chartData: mockOneClickHealthBigNumbersData.map((brand) => ({
      ...brand,
      interval: brand.interval.map((item) => ({
        ...item,
        oneClickCreated: item.oneClickCreated * 10, // 10x the volume
        oneClickSuccess: item.oneClickSuccess * 8, // Slightly lower success rate
      })),
    })),
    isLoading: false,
    hideTotalCost: false,
  },
};

/**
 * Low success rate story showing poor performance metrics.
 * This demonstrates how the component displays when success rates are low.
 */
export const LowSuccessRate: Story = {
  args: {
    chartData: mockOneClickHealthBigNumbersData.map((brand) => ({
      ...brand,
      interval: brand.interval.map((item) => ({
        ...item,
        oneClickCreated: item.oneClickCreated,
        oneClickSuccess: Math.floor(item.oneClickSuccess * 0.3), // Only 30% success rate
      })),
    })),
    isLoading: false,
    hideTotalCost: false,
  },
};
