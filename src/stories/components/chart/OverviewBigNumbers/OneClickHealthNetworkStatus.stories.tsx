import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import {
  OverviewBreakdownBigNumbers,
  oneClickHealthNetworkStatusCards,
} from '../../../../components/chart';
import type { BrandIntervalData } from '../../../../components/chart';

const meta = {
  title: 'components/chart/OverviewBigNumbers/OneClickHealthNetworkStatus',
  component: OverviewBreakdownBigNumbers,
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
    cards: oneClickHealthNetworkStatusCards,
  },
} satisfies Meta<typeof OverviewBreakdownBigNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData: BrandIntervalData[] = [
  {
    brandUuid: 'aviato-uuid',
    brandName: 'Aviato Health',
    interval: [
      {
        date: '2026-09-01T00:00:00Z',
        oneClickHealthAutofillInNetwork: 120,
        oneClickHealthAutofillIndeterminate: 34,
        oneClickHealthAutofillOutOfNetwork: 18,
        oneClickHealthCheckInNetwork: 96,
        oneClickHealthCheckIndeterminate: 21,
        oneClickHealthCheckOutOfNetwork: 12,
      },
      {
        date: '2026-09-02T00:00:00Z',
        oneClickHealthAutofillInNetwork: 131,
        oneClickHealthAutofillIndeterminate: 29,
        oneClickHealthAutofillOutOfNetwork: 22,
        oneClickHealthCheckInNetwork: 104,
        oneClickHealthCheckIndeterminate: 19,
        oneClickHealthCheckOutOfNetwork: 15,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    chartData: mockData,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    chartData: mockData,
    isLoading: true,
  },
};

export const NoRulesYet: Story = {
  args: {
    chartData: [
      {
        brandUuid: 'aviato-uuid',
        brandName: 'Aviato Health',
        interval: [
          {
            date: '2026-09-01T00:00:00Z',
            oneClickHealthCreated: 40,
            oneClickHealthSucceeded: 38,
            oneClickHealthAutofillNoRules: 38,
          },
        ],
      },
    ],
    isLoading: false,
  },
};
