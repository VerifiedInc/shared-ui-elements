import * as React from 'react';
import { AreaChart } from '@verifiedinc-public/shared-ui-elements';

// Mirrors src/stories/components/chart/AreaChart.stories.tsx. The story's
// `ThreeSeries` and `CustomStyling` stories build their data with
// `generateRandomData()` (Math.random() evaluated at module load), so every
// capture — storybook's iframe load and this preview's page load — produces
// a different curve shape even though the story FILE is unchanged. Pinned
// here with fixed values so the preview is deterministic and comparable.
const pinnedSeriesData = [
  { month: 1, series1: 42, series2: 78, series3: 15 },
  { month: 2, series1: 88, series2: 34, series3: 61 },
  { month: 3, series1: 65, series2: 52, series3: 29 },
  { month: 4, series1: 21, series2: 90, series3: 73 },
  { month: 5, series1: 57, series2: 12, series3: 48 },
  { month: 6, series1: 76, series2: 66, series3: 8 },
  { month: 7, series1: 33, series2: 41, series3: 95 },
  { month: 8, series1: 9, series2: 84, series3: 27 },
  { month: 9, series1: 60, series2: 25, series3: 53 },
  { month: 10, series1: 94, series2: 70, series3: 39 },
];

export const Default = () => (
  <AreaChart
    data={[
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ]}
    series={[
      { key: 'UV', dataKey: 'uv', color: '#06b6d4' },
      { key: 'PV', dataKey: 'pv', color: '#10b981' },
    ]}
    xAxis={{ dataKey: 'name' }}
    sx={{ width: 800, height: 400 }}
  />
);

export const ThreeSeries = () => (
  <AreaChart
    data={pinnedSeriesData}
    series={[
      { key: 'Series 1', dataKey: 'series1', color: '#3b82f6' },
      { key: 'Series 2', dataKey: 'series2', color: '#f59e0b' },
      { key: 'Series 3', dataKey: 'series3', color: '#10b981' },
    ]}
    xAxis={{ dataKey: 'month' }}
    sx={{ width: 800, height: 400 }}
  />
);

export const CustomStyling = () => (
  <AreaChart
    data={pinnedSeriesData}
    series={[
      { key: 'Series 1', dataKey: 'series1', color: '#3b82f6' },
      { key: 'Series 2', dataKey: 'series2', color: '#8b5cf6' },
      { key: 'Series 3', dataKey: 'series3', color: '#ec4899' },
    ]}
    sx={{ width: 800, height: 400 }}
    xAxis={{ tickLine: false, dataKey: 'month' }}
    yAxis={{ tickLine: false, domain: [0, 'dataMax + 25'] }}
  />
);
