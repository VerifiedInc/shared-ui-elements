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
        oneClickHealthCreated: 45,
        oneClickHealthSuccess: 41,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickHealthCreated: 52,
        oneClickHealthSuccess: 48,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickHealthCreated: 38,
        oneClickHealthSuccess: 35,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickHealthCreated: 61,
        oneClickHealthSuccess: 57,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickHealthCreated: 43,
        oneClickHealthSuccess: 39,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickHealthCreated: 55,
        oneClickHealthSuccess: 51,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickHealthCreated: 49,
        oneClickHealthSuccess: 45,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickHealthCreated: 67,
        oneClickHealthSuccess: 62,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickHealthCreated: 41,
        oneClickHealthSuccess: 38,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickHealthCreated: 58,
        oneClickHealthSuccess: 54,
      },
    ],
  },
  {
    brandUuid: 'clickme-uuid',
    brandName: 'ClickMe',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickHealthCreated: 32,
        oneClickHealthSuccess: 29,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickHealthCreated: 28,
        oneClickHealthSuccess: 25,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickHealthCreated: 45,
        oneClickHealthSuccess: 42,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickHealthCreated: 39,
        oneClickHealthSuccess: 36,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickHealthCreated: 51,
        oneClickHealthSuccess: 47,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickHealthCreated: 33,
        oneClickHealthSuccess: 30,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickHealthCreated: 47,
        oneClickHealthSuccess: 43,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickHealthCreated: 42,
        oneClickHealthSuccess: 38,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickHealthCreated: 56,
        oneClickHealthSuccess: 52,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickHealthCreated: 37,
        oneClickHealthSuccess: 34,
      },
    ],
  },
  {
    brandUuid: 'aha-uuid',
    brandName: 'AHA',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickHealthCreated: 63,
        oneClickHealthSuccess: 59,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickHealthCreated: 71,
        oneClickHealthSuccess: 67,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickHealthCreated: 58,
        oneClickHealthSuccess: 54,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickHealthCreated: 74,
        oneClickHealthSuccess: 70,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickHealthCreated: 69,
        oneClickHealthSuccess: 65,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickHealthCreated: 65,
        oneClickHealthSuccess: 61,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickHealthCreated: 77,
        oneClickHealthSuccess: 73,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickHealthCreated: 62,
        oneClickHealthSuccess: 58,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickHealthCreated: 80,
        oneClickHealthSuccess: 76,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickHealthCreated: 68,
        oneClickHealthSuccess: 64,
      },
    ],
  },
  {
    brandUuid: 'wellness-uuid',
    brandName: 'Wellness Co',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickHealthCreated: 25,
        oneClickHealthSuccess: 23,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickHealthCreated: 31,
        oneClickHealthSuccess: 28,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickHealthCreated: 22,
        oneClickHealthSuccess: 20,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickHealthCreated: 35,
        oneClickHealthSuccess: 32,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickHealthCreated: 28,
        oneClickHealthSuccess: 26,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickHealthCreated: 24,
        oneClickHealthSuccess: 22,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickHealthCreated: 30,
        oneClickHealthSuccess: 27,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickHealthCreated: 26,
        oneClickHealthSuccess: 24,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickHealthCreated: 33,
        oneClickHealthSuccess: 30,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickHealthCreated: 21,
        oneClickHealthSuccess: 19,
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
        oneClickHealthCreated: item.oneClickHealthCreated * 10, // 10x the volume
        oneClickHealthSuccess: item.oneClickHealthSuccess * 8, // Slightly lower success rate
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
        oneClickHealthCreated: item.oneClickHealthCreated,
        oneClickHealthSuccess: Math.floor(item.oneClickHealthSuccess * 0.3), // Only 30% success rate
      })),
    })),
    isLoading: false,
    hideTotalCost: false,
  },
};
