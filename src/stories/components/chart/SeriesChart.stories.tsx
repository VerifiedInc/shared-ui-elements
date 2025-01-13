import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { SeriesChart } from '../../../components/chart/SeriesChart';
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

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  {
    uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af937',
    name: 'Blue Brand',
    color: '#0000ff',
    chartData: [
      { date: 1734973560000, value: 1 },
      { date: 1734969240000, value: 3 },
      { date: 1734562140000, value: 2 },
      { date: 1734562080000, value: 4 },
      { date: 1734558840000, value: 1 },
      { date: 1734558660000, value: 3 },
      { date: 1734558540000, value: 2 },
      { date: 1734558480000, value: 5 },
      { date: 1734464340000, value: 2 },
      { date: 1734462540000, value: 4 },
      { date: 1734462480000, value: 2 },
      { date: 1734367560000, value: 3 },
      { date: 1734351960000, value: 1 },
      { date: 1734351900000, value: 4 },
    ],
  },
  {
    uuid: '7d9ccbe5-ce86-44d7-a463-8ac9955af123',
    name: 'Red Brand',
    color: '#ff0000',
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
    sx: {
      width: '100%',
      height: 500,
    },
  },
};

export const SingleSeries: Story = {
  args: {
    label: 'Visits',
    data: mockData,
    filter: {
      timezone: 'UTC',
    },
    sx: {
      width: '100%',
      height: 500,
    },
  },
};
