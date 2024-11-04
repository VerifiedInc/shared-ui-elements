import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';

import { QRCodeDisplay } from '../../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/QRCodeDisplay',
  component: QRCodeDisplay,
  render: (args: any) => (
    <Box width={300} mx='auto'>
      <QRCodeDisplay {...args} />
    </Box>
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component:
          'Component that displays a QR code with a logo in the center.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    asset: {
      type: 'string',
      description: 'Asset url to be loaded within the logo of the QR code.',
    },
    data: {
      type: 'string',
      description: 'Data string contained within the QR code.',
    },
    svgSize: {
      type: 'number',
      description: 'Size of the SVG element.',
    },
    logoSize: {
      type: 'number',
      description: 'Size of the logo within the QR code.',
    },
    fill: {
      type: 'string',
      description: 'Fill color of the QR code squares.',
    },
  },
} satisfies Meta<typeof QRCodeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: 'Some text encoded within a QR code.',
    asset: undefined,
  },
};
