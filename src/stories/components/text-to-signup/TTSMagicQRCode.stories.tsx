import React, { useRef } from 'react';
import { Button, Stack } from '@mui/material';
import { Download } from '@mui/icons-material';

import { TTSMagicQRCode, TTSMagicQRCodeHandle } from '../../../components';

export default {
  title: 'Components/text-to-signup/TTSMagicQRCode',
  component: TTSMagicQRCode,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A magic QR code component that generates downloadable PNG/SVG images of styled QR codes. Use the ref to access the download functionality.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  argTypes: {
    magicLink: {
      control: { type: 'text' },
      description: 'URL that the QR code will encode',
    },
    brandLogo: {
      control: { type: 'text' },
      description:
        'URL of the brand logo to display in the center of the QR code',
    },
  },
};

// Create a template for the component with download functionality
const Template = (args: any) => {
  const qrCodeRef = useRef<TTSMagicQRCodeHandle>(null);

  const handleDownload = (extension: 'png' | 'svg') => {
    const filename = `magic-qr-code-${Date.now()}`;
    qrCodeRef.current?.download(filename, extension);
  };

  return (
    <Stack spacing={3} alignItems='center'>
      <TTSMagicQRCode ref={qrCodeRef} {...args} />
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
  brandLogo: undefined,
};

// With brand logo
export const WithBrandLogo = Template.bind({});
WithBrandLogo.args = {
  magicLink: 'https://www.verified.inc',
  brandLogo: 'https://placehold.co/400',
};
