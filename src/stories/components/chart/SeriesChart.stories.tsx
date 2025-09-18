import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { SeriesChart } from '../../../components/chart';
import {
  CustomAlertComponent,
  SnackbarProvider,
} from '../../../components/Snackbar';

const meta = {
  title: 'components/chart/SeriesChart',
  component: SeriesChart,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <SnackbarProvider
        maxSnack={2}
        Components={{
          customAlertComponent: CustomAlertComponent,
        }}
        TransitionProps={{ direction: 'up' }}
      >
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
      </SnackbarProvider>
    ),
  ],
} satisfies Meta<typeof SeriesChart>;

/**
 * You can control whether UUIDs are displayed in the legend using the `showUuid` prop.
 * By default, UUIDs are shown, but you can set `showUuid={false}` to hide them.
 */

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The chart can display UUIDs in the legend, which can be useful for debugging or when UUID information is important.
 * UUIDs are shown by default and can be copied to clipboard by clicking on them.
 */

const mockData = [
  {
    uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af937',
    name: 'Blue Brand',
    color: '#0000ff',
    description: 'hosted',
    chartData: [
      {
        date: 1739971140000,
        value: 1,
      },
      {
        date: 1739970240000,
        value: 1,
      },

      {
        date: 1739968980000,
        value: 1,
      },
      {
        date: 1739968920000,
        value: 0,
      },
    ],
  },
  {
    uuid: '7d9ccbe5-ce86-44d7-a463-8ac9955af123',
    name: 'Red Brand',
    color: '#ff0000',
    description: 'semi-hosted',
    chartData: [
      { date: 1734973560000, value: 2 },
      { date: 1734969240000, value: 4 },
      { date: 1734562140000, value: 1 },
      { date: 1734562080000, value: 3 },
      { date: 1734558840000, value: 2 },
      { date: 1734558660000, value: 5 },
      { date: 1734558540000, value: 1 },
      { date: 1734558480000, value: 3 },
      { date: 1734464340000, value: 4 },
      { date: 1734462540000, value: 2 },
      { date: 1734462480000, value: 3 },
      { date: 1734367560000, value: 1 },
      { date: 1734351960000, value: 5 },
      { date: 1734351900000, value: 2 },
    ],
  },
];

export const Default: Story = {
  args: {
    label: 'Visits',
    data: mockData,
    filter: {
      timezone: 'UTC',
    },
    showUuid: true,
    sx: {
      width: '100%',
      height: 500,
    },
  },
};

export const SingleSeries: Story = {
  args: {
    label: 'Visits',
    data: [mockData[0]],
    filter: {
      timezone: 'UTC',
    },
    showUuid: true,
    sx: {
      width: '100%',
      height: 500,
    },
  },
};

/**
 * For a cleaner look, you can hide the UUIDs in the legend by setting `showUuid={false}`.
 * This is useful when UUID information is not relevant to the end users.
 */
export const WithoutUuids: Story = {
  args: {
    label: 'Visits',
    data: mockData,
    filter: {
      timezone: 'UTC',
    },
    showUuid: false,
    sx: {
      width: '100%',
      height: 500,
    },
  },
};

/**
 * This story shows multiple brands with overlapping data points to demonstrate
 * how the tooltip handles and sorts multiple values at intersection points.
 */
export const OverlappingSeries: Story = {
  args: {
    label: 'Daily Active Users',
    data: [
      {
        uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af937',
        name: 'Brand A',
        color: '#2196f3', // Blue
        description: 'hosted',
        chartData: [
          { date: 1734973560000, value: 150 },
          { date: 1734969240000, value: 200 },
          { date: 1734562140000, value: 180 },
          { date: 1734562080000, value: 220 },
          { date: 1734558840000, value: 190 },
        ],
      },
      {
        uuid: '7d9ccbe5-ce86-44d7-a463-8ac9955af123',
        name: 'Brand B',
        color: '#f44336', // Red
        description: 'semi-hosted',
        chartData: [
          { date: 1734973560000, value: 180 },
          { date: 1734969240000, value: 160 },
          { date: 1734562140000, value: 220 },
          { date: 1734562080000, value: 190 },
          { date: 1734558840000, value: 210 },
        ],
      },
      {
        uuid: '9e7ccbe5-ce86-44d7-a463-8ac9955af456',
        name: 'Brand C',
        color: '#4caf50', // Green
        description: 'hosted',
        chartData: [
          { date: 1734973560000, value: 200 },
          { date: 1734969240000, value: 180 },
          { date: 1734562140000, value: 170 },
          { date: 1734562080000, value: 220 },
          { date: 1734558840000, value: 160 },
        ],
      },
    ],
    filter: {
      timezone: 'UTC',
    },
    showUuid: false,
    sx: {
      width: '100%',
      height: 500,
    },
  },
};
