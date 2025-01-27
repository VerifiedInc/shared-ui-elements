import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from '../../../components/chart';

const meta = {
  title: 'components/chart/PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An interactive pie chart that displays proportional data. Hover over slices to see detailed information. Colors can be provided in the data or will fall back to theme colors (Allow: green, Flag: yellow, Block: red).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData = [
  { name: 'Allow', customText: '0-299', value: 400, color: '#00aa00' },
  { name: 'Flag', customText: '300-599', value: 300, color: '#eeee00' },
  { name: 'Block', customText: 'Over 600', value: 300, color: '#cc0000' },
];

const themeColorData = [
  { name: 'Allow', value: 400 },
  { name: 'Flag', value: 300 },
  { name: 'Block', value: 300 },
];

export const Default: Story = {
  args: {
    data: defaultData,
    valueText: 'Avg. {{needleValue}} Points',
    valuePercentage: false,
    legendToggle: true,
    needleVisible: true,
    needleValue: 200,
    pie: {
      startAngle: 180,
      endAngle: 0,
    },
    sx: {
      width: 400,
      height: 400,
    },
  },
};

export const ThemeColors: Story = {
  args: {
    data: themeColorData,
    valueText: 'Score',
    sx: {
      width: 500,
      height: 500,
    },
  },
};

export const WithLegendLabel: Story = {
  args: {
    data: defaultData,
    legendLabel: 'Distribution',
    sx: {
      width: 500,
      height: 500,
    },
  },
};

export const DonutChart: Story = {
  args: {
    data: defaultData,
    sx: {
      width: 500,
      height: 500,
    },
  },
};

export const SingleValue: Story = {
  args: {
    data: [{ name: 'Allow', value: 1000, color: '#4CAF50' }],
    sx: {
      width: 500,
      height: 500,
    },
  },
};
