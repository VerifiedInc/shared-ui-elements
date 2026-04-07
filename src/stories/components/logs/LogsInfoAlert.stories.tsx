import type { Meta, StoryObj } from '@storybook/react';
import { LogsInfoAlert } from '../../../components/logs/LogsInfoAlert';

const meta: Meta<typeof LogsInfoAlert> = {
  title: 'Components/logs/LogsInfoAlert',
  component: LogsInfoAlert,
};

export default meta;
type Story = StoryObj<typeof LogsInfoAlert>;

export const Default: Story = {};

export const WithDocsLink: Story = {
  args: {
    docsUrl: 'https://docs.example.com/errors',
  },
};

export const CustomContent: Story = {
  args: {
    children: 'This is a custom alert message with any content you need.',
  },
};
