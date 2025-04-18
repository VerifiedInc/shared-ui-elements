import { Box, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ExportToPdfButton } from '../../../components/buttons';
import { SeriesChart } from '../../../components/chart';

const meta = {
  title: 'components/buttons/ExportToPdfButton',
  component: ExportToPdfButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Stack
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 800,
          p: 2,
          gap: 2,
        }}
      >
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof ExportToPdfButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for the SeriesChart component
const mockChartData = [
  {
    uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af937',
    name: 'Blue Brand',
    color: '#2196f3',
    integrationType: 'hosted',
    chartData: [
      { date: 1739971140000, value: 10 },
      { date: 1739970240000, value: 15 },
      { date: 1739968980000, value: 8 },
      { date: 1739968920000, value: 12 },
      { date: 1739967920000, value: 20 },
      { date: 1739966920000, value: 18 },
      { date: 1739965920000, value: 22 },
    ],
  },
  {
    uuid: '7d9ccbe5-ce86-44d7-a463-8ac9955af123',
    name: 'Red Brand',
    color: '#f44336',
    integrationType: 'semi-hosted',
    chartData: [
      { date: 1739971140000, value: 5 },
      { date: 1739970240000, value: 8 },
      { date: 1739968980000, value: 12 },
      { date: 1739968920000, value: 15 },
      { date: 1739967920000, value: 10 },
      { date: 1739966920000, value: 14 },
      { date: 1739965920000, value: 18 },
    ],
  },
];

/**
 * This example demonstrates how to use the ExportToPdfButton component with a SeriesChart.
 * The chart is rendered inside a container with an ID, which is then used as the selector for the button.
 */
export const WithSeriesChart = {
  render: () => {
    return (
      <>
        <Typography variant='h5' gutterBottom>
          Time Series Chart
        </Typography>
        <Box sx={{ height: 320, minWidth: 800 }} id='chart-container'>
          <SeriesChart
            label='Visits'
            data={mockChartData}
            filter={{ timezone: 'UTC' }}
            showUuid={false}
          />
        </Box>
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'center' }}>
          <ExportToPdfButton targetId='chart-container' filename='chart' />
        </Stack>
      </>
    );
  },
};
