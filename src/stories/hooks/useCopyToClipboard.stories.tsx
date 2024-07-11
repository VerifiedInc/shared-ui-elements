import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/Button';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

// Render to test the hook implementation.
function HookRender(props: any): ReactElement {
  const copyToClipboard = useCopyToClipboard({ type: 'text/plain' });
  return (
    <Button
      onClick={() => {
        copyToClipboard
          .copy(props.content as string)
          .then(() => undefined)
          .catch(() => undefined);
      }}
    >
      Copy
    </Button>
  );
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Hooks/useCopyToClipboard',
  component: HookRender,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TextPlain: Story = {
  args: {
    content: 'Clicked!',
  },
};
