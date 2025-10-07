import React, { useRef } from 'react';
import { Button, Stack, Typography, Chip } from '@mui/material';
import { Download } from '@mui/icons-material';

import { TTSMagicButton, TTSMagicButtonHandle } from '../../../components';
import { useGoogleFont } from '../../../hooks';

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
    fontFamily: {
      control: { type: 'text' },
      description:
        'Google Font family name. When set, automatically loads the font from Google Fonts.',
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
  magicLink: 'https://www.verified.inc',
  magicText: 'Text Verified to 20222',
  // fontFamily: 'Rubik',
};
