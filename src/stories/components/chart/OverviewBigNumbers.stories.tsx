import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OverviewBigNumbers } from '../../../components/chart';

const meta = {
  title: 'components/chart/OverviewBigNumbers',
  component: OverviewBigNumbers,
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
} satisfies Meta<typeof OverviewBigNumbers>;

/**
 * OverviewBigNumbers displays key product overview metrics in a big number card format.
 * It shows Started, Succeeded, Total Cost, and Success Rate.
 * Labels and cost visibility are configurable.
 */

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing all 4 metric cards with sample data.
 */
export const Default: Story = {
  args: {
    metrics: {
      started: 1250,
      succeeded: 1100,
      totalCost: 4523.5,
      successRate: 0.88,
    },
    isLoading: false,
    hideTotalCost: false,
  },
};

/**
 * Loading state — all values display as zero.
 */
export const Loading: Story = {
  args: {
    metrics: {
      started: 1250,
      succeeded: 1100,
      totalCost: 4523.5,
      successRate: 0.88,
    },
    isLoading: true,
  },
};

/**
 * Empty metrics — all values are zero (not loading).
 */
export const Empty: Story = {
  args: {
    metrics: {
      started: 0,
      succeeded: 0,
      totalCost: 0,
      successRate: 0,
    },
    isLoading: false,
  },
};

/**
 * Cost card hidden — only 3 cards displayed.
 */
export const HideTotalCost: Story = {
  args: {
    metrics: {
      started: 500,
      succeeded: 420,
      totalCost: 1200,
      successRate: 0.84,
    },
    isLoading: false,
    hideTotalCost: true,
  },
};

/**
 * Custom labels — overridden startedLabel and succeededLabel.
 */
export const CustomLabels: Story = {
  args: {
    metrics: {
      started: 800,
      succeeded: 720,
      totalCost: 3200,
      successRate: 0.9,
    },
    isLoading: false,
    startedLabel: 'Total Sent',
    succeededLabel: 'Total Verified',
  },
};

/**
 * No cost in metrics — totalCost omitted, cost card shows $0.00.
 */
export const NoCostInMetrics: Story = {
  args: {
    metrics: {
      started: 300,
      succeeded: 250,
      successRate: 0.8333,
    },
    isLoading: false,
    hideTotalCost: false,
  },
};
