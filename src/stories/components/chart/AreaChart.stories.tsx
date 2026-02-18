import type { Meta, StoryObj } from '@storybook/react';

import { AreaChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    areaType: {
      control: 'select',
      options: [
        'basis',
        'basisClosed',
        'basisOpen',
        'bumpX',
        'bumpY',
        'bump',
        'linear',
        'linearClosed',
        'natural',
        'monotoneX',
        'monotoneY',
        'monotone',
        'step',
        'stepBefore',
        'stepAfter',
      ],
      description: 'The curve type for the area chart',
    },
  },
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateRandomData = () => {
  return new Array(10).fill(0).map((_, i) => ({
    month: i + 1,
    series1: Math.floor(Math.random() * 100),
    series2: Math.floor(Math.random() * 100),
    series3: Math.floor(Math.random() * 100),
  }));
};

const defaultSeries = [
  { key: 'Series 1', dataKey: 'series1', color: '#3b82f6' }, // Blue
  { key: 'Series 2', dataKey: 'series2', color: '#8b5cf6' }, // Purple
  { key: 'Series 3', dataKey: 'series3', color: '#ec4899' }, // Pink
];

const mockData = generateRandomData();

export const Default: Story = {
  args: {
    data: [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ],
    series: [
      {
        key: 'UV',
        dataKey: 'uv',
        color: '#06b6d4', // Cyan
      },
      {
        key: 'PV',
        dataKey: 'pv',
        color: '#10b981', // Emerald
      },
    ],
    xAxis: {
      dataKey: 'name',
    },
    sx: {
      width: 800,
      height: 400,
    },
  },
};

const threeSeriesData = generateRandomData();
const threeSeries = [
  { key: 'Series 1', dataKey: 'series1', color: '#3b82f6' }, // Blue
  { key: 'Series 2', dataKey: 'series2', color: '#f59e0b' }, // Amber
  { key: 'Series 3', dataKey: 'series3', color: '#10b981' }, // Emerald
];

export const ThreeSeries: Story = {
  args: {
    data: threeSeriesData,
    series: threeSeries,
    xAxis: {
      dataKey: 'month',
    },
    sx: {
      width: 800,
      height: 400,
    },
  },
};

export const CustomStyling: Story = {
  args: {
    data: mockData,
    series: defaultSeries,
    sx: {
      width: 800,
      height: 400,
    },
    xAxis: {
      tickLine: false,
      dataKey: 'month',
    },
    yAxis: {
      tickLine: false,
      domain: [0, 'dataMax + 25'],
    },
  },
};
