import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';

import { OverviewBigNumbers } from '../../../../components/chart';
import type { BrandIntervalData } from '../../../../components/chart';

const meta = {
  title: 'components/chart/OverviewBigNumbers/Signup',
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
      startedKey: 'oneClickCreated',
      succeededKey: 'oneClickSuccess',
    },
    hideTotalCost: true,
  },
} satisfies Meta<typeof OverviewBigNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSignupData: BrandIntervalData[] = [
  {
    brandUuid: '1',
    brandName: 'Brand 1',
    interval: [
      {
        date: 1707854065000,
        oneClickCreated: 500,
        oneClickSuccess: 400,
      },
      {
        date: 1707940465000,
        oneClickCreated: 800,
        oneClickSuccess: 600,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    chartData: mockSignupData,
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

export const MultipleBrands: Story = {
  args: {
    chartData: [
      ...mockSignupData,
      {
        brandUuid: '2',
        brandName: 'Brand 2',
        interval: [
          {
            date: 1707854065000,
            oneClickCreated: 300,
            oneClickSuccess: 250,
          },
          {
            date: 1707940465000,
            oneClickCreated: 600,
            oneClickSuccess: 500,
          },
        ],
      },
    ],
    isLoading: false,
  },
};
