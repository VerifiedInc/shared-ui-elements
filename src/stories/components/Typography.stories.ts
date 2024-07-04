import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../../components/Typography';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    align: {
      options: ['center', 'inherit', 'justify', 'left', 'right'],
      control: { type: 'radio' },
      description: 'Set the text-align on the component.',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    variant: {
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
      ],
      control: { type: 'radio' },
      description: 'Applies the theme typography styles.',
      table: {
        defaultValue: { summary: 'body1' },
      },
    },
    children: {
      description: 'The content of the component.',
      type: 'string',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const Heading5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 5',
  },
};

export const Heading6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 6',
  },
};

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1',
  },
};

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'Subtitle 2',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2',
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
    children: 'Button',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'Overline',
  },
};
