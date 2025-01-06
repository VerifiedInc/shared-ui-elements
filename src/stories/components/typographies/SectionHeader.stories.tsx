import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from '../../../components/typographies/SectionHeader';

const meta = {
  title: 'Components/typographies/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Section Header',
  },
};

export const WithCustomColor: Story = {
  args: {
    children: 'Colored Section Header',
    sx: { color: 'primary.main' },
  },
};

export const LeftAligned: Story = {
  args: {
    children: 'Left Aligned Header',
    textAlign: 'left',
  },
};

export const LongHeader: Story = {
  args: {
    children:
      'This is a longer section header that might wrap to multiple lines',
  },
};
