import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OverviewBigNumbers } from '../../../../components/chart';
import type { BrandIntervalData } from '../../../../components/chart';

const meta = {
  title: 'components/chart/OverviewBigNumbers/TTS',
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
  args: {
    metricsConfig: {
      startedKey: 'ttsSent',
      succeededKey: 'ttsVerified',
    },
    hideTotalCost: true,
  },
} satisfies Meta<typeof OverviewBigNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTTSData: BrandIntervalData[] = [
  {
    brandUuid: 'moomoo-uuid',
    brandName: 'Moomoo',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 45, ttsVerified: 41 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 52, ttsVerified: 48 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 38, ttsVerified: 35 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 61, ttsVerified: 57 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 43, ttsVerified: 39 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 55, ttsVerified: 51 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 49, ttsVerified: 45 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 67, ttsVerified: 62 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 41, ttsVerified: 38 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 58, ttsVerified: 54 },
    ],
  },
  {
    brandUuid: 'clickme-uuid',
    brandName: 'ClickMe',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 32, ttsVerified: 29 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 28, ttsVerified: 25 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 45, ttsVerified: 42 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 39, ttsVerified: 36 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 51, ttsVerified: 47 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 33, ttsVerified: 30 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 47, ttsVerified: 43 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 42, ttsVerified: 38 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 56, ttsVerified: 52 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 37, ttsVerified: 34 },
    ],
  },
  {
    brandUuid: 'aha-uuid',
    brandName: 'AHA',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 63, ttsVerified: 59 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 71, ttsVerified: 67 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 58, ttsVerified: 54 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 74, ttsVerified: 70 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 69, ttsVerified: 65 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 65, ttsVerified: 61 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 77, ttsVerified: 73 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 62, ttsVerified: 58 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 80, ttsVerified: 76 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 68, ttsVerified: 64 },
    ],
  },
  {
    brandUuid: 'wellness-uuid',
    brandName: 'Wellness Co',
    interval: [
      { date: '2024-12-23T18:26:00Z', ttsSent: 25, ttsVerified: 23 },
      { date: '2024-12-23T17:14:00Z', ttsSent: 31, ttsVerified: 28 },
      { date: '2024-12-19T04:09:00Z', ttsSent: 22, ttsVerified: 20 },
      { date: '2024-12-19T04:08:00Z', ttsSent: 35, ttsVerified: 32 },
      { date: '2024-12-19T03:14:00Z', ttsSent: 28, ttsVerified: 26 },
      { date: '2024-12-19T03:11:00Z', ttsSent: 24, ttsVerified: 22 },
      { date: '2024-12-19T03:09:00Z', ttsSent: 30, ttsVerified: 27 },
      { date: '2024-12-19T03:08:00Z', ttsSent: 26, ttsVerified: 24 },
      { date: '2024-12-18T01:05:40Z', ttsSent: 33, ttsVerified: 30 },
      { date: '2024-12-18T00:35:40Z', ttsSent: 21, ttsVerified: 19 },
    ],
  },
];

export const Default: Story = {
  args: {
    chartData: mockTTSData,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    chartData: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    chartData: [],
    isLoading: false,
  },
};
