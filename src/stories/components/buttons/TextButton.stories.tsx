import type { Meta, StoryObj } from '@storybook/react';
import { TextButton } from '../../../components/buttons';

const meta = {
  title: 'Components/buttons/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text Button',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Text',
    color: 'secondary',
  },
};
// Rest of the code remains the same
export const Primary: Story = {
  args: {
    children: 'Primary Text',
    color: 'primary',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Text Button',
    size: 'large',
  },
};
