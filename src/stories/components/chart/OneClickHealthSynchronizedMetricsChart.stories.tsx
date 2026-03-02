import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickHealthSynchronizedMetricsChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/OneClickHealthSynchronizedMetricsChart',
  component: OneClickHealthSynchronizedMetricsChart,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Stack
        direction='row'
        sx={{
          width: 900,
          height: 800,
          p: 2,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 800 }}>
          <Story />
        </Box>
      </Stack>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof OneClickHealthSynchronizedMetricsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    name: 'Cerebral',
    value: 'cerebral-uuid',
    _raw: {
      brandUuid: 'cerebral-uuid',
      brandName: 'Cerebral',
      customerUuid: 'customer-2',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#4caf50' },
    },
  },
  {
    name: 'Gen Medicine',
    value: 'gen-medicine-uuid',
    _raw: {
      brandUuid: 'gen-medicine-uuid',
      brandName: 'Gen Medicine',
      customerUuid: 'customer-3',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#9c27b0' },
    },
  },
];

const mockRawData = [
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
    interval: [
      {
        date: '2024-12-18T00:00:00Z',
        oneClickHealthCreated: 45,
        oneClickHealthSucceeded: 41,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickHealthCreated: 52,
        oneClickHealthSucceeded: 48,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickHealthCreated: 38,
        oneClickHealthSucceeded: 35,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickHealthCreated: 61,
        oneClickHealthSucceeded: 57,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickHealthCreated: 55,
        oneClickHealthSucceeded: 51,
      },
      {
        date: '2024-12-23T00:00:00Z',
        oneClickHealthCreated: 67,
        oneClickHealthSucceeded: 62,
      },
    ],
  },
  {
    brandUuid: 'cerebral-uuid',
    brandName: 'Cerebral',
    interval: [
      {
        date: '2024-12-18T00:00:00Z',
        oneClickHealthCreated: 63,
        oneClickHealthSucceeded: 59,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickHealthCreated: 71,
        oneClickHealthSucceeded: 67,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickHealthCreated: 58,
        oneClickHealthSucceeded: 54,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickHealthCreated: 74,
        oneClickHealthSucceeded: 70,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickHealthCreated: 65,
        oneClickHealthSucceeded: 61,
      },
      {
        date: '2024-12-23T00:00:00Z',
        oneClickHealthCreated: 80,
        oneClickHealthSucceeded: 76,
      },
    ],
  },
  {
    brandUuid: 'gen-medicine-uuid',
    brandName: 'Gen Medicine',
    interval: [
      {
        date: '2024-12-18T00:00:00Z',
        oneClickHealthCreated: 25,
        oneClickHealthSucceeded: 23,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickHealthCreated: 31,
        oneClickHealthSucceeded: 28,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickHealthCreated: 22,
        oneClickHealthSucceeded: 20,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickHealthCreated: 35,
        oneClickHealthSucceeded: 32,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickHealthCreated: 28,
        oneClickHealthSucceeded: 26,
      },
      {
        date: '2024-12-23T00:00:00Z',
        oneClickHealthCreated: 33,
        oneClickHealthSucceeded: 30,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    chartData: mockRawData,
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
      brands: mockBrands,
    },
    colorMap: new Map(),
  },
};

export const Loading: Story = {
  args: {
    chartData: [],
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: {
      timezone: 'UTC',
      brands: mockBrands,
    },
    colorMap: new Map(),
  },
};

export const Empty: Story = {
  args: {
    chartData: [],
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
      brands: mockBrands,
    },
    colorMap: new Map(),
  },
};

export const Fetching: Story = {
  args: {
    ...Default.args,
    isFetching: true,
  },
};
