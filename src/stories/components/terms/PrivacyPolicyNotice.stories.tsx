import type { Meta, StoryObj } from '@storybook/react';
import { PrivacyPolicyNotice } from '../../../components/terms';

const meta = {
  title: 'Components/terms/PrivacyPolicyNotice',
  component: PrivacyPolicyNotice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PrivacyPolicyNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
