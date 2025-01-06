import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from '../../../components/buttons';

const meta = {
  title: 'Components/buttons/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Link Button',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Link',
    color: 'secondary',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Link',
    color: 'primary',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Link Button',
    size: 'large',
  },
};
