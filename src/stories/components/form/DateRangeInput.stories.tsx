import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DateRangeInput } from '../../../components/form/DateRangeInput';

const meta = {
  title: 'Components/form/DateRangeInput',
  component: DateRangeInput,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        height: '400px',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    startDate: { control: 'number' },
    endDate: { control: 'number' },
  },
} satisfies Meta<typeof DateRangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Current date for the example: 2025-01-10
const TODAY = new Date('2025-01-10T17:06:42-03:00').getTime();
const YESTERDAY = TODAY - 24 * 60 * 60 * 1000;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
};

export const WithPresetDates: Story = {
  args: {
    startDate: YESTERDAY,
    endDate: TODAY,
    onChange: fn(),
  },
};
