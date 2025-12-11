import type { Meta, StoryFn } from '@storybook/react';
import { OneClickHealthPercentageChart } from '../../../components/chart/OneClickHealthPercentageChart/OneClickHealthPercentageChart';

export default {
  title: 'Components/chart/OneClickHealthPercentageChart',
  component: OneClickHealthPercentageChart,
} as Meta<typeof OneClickHealthPercentageChart>;

const Template: StoryFn<typeof OneClickHealthPercentageChart> = (args) => (
  <OneClickHealthPercentageChart {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      uuid: 'series1',
      name: 'Verified',
      integrationType: 'hosted',
      chartData: [
        {
          date: '2025-01-01',
          oneClickHealthSucceeded: 80,
          oneClickHealthCreated: 100,
        },
        {
          date: '2025-01-02',
          oneClickHealthSucceeded: 85,
          oneClickHealthCreated: 95,
        },
        {
          date: '2025-01-03',
          oneClickHealthSucceeded: 90,
          oneClickHealthCreated: 98,
        },
      ],
    },
    {
      uuid: 'series2',
      name: 'Hooli',
      color: '#1976D2',
      integrationType: 'non-hosted',
      chartData: [
        {
          date: '2025-01-01',
          oneClickHealthSucceeded: 70,
          oneClickHealthCreated: 90,
        },
        {
          date: '2025-01-02',
          oneClickHealthSucceeded: 75,
          oneClickHealthCreated: 85,
        },
        {
          date: '2025-01-03',
          oneClickHealthSucceeded: 85,
          oneClickHealthCreated: 88,
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
