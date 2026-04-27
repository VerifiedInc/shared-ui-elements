import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { ConversionOverTimeChart } from '../../../components/chart';
import { blue, green } from '../../../styles/colors';

const sampleLegendBrand = {
  uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  value: 'Aviato Health',
  color: green,
  brandName: 'Aviato Health Production',
  integrationType: 'Hosted',
};

const meta = {
  title: 'components/chart/ConversionOverTimeChart/VerificationConversion',
  component: ConversionOverTimeChart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showLegendUuid: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    legendBrand: {
      control: 'object',
      table: {
        type: { summary: 'ConversionOverTimeChartLegendBrand | undefined' },
      },
    },
  },
  decorators: [
    (Story) => (
      <Stack
        direction='row'
        sx={{
          width: 900,
          height: 500,
          p: 2,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 500 }}>
          <Story />
        </Box>
      </Stack>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ConversionOverTimeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const seriesConfig = [
  { key: 'Started', dataKey: 'oneClickVerificationCreated', color: blue },
  { key: 'Succeeded', dataKey: 'oneClickVerificationVerified', color: green },
];

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-01-10T12:00:00Z',
        oneClickVerificationCreated: 225,
        oneClickVerificationSending: 225,
        oneClickVerificationDelivered: 222,
        oneClickVerificationVerified: 190,
        oneClickVerificationFailed: 12,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 18,
      },
      {
        date: '2026-01-11T12:00:00Z',
        oneClickVerificationCreated: 240,
        oneClickVerificationSending: 240,
        oneClickVerificationDelivered: 237,
        oneClickVerificationVerified: 200,
        oneClickVerificationFailed: 13,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 22,
      },
      {
        date: '2026-01-12T12:00:00Z',
        oneClickVerificationCreated: 215,
        oneClickVerificationSending: 215,
        oneClickVerificationDelivered: 212,
        oneClickVerificationVerified: 178,
        oneClickVerificationFailed: 12,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 20,
      },
      {
        date: '2026-01-13T12:00:00Z',
        oneClickVerificationCreated: 205,
        oneClickVerificationSending: 205,
        oneClickVerificationDelivered: 202,
        oneClickVerificationVerified: 155,
        oneClickVerificationFailed: 15,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 30,
      },
      {
        date: '2026-01-14T12:00:00Z',
        oneClickVerificationCreated: 185,
        oneClickVerificationSending: 185,
        oneClickVerificationDelivered: 182,
        oneClickVerificationVerified: 120,
        oneClickVerificationFailed: 22,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 38,
      },
      {
        date: '2026-01-15T12:00:00Z',
        oneClickVerificationCreated: 165,
        oneClickVerificationSending: 165,
        oneClickVerificationDelivered: 162,
        oneClickVerificationVerified: 90,
        oneClickVerificationFailed: 25,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 45,
      },
      {
        date: '2026-01-16T12:00:00Z',
        oneClickVerificationCreated: 160,
        oneClickVerificationSending: 160,
        oneClickVerificationDelivered: 157,
        oneClickVerificationVerified: 78,
        oneClickVerificationFailed: 27,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 50,
      },
      {
        date: '2026-01-17T12:00:00Z',
        oneClickVerificationCreated: 180,
        oneClickVerificationSending: 180,
        oneClickVerificationDelivered: 177,
        oneClickVerificationVerified: 110,
        oneClickVerificationFailed: 25,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 40,
      },
      {
        date: '2026-01-18T12:00:00Z',
        oneClickVerificationCreated: 200,
        oneClickVerificationSending: 200,
        oneClickVerificationDelivered: 197,
        oneClickVerificationVerified: 145,
        oneClickVerificationFailed: 18,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 32,
      },
      {
        date: '2026-01-19T12:00:00Z',
        oneClickVerificationCreated: 215,
        oneClickVerificationSending: 215,
        oneClickVerificationDelivered: 212,
        oneClickVerificationVerified: 172,
        oneClickVerificationFailed: 13,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 25,
      },
      {
        date: '2026-01-20T12:00:00Z',
        oneClickVerificationCreated: 230,
        oneClickVerificationSending: 230,
        oneClickVerificationDelivered: 227,
        oneClickVerificationVerified: 193,
        oneClickVerificationFailed: 12,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 20,
      },
      {
        date: '2026-01-21T12:00:00Z',
        oneClickVerificationCreated: 245,
        oneClickVerificationSending: 245,
        oneClickVerificationDelivered: 242,
        oneClickVerificationVerified: 208,
        oneClickVerificationFailed: 14,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 18,
      },
      {
        date: '2026-01-22T12:00:00Z',
        oneClickVerificationCreated: 235,
        oneClickVerificationSending: 235,
        oneClickVerificationDelivered: 232,
        oneClickVerificationVerified: 202,
        oneClickVerificationFailed: 11,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 17,
      },
      {
        date: '2026-01-23T12:00:00Z',
        oneClickVerificationCreated: 250,
        oneClickVerificationSending: 250,
        oneClickVerificationDelivered: 247,
        oneClickVerificationVerified: 215,
        oneClickVerificationFailed: 12,
        oneClickVerificationUndelivered: 3,
        oneClickVerificationExpired: 18,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    chartData: mockRawData,
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Loading: Story = {
  args: {
    chartData: [],
    seriesConfig,
    stackMode: 'none',
    isLoading: true,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Empty: Story = {
  args: {
    chartData: [],
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: false,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
};

export const Fetching: Story = {
  args: {
    chartData: mockRawData,
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: true,
    isFetching: true,
    filter: { timezone: 'UTC' },
  },
};

export const WithLegend: Story = {
  args: {
    chartData: mockRawData,
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
    legendBrand: sampleLegendBrand,
    showLegendUuid: true,
  },
};

export const WithLegendNoUuid: Story = {
  args: {
    chartData: mockRawData,
    seriesConfig,
    stackMode: 'none',
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
    legendBrand: sampleLegendBrand,
    showLegendUuid: false,
  },
};
