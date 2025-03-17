import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { OneClickPercentageChart } from '../components/chart/OneClickPercentageChart/OneClickPercentageChart';

export default {
  title: 'Charts/OneClickPercentageChart',
  component: OneClickPercentageChart,
} as Meta<typeof OneClickPercentageChart>;

const Template: StoryFn<typeof OneClickPercentageChart> = (args) => (
  <OneClickPercentageChart {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      uuid: 'series1',
      name: 'Verified',
      chartData: [
        {
          date: '2025-01-01',
          oneClickSuccess: 80,
          oneClickCreated: 100,
        },
        {
          date: '2025-01-02',
          oneClickSuccess: 85,
          oneClickCreated: 95,
        },
        {
          date: '2025-01-03',
          oneClickSuccess: 90,
          oneClickCreated: 98,
        },
      ],
    },
    {
      uuid: 'series2',
      name: 'Hooli',
      chartData: [
        {
          date: '2025-01-01',
          oneClickSuccess: 70,
          oneClickCreated: 90,
        },
        {
          date: '2025-01-02',
          oneClickSuccess: 75,
          oneClickCreated: 85,
        },
        {
          date: '2025-01-03',
          oneClickSuccess: 85,
          oneClickCreated: 88,
        },
      ],
    },
  ],
  isLoading: false,
  isFetching: false,
  isSuccess: true,
  filter: {
    timezone: 'UTC',
  },
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  isLoading: true,
  isFetching: false,
  isSuccess: false,
  filter: {
    timezone: 'UTC',
  },
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  isLoading: false,
  isFetching: false,
  isSuccess: true,
  filter: {
    timezone: 'UTC',
  },
};

export const Fetching = Template.bind({});
Fetching.args = {
  ...Default.args,
  isFetching: true,
};
