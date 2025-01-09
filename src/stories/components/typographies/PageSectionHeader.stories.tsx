import type { Meta, StoryObj } from '@storybook/react';
import { PageSectionHeader } from '../../../components/typographies/PageSectionHeader';
import { Button } from '@mui/material';

const meta = {
  title: 'Components/typographies/PageSectionHeader',
  component: PageSectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page Section Title',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Page Section Title',
    description:
      'This is a detailed description of the section that provides additional context.',
  },
};

export const WithTitleRightChildren: Story = {
  args: {
    title: 'Page Section Title',
    description: 'Section with a button on the right side of the title.',
    titleRightChildren: <Button variant='contained'>Action</Button>,
  },
};

export const WithCustomContent: Story = {
  args: {
    title: <span style={{ color: 'blue' }}>Custom Title Component</span>,
    description: (
      <p style={{ color: 'gray' }}>Custom description with styling</p>
    ),
    titleRightChildren: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant='outlined'>Cancel</Button>
        <Button variant='contained'>Save</Button>
      </div>
    ),
  },
};
