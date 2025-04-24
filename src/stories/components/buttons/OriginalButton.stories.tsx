import type { Meta, StoryObj } from '@storybook/react';
import { OriginalButton } from '../../../components/buttons';
import { Box } from '@mui/material';

const meta = {
  title: 'Components/buttons/OriginalButton',
  component: OriginalButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OriginalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    children: 'Error Button',
    color: 'error',
  },
};

export const GrayVariant: Story = {
  args: {
    children: 'Gray Button',
    newVariant: 'gray',
  },
};

export const TextVariant: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const OutlinedVariant: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
  },
};

export const SmallSize: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};

export const WithExternalLink: Story = {
  args: {
    children: 'External Link Button',
    href: 'https://verified.inc',
    target: '_blank',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <OriginalButton>Default Button</OriginalButton>
      <OriginalButton disabled>Disabled Button</OriginalButton>
      <OriginalButton color='error'>Error Button</OriginalButton>
      <OriginalButton newVariant='gray'>Gray Button</OriginalButton>
      <OriginalButton variant='text'>Text Button</OriginalButton>
      <OriginalButton variant='outlined'>Outlined Button</OriginalButton>
      <OriginalButton size='small'>Small Button</OriginalButton>
    </Box>
  ),
};
