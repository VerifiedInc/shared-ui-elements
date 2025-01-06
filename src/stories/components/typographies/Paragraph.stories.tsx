import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../../../components/typographies/Paragraph';

const meta = {
  title: 'Components/typographies/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'This is a paragraph of text that demonstrates the Paragraph component. It handles word breaks and maintains consistent styling.',
  },
};

export const ShortText: Story = {
  args: {
    children: 'Short paragraph text.',
  },
};

export const WithCustomColor: Story = {
  args: {
    children: 'Custom colored paragraph text.',
    sx: { color: 'primary.main' },
  },
};

export const LeftAligned: Story = {
  args: {
    children:
      'This paragraph is aligned to the left instead of being centered.',
    textAlign: 'left',
  },
};
