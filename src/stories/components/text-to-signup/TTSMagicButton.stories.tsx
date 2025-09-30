import React, { useRef } from 'react';
import { Button, Stack } from '@mui/material';
import { Download } from '@mui/icons-material';

import { TTSMagicButton, TTSMagicButtonHandle } from '../../../components';

export default {
  title: 'Components/text-to-signup/TTSMagicButton',
  component: TTSMagicButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A magic button component that generates downloadable PNG/SVG images of the button. Use the ref to access the download functionality.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color of the magic button',
    },
    borderRadius: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
      description: 'Border radius of the button in pixels',
    },
    fontFamily: {
      control: { type: 'select' },
      options: ['Lato'],
      description: 'Font family for the button text',
    },
    magicLink: {
      control: { type: 'text' },
      description: 'URL that the button links to',
    },
    magicText: {
      control: { type: 'text' },
      description: 'Text displayed on the button',
    },
    enablePoweredByVerified: {
      control: { type: 'boolean' },
      description: 'Whether to display the Powered by Verified logo',
    },
  },
};

// Create a template for the component with download functionality
const Template = (args: any) => {
  const buttonRef = useRef<TTSMagicButtonHandle>(null);

  const handleDownload = (extension: 'png' | 'svg') => {
    buttonRef.current?.download(extension);
  };

  return (
    <Stack spacing={3} alignItems='center'>
      <TTSMagicButton ref={buttonRef} {...args} />
      <Stack direction='row' spacing={2}>
        <Button
          variant='outlined'
          startIcon={<Download />}
          onClick={() => handleDownload('png')}
          size='small'
        >
          Download PNG
        </Button>
        <Button
          variant='outlined'
          startIcon={<Download />}
          onClick={() => handleDownload('svg')}
          size='small'
        >
          Download SVG
        </Button>
      </Stack>
    </Stack>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  backgroundColor: '#0DBC3D',
  borderRadius: 8,
  fontFamily: 'Lato',
  magicLink: 'https://www.verified.inc',
  magicText: 'Text Verified to 20222',
};
