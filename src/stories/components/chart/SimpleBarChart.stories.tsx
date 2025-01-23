import type { Meta, StoryObj } from '@storybook/react';

import { SimpleBarChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/SimpleBarChart',
  component: SimpleBarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = new Array(1000).fill(0).map((_, i) => ({
  key: String(i + 1),
  value: Math.floor(Math.random() * 100),
}));

export const Default: Story = {
  args: {
    data: mockData,
    sx: {
      width: 800,
      height: 400,
    },
  },
};

export const CustomStyling: Story = {
  args: {
    data: mockData,
    sx: {
      width: 800,
      height: 400,
    },
    xAxisProps: {
      tickLine: false,
    },
    yAxisProps: {
      tickLine: false,
    },
  },
};
