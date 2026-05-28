import { useState } from 'react';
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
  title: 'components/chart/ConversionOverTimeChart/SignupConversion',
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
  { key: 'Started', dataKey: 'oneClickCreated', color: blue },
  { key: 'Succeeded', dataKey: 'oneClickSuccess', color: green },
];

const mockRawData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      {
        date: '2026-01-10T12:00:00Z',
        oneClickCreated: 225,
        oneClickSuccess: 190,
      },
      {
        date: '2026-01-11T12:00:00Z',
        oneClickCreated: 240,
        oneClickSuccess: 205,
      },
      {
        date: '2026-01-12T12:00:00Z',
        oneClickCreated: 215,
        oneClickSuccess: 180,
      },
      {
        date: '2026-01-13T12:00:00Z',
        oneClickCreated: 205,
        oneClickSuccess: 160,
      },
      {
        date: '2026-01-14T12:00:00Z',
        oneClickCreated: 185,
        oneClickSuccess: 130,
      },
      {
        date: '2026-01-15T12:00:00Z',
        oneClickCreated: 165,
        oneClickSuccess: 100,
      },
      {
        date: '2026-01-16T12:00:00Z',
        oneClickCreated: 160,
        oneClickSuccess: 90,
      },
      {
        date: '2026-01-17T12:00:00Z',
        oneClickCreated: 180,
        oneClickSuccess: 120,
      },
      {
        date: '2026-01-18T12:00:00Z',
        oneClickCreated: 200,
        oneClickSuccess: 155,
      },
      {
        date: '2026-01-19T12:00:00Z',
        oneClickCreated: 215,
        oneClickSuccess: 178,
      },
      {
        date: '2026-01-20T12:00:00Z',
        oneClickCreated: 230,
        oneClickSuccess: 198,
      },
      {
        date: '2026-01-21T12:00:00Z',
        oneClickCreated: 245,
        oneClickSuccess: 215,
      },
      {
        date: '2026-01-22T12:00:00Z',
        oneClickCreated: 235,
        oneClickSuccess: 208,
      },
      {
        date: '2026-01-23T12:00:00Z',
        oneClickCreated: 250,
        oneClickSuccess: 222,
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

// Alternate dataset + series config used to demonstrate that `extraToggles`
// can drive a real swap of what the chart renders. Same date range as
// `mockRawData` so the x-axis stays comparable; different keys/values so the
// visual change is obvious when the toggle flips on.
const variantASeriesConfig = [
  { key: 'Series X', dataKey: 'seriesX', color: '#7c3aed' },
  { key: 'Series Y', dataKey: 'seriesY', color: '#f97316' },
];

const variantAData = [
  {
    brandUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    brandName: 'Brand',
    interval: [
      { date: '2026-01-10T12:00:00Z', seriesX: 40, seriesY: 32 },
      { date: '2026-01-11T12:00:00Z', seriesX: 55, seriesY: 30 },
      { date: '2026-01-12T12:00:00Z', seriesX: 70, seriesY: 28 },
      { date: '2026-01-13T12:00:00Z', seriesX: 95, seriesY: 26 },
      { date: '2026-01-14T12:00:00Z', seriesX: 130, seriesY: 23 },
      { date: '2026-01-15T12:00:00Z', seriesX: 165, seriesY: 20 },
      { date: '2026-01-16T12:00:00Z', seriesX: 195, seriesY: 145 },
      { date: '2026-01-17T12:00:00Z', seriesX: 215, seriesY: 155 },
      { date: '2026-01-18T12:00:00Z', seriesX: 240, seriesY: 145 },
      { date: '2026-01-19T12:00:00Z', seriesX: 270, seriesY: 130 },
      { date: '2026-01-20T12:00:00Z', seriesX: 310, seriesY: 115 },
      { date: '2026-01-21T12:00:00Z', seriesX: 345, seriesY: 100 },
      { date: '2026-01-22T12:00:00Z', seriesX: 380, seriesY: 185 },
      { date: '2026-01-23T12:00:00Z', seriesX: 410, seriesY: 165 },
    ],
  },
];

export const WithExtraToggle: Story = {
  args: {
    stackMode: 'none',
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
  },
  render: (args) => {
    const [variantA, setVariantA] = useState(false);
    return (
      <ConversionOverTimeChart
        {...args}
        chartData={variantA ? variantAData : mockRawData}
        seriesConfig={variantA ? variantASeriesConfig : seriesConfig}
        extraToggles={[
          {
            id: 'variant-a',
            label: 'Variant A',
            selected: variantA,
            onChange: setVariantA,
          },
        ]}
      />
    );
  },
};
