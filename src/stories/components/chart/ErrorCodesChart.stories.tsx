import type { Meta, StoryObj } from '@storybook/react';

import { ErrorCodesChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/ErrorCodesChart',
  component: ErrorCodesChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorCodesChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  OCE000: 150,
  OCE001: 75,
  OCE002: 200,
  OCE003: 50,
};

export const Default: Story = {
  args: {
    data: mockData,
    sx: {
      width: 800,
      height: 400,
    },
  },
};

export const NoData: Story = {
  args: {
    data: undefined,
    sx: {
      width: 800,
      height: 400,
    },
  },
};

export const SingleError: Story = {
  args: {
    data: {
      OCE000: 300,
    },
    sx: {
      width: 800,
      height: 400,
    },
  },
};
