import { type Meta, type StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { BigNumber } from '../../../components/chart/BigNumber';

const meta: Meta<typeof BigNumber> = {
  title: 'Components/Chart/BigNumber',
  component: BigNumber,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BigNumber>;

export const Default: Story = {
  args: {
    label: 'Total Users',
    initialValue: 0,
    value: 1234,
    map: (value: number) => value.toFixed(0),
  },
};

export const WithFormatter: Story = {
  args: {
    label: 'Revenue',
    initialValue: 0,
    value: 50000,
    map: (value: number) => `$${value.toFixed(0).toLocaleString()}`,
  },
};

function AnimatedBigNumber() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev + 1000) % 10000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BigNumber
      label='Animated Value'
      initialValue={0}
      value={value}
      map={(v) => v.toFixed(0).toLocaleString()}
    />
  );
}

export const Animated: Story = {
  render: () => <AnimatedBigNumber />,
};
