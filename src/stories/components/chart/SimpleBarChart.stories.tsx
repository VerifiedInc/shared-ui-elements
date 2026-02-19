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

const generateRandomData = () => {
  return new Array(10).fill(0).map((_, i) => ({
    month: i + 1,
    series1: Math.floor(Math.random() * 100),
    series2: Math.floor(Math.random() * 100),
    series3: Math.floor(Math.random() * 100),
  }));
};

const defaultSeries = [
  { key: 'Series 1', dataKey: 'series1', color: '#1f77b4' },
  { key: 'Series 2', dataKey: 'series2', color: '#ff7f0e' },
  { key: 'Series 3', dataKey: 'series3', color: '#ddbc23' },
];

const mockData = generateRandomData();

export const Default: Story = {
  args: {
    data: [
      { key: 'OCE000', OCE000: 100 },
      { key: 'OCE001', OCE001: 200 },
    ],
    series: [
      {
        key: 'OCE000',
        dataKey: 'OCE000',
        color: 'red',
      },
      {
        key: 'OCE001',
        dataKey: 'OCE001',
        color: 'red',
      },
    ],
    xAxis: {
      dataKey: 'key',
    },
    tooltip: {
      labelFormatter: () => 'Value for:',
    },
    sx: {
      width: 800,
      height: 400,
    },
  },
};

const threeSeriesData = generateRandomData();
const threeSeries = [
  { key: 'Series 1', dataKey: 'series1', color: '#1f77b4' },
  { key: 'Series 2', dataKey: 'series2', color: '#ff7f0e' },
  { key: 'Series 3', dataKey: 'series3', color: '#2ca02c' },
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
    referenceLines: [
      {
        y: 150,
        stroke: 'red',
        strokeDasharray: '3 3',
        label: <Label value='Threshold' position='insideBottomRight' />,
        isFront: true,
      },
    ],
  },
};

export const HorizontalLayout: Story = {
  args: {
    layout: 'horizontal',
    data: [
      { label: 'Step 1', value: 1200 },
      { label: 'Step 2', value: 1040 },
      { label: 'Step 3', value: 920 },
      { label: 'Step 4', value: 180 },
      { label: 'Step 5', value: 120 },
      { label: 'Step 6', value: 90 },
      { label: 'Step 7', value: 650 },
    ],
    series: [{ key: 'Events', dataKey: 'value', color: '#6D6EF5' }],
    yAxis: {
      dataKey: 'label',
      width: 60,
    },
    tooltip: {
      formatter: (value: any) => [value, 'Events'],
    },
    sx: {
      width: 600,
      height: 360,
    },
  },
};

export const HorizontalLayoutCustomColors: Story = {
  args: {
    layout: 'horizontal',
    data: [
      { label: 'Step 1', value: 1200, color: '#6D6EF5' },
      { label: 'Step 2', value: 1040, color: '#818CF8' },
      { label: 'Step 3', value: 920, color: '#A78BFA' },
      { label: 'Step 4', value: 180, color: '#F97316' },
      { label: 'Step 5', value: 120, color: '#EF4444' },
      { label: 'Step 6', value: 90, color: '#DC2626' },
      { label: 'Step 7', value: 650, color: '#22C55E' },
    ],
    series: [{ key: 'Events', dataKey: 'value' }],
    yAxis: {
      dataKey: 'label',
      width: 60,
    },
    sx: {
      width: 600,
      height: 360,
    },
  },
};
