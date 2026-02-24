import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickVerificationBigNumbers } from '../../../components/chart';

const meta = {
  title: 'components/chart/OneClickVerificationBigNumbers',
  component: OneClickVerificationBigNumbers,
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
} satisfies Meta<typeof OneClickVerificationBigNumbers>;

/**
 * OneClickVerificationBigNumbers displays key metrics for OneClick verification in a big number format.
 * It shows total delivered, total verified, and success rate calculated from the provided data.
 * The component aggregates data across all brands to provide overall OneClick verification metrics.
 */

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data in the format expected by OneClickVerificationBigNumbers
const mockOneClickVerificationBigNumbersData = [
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 45,
        oneClickVerificationVerified: 41,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 52,
        oneClickVerificationVerified: 48,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 38,
        oneClickVerificationVerified: 35,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 61,
        oneClickVerificationVerified: 57,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 43,
        oneClickVerificationVerified: 39,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 55,
        oneClickVerificationVerified: 51,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 49,
        oneClickVerificationVerified: 45,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 67,
        oneClickVerificationVerified: 62,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 41,
        oneClickVerificationVerified: 38,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 58,
        oneClickVerificationVerified: 54,
      },
    ],
  },
  {
    brandUuid: 'clickme-uuid',
    brandName: 'ClickMe',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 32,
        oneClickVerificationVerified: 29,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 28,
        oneClickVerificationVerified: 25,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 45,
        oneClickVerificationVerified: 42,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 39,
        oneClickVerificationVerified: 36,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 51,
        oneClickVerificationVerified: 47,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 33,
        oneClickVerificationVerified: 30,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 47,
        oneClickVerificationVerified: 43,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 42,
        oneClickVerificationVerified: 38,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 56,
        oneClickVerificationVerified: 52,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 37,
        oneClickVerificationVerified: 34,
      },
    ],
  },
  {
    brandUuid: 'aha-uuid',
    brandName: 'AHA',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 63,
        oneClickVerificationVerified: 59,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 71,
        oneClickVerificationVerified: 67,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 58,
        oneClickVerificationVerified: 54,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 74,
        oneClickVerificationVerified: 70,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 69,
        oneClickVerificationVerified: 65,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 65,
        oneClickVerificationVerified: 61,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 77,
        oneClickVerificationVerified: 73,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 62,
        oneClickVerificationVerified: 58,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 80,
        oneClickVerificationVerified: 76,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 68,
        oneClickVerificationVerified: 64,
      },
    ],
  },
  {
    brandUuid: 'wellness-uuid',
    brandName: 'Wellness Co',
    interval: [
      {
        date: '2024-12-23T18:26:00Z',
        oneClickVerificationCreated: 25,
        oneClickVerificationVerified: 23,
      },
      {
        date: '2024-12-23T17:14:00Z',
        oneClickVerificationCreated: 31,
        oneClickVerificationVerified: 28,
      },
      {
        date: '2024-12-19T04:09:00Z',
        oneClickVerificationCreated: 22,
        oneClickVerificationVerified: 20,
      },
      {
        date: '2024-12-19T04:08:00Z',
        oneClickVerificationCreated: 35,
        oneClickVerificationVerified: 32,
      },
      {
        date: '2024-12-19T03:14:00Z',
        oneClickVerificationCreated: 28,
        oneClickVerificationVerified: 26,
      },
      {
        date: '2024-12-19T03:11:00Z',
        oneClickVerificationCreated: 24,
        oneClickVerificationVerified: 22,
      },
      {
        date: '2024-12-19T03:09:00Z',
        oneClickVerificationCreated: 30,
        oneClickVerificationVerified: 27,
      },
      {
        date: '2024-12-19T03:08:00Z',
        oneClickVerificationCreated: 26,
        oneClickVerificationVerified: 24,
      },
      {
        date: '2024-12-18T01:05:40Z',
        oneClickVerificationCreated: 33,
        oneClickVerificationVerified: 30,
      },
      {
        date: '2024-12-18T00:35:40Z',
        oneClickVerificationCreated: 21,
        oneClickVerificationVerified: 19,
      },
    ],
  },
];

/**
 * Default story showing OneClick verification big numbers with aggregated metrics.
 * This displays the total delivered, total verified, and success rate across all brands.
 * The data is calculated from the interval data for each brand.
 */
export const Default: Story = {
  args: {
    chartData: mockOneClickVerificationBigNumbersData as any,
    isLoading: false,
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
  },
};

/**
 * Single brand story showing OneClick verification metrics for just one brand.
 * Useful for focused analysis of a specific brand's verification performance.
 */
export const SingleBrand: Story = {
  args: {
    chartData: [mockOneClickVerificationBigNumbersData[0] as any],
    isLoading: false,
  },
};

/**
 * High volume story demonstrating the component with larger numbers.
 * This shows how the formatting handles bigger values.
 */
export const HighVolume: Story = {
  args: {
    chartData: mockOneClickVerificationBigNumbersData.map((brand) => ({
      ...brand,
      interval: brand.interval.map((item) => ({
        ...item,
        oneClickVerificationCreated: item.oneClickVerificationCreated * 10,
        oneClickVerificationVerified: item.oneClickVerificationVerified * 8,
      })),
    })) as any,
    isLoading: false,
  },
};

/**
 * Low success rate story showing poor performance metrics.
 * This demonstrates how the component displays when success rates are low.
 */
export const LowSuccessRate: Story = {
  args: {
    chartData: mockOneClickVerificationBigNumbersData.map((brand) => ({
      ...brand,
      interval: brand.interval.map((item) => ({
        ...item,
        oneClickVerificationCreated: item.oneClickVerificationCreated,
        oneClickVerificationVerified: Math.floor(
          item.oneClickVerificationVerified * 0.3,
        ),
      })),
    })) as any,
    isLoading: false,
  },
};
