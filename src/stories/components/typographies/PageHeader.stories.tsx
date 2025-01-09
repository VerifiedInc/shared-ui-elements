import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '../../../components/typographies/PageHeader';
import { Button } from '@mui/material';

const meta = {
  title: 'Components/typographies/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Main Page Title',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Main Page Title',
    description:
      'This is the main description that appears below the page title with a lighter color.',
  },
};

export const WithTitleRightChildren: Story = {
  args: {
    title: 'Main Page Title',
    description: 'A page header with action buttons.',
    titleRightChildren: <Button variant='contained'>Primary Action</Button>,
  },
};

export const WithCustomContent: Story = {
  args: {
    title: (
      <span
        style={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Custom Styled Title
      </span>
    ),
    description: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#666' }}>Status:</span>
        <span style={{ color: '#4CAF50' }}>Active</span>
      </div>
    ),
    titleRightChildren: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant='outlined'>Secondary</Button>
        <Button variant='contained' color='primary'>
          Primary
        </Button>
      </div>
    ),
  },
};
