import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';

import { SeriesChartLegend } from '../../../components/chart/SeriesChartLegend';
import {
  CustomAlertComponent,
  SnackbarProvider,
} from '../../../components/Snackbar';

const meta = {
  title: 'components/chart/Legend',
  component: SeriesChartLegend,
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
        <Box sx={{ width: 400 }}>
          <Story />
        </Box>
      </SnackbarProvider>
    ),
  ],
} satisfies Meta<typeof SeriesChartLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPayload = [
  {
    uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af937',
    name: 'Blue Brand',
    value: 'Blue Brand',
    color: '#0000ff',
    payload: {
      uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af937',
      name: 'Blue',
      value: 'Blue',
      color: '#0000ff',
      data: [
        {
          date: 1734973560000,
          value: 1,
        },
        {
          date: 1734969240000,
          value: 1,
        },
        {
          date: 1734562140000,
          value: 1,
        },
        {
          date: 1734562080000,
          value: 2,
        },
        {
          date: 1734558840000,
          value: 1,
        },
        {
          date: 1734558660000,
          value: 1,
        },
        {
          date: 1734558540000,
          value: 2,
        },
        {
          date: 1734558480000,
          value: 1,
        },
        {
          date: 1734464340000,
          value: 2,
        },
        {
          date: 1734462540000,
          value: 1,
        },
        {
          date: 1734462480000,
          value: 2,
        },
        {
          date: 1734367560000,
          value: 1,
        },
        {
          date: 1734351960000,
          value: 1,
        },
        {
          date: 1734351900000,
          value: 1,
        },
      ],
    },
  },
  {
    uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af938',
    name: 'Red Brand',
    value: 'Red Brand',
    color: '#ff0000',
    payload: {
      uuid: '4c8ccbe5-ce86-44d7-a463-8ac9955af938',
      name: 'Red Brand',
      value: 'Red Brand',
      color: '#ff0000',
      data: [
        {
          date: 1734973560000,
          value: 1,
        },
        {
          date: 1734969240000,
          value: 1,
        },
        {
          date: 1734562140000,
          value: 1,
        },
        {
          date: 1734562080000,
          value: 2,
        },
        {
          date: 1734558840000,
          value: 1,
        },
        {
          date: 1734558660000,
          value: 1,
        },
        {
          date: 1734558540000,
          value: 2,
        },
        {
          date: 1734558480000,
          value: 1,
        },
        {
          date: 1734464340000,
          value: 2,
        },
        {
          date: 1734462540000,
          value: 1,
        },
        {
          date: 1734462480000,
          value: 2,
        },
        {
          date: 1734367560000,
          value: 1,
        },
        {
          date: 1734351960000,
          value: 1,
        },
        {
          date: 1734351900000,
          value: 1,
        },
      ],
    },
  },
];

export const Default: Story = {
  args: {
    payload: mockPayload,
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'middle',
  },
};

export const Horizontal: Story = {
  args: {
    payload: mockPayload,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
  },
};
