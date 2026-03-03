import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OneClickVerificationConversionSynchronizedMetricsChart } from '../../../components/chart';

const meta = {
  title:
    'components/chart/OneClickVerificationConversionSynchronizedMetricsChart',
  component: OneClickVerificationConversionSynchronizedMetricsChart,
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
} satisfies Meta<typeof OneClickVerificationConversionSynchronizedMetricsChart>;

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
        oneClickVerificationCreated: 100,
        oneClickVerificationSending: 95,
        oneClickVerificationDelivered: 90,
        oneClickVerificationVerified: 85,
        oneClickVerificationFailed: 5,
        oneClickVerificationUndelivered: 5,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickVerificationCreated: 120,
        oneClickVerificationSending: 115,
        oneClickVerificationDelivered: 110,
        oneClickVerificationVerified: 102,
        oneClickVerificationFailed: 8,
        oneClickVerificationUndelivered: 5,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickVerificationCreated: 95,
        oneClickVerificationSending: 90,
        oneClickVerificationDelivered: 85,
        oneClickVerificationVerified: 80,
        oneClickVerificationFailed: 5,
        oneClickVerificationUndelivered: 5,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickVerificationCreated: 110,
        oneClickVerificationSending: 105,
        oneClickVerificationDelivered: 100,
        oneClickVerificationVerified: 99,
        oneClickVerificationFailed: 6,
        oneClickVerificationUndelivered: 5,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickVerificationCreated: 130,
        oneClickVerificationSending: 125,
        oneClickVerificationDelivered: 120,
        oneClickVerificationVerified: 117,
        oneClickVerificationFailed: 8,
        oneClickVerificationUndelivered: 5,
        oneClickVerificationExpired: 0,
      },
    ],
  },
  {
    brandUuid: 'found-uuid',
    brandName: 'Found',
    interval: [
      {
        date: '2024-12-18T00:00:00Z',
        oneClickVerificationCreated: 60,
        oneClickVerificationSending: 57,
        oneClickVerificationDelivered: 54,
        oneClickVerificationVerified: 45,
        oneClickVerificationFailed: 3,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-19T00:00:00Z',
        oneClickVerificationCreated: 75,
        oneClickVerificationSending: 72,
        oneClickVerificationDelivered: 68,
        oneClickVerificationVerified: 60,
        oneClickVerificationFailed: 4,
        oneClickVerificationUndelivered: 4,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-20T00:00:00Z',
        oneClickVerificationCreated: 55,
        oneClickVerificationSending: 52,
        oneClickVerificationDelivered: 49,
        oneClickVerificationVerified: 41,
        oneClickVerificationFailed: 3,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-21T00:00:00Z',
        oneClickVerificationCreated: 80,
        oneClickVerificationSending: 77,
        oneClickVerificationDelivered: 73,
        oneClickVerificationVerified: 68,
        oneClickVerificationFailed: 4,
        oneClickVerificationUndelivered: 4,
        oneClickVerificationExpired: 0,
      },
      {
        date: '2024-12-22T00:00:00Z',
        oneClickVerificationCreated: 90,
        oneClickVerificationSending: 87,
        oneClickVerificationDelivered: 83,
        oneClickVerificationVerified: 72,
        oneClickVerificationFailed: 4,
        oneClickVerificationUndelivered: 4,
        oneClickVerificationExpired: 0,
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
