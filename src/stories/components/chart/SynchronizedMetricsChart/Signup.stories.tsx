import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { SynchronizedMetricsChart } from '../../../../components/chart';

const meta = {
  title: 'components/chart/SynchronizedMetricsChart/Signup',
  component: SynchronizedMetricsChart,
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
} satisfies Meta<typeof SynchronizedMetricsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockBrands = [
  {
    name: 'Hooli',
    value: 'hooli-uuid',
    _raw: {
      brandUuid: 'hooli-uuid',
      brandName: 'Hooli',
      customerUuid: 'customer-1',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#2196f3' },
    },
  },
  {
    name: 'Found',
    value: 'found-uuid',
    _raw: {
      brandUuid: 'found-uuid',
      brandName: 'Found',
      customerUuid: 'customer-2',
      integrationType: 'hosted',
      additionalData: { primaryColor: '#f44336' },
    },
  },
  {
    name: 'Prophet',
    value: 'prophet-uuid',
    _raw: {
      brandUuid: 'prophet-uuid',
      brandName: 'Prophet',
      customerUuid: 'customer-3',
      integrationType: 'non-hosted',
      additionalData: { primaryColor: '#4caf50' },
    },
  },
];

const mockRawData = [
  {
    brandUuid: 'hooli-uuid',
    brandName: 'Hooli',
    interval: [
      {
        date: '2024-12-18T00:00:00Z',
        oneClickCreated: 100,
        oneClickSuccess: 85,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickCreated: 120,
        oneClickSuccess: 102,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickCreated: 95,
        oneClickSuccess: 80,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickCreated: 110,
        oneClickSuccess: 99,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickCreated: 130,
        oneClickSuccess: 117,
      },
      {
        date: '2024-12-23T00:00:00Z',
        oneClickCreated: 140,
        oneClickSuccess: 126,
      },
    ],
  },
  {
    brandUuid: 'found-uuid',
    brandName: 'Found',
    interval: [
      {
        date: '2024-12-18T00:00:00Z',
        oneClickCreated: 60,
        oneClickSuccess: 45,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickCreated: 75,
        oneClickSuccess: 60,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickCreated: 55,
        oneClickSuccess: 41,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickCreated: 80,
        oneClickSuccess: 68,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickCreated: 90,
        oneClickSuccess: 72,
      },
      {
        date: '2024-12-23T00:00:00Z',
        oneClickCreated: 85,
        oneClickSuccess: 68,
      },
    ],
  },
  {
    brandUuid: 'prophet-uuid',
    brandName: 'Prophet',
    interval: [
      {
        date: '2024-12-18T00:00:00Z',
        oneClickCreated: 200,
        oneClickSuccess: 190,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickCreated: 220,
        oneClickSuccess: 209,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickCreated: 180,
        oneClickSuccess: 171,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickCreated: 250,
        oneClickSuccess: 240,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickCreated: 230,
        oneClickSuccess: 218,
      },
      {
        date: '2024-12-23T00:00:00Z',
        oneClickCreated: 260,
        oneClickSuccess: 247,
      },
    ],
  },
];

const subChartConfig = [
  { title: 'Started', dataKey: 'oneClickCreated' },
  { title: 'Succeeded', dataKey: 'oneClickSuccess' },
  {
    title: 'Success Percentage',
    percentageOf: {
      numerator: 'oneClickSuccess',
      denominator: 'oneClickCreated',
    },
    tooltipFormatter: (v: number | string) => `${Number(v).toFixed(1)}%`,
    yAxisTickFormatter: (v: number) => `${Number(v).toFixed(0)}%`,
    yAxisDomain: ['auto', 'auto'] as [string, string],
  },
] as const;

export const Default: Story = {
  args: {
    chartData: mockRawData,
    subChartConfig,
    colorMap: new Map(),
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
      brands: mockBrands,
    },
  },
};

export const Loading: Story = {
  args: {
    chartData: [],
    subChartConfig,
    colorMap: new Map(),
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: {
      timezone: 'UTC',
      brands: mockBrands,
    },
  },
};

export const Empty: Story = {
  args: {
    chartData: [],
    subChartConfig,
    colorMap: new Map(),
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: {
      timezone: 'UTC',
      brands: mockBrands,
    },
  },
};

export const Fetching: Story = {
  args: {
    ...Default.args,
    isFetching: true,
  },
};
