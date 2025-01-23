import type { Meta, StoryObj } from '@storybook/react';

import { SimpleBarChart } from '../../../components/chart';
import { Label } from 'recharts';

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
      domain: [0, 'dataMax + 25'],
    },
    referenceLines: [
      {
        x: '1',
        stroke: 'green',
        strokeDasharray: '3 3',
        label: <Label value='Allow' position='insideTopLeft' />,
      },
      {
        x: '300',
        stroke: 'yellow',
        strokeDasharray: '3 3',
        label: <Label value='Flag' position='insideTopLeft' />,
      },
      {
        x: '600',
        stroke: 'red',
        strokeDasharray: '3 3',
        label: <Label value='Block' position='insideTopLeft' />,
      },
    ],
  },
};
