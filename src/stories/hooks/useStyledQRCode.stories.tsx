import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useStyledQRCode } from '../../hooks/useStyledQRCode';

export default {
  title: 'Hooks/useStyledQRCode',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that generates a styled QR code with customizable options.',
      },
    },
  },
} as Meta;

const BasicQRCodeDemo = () => {
  const [data, setData] = useState('https://verified.inc');
  const { Component } = useStyledQRCode({
    options: {
      data,
      width: 200,
      height: 200,
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Basic QR Code Demo</h3>
        <p>A simple QR code generated with default styling options.</p>
      </div>

      <TextField
        label='QR Code Data'
        value={data}
        onChange={(e) => setData(e.target.value)}
        fullWidth
        margin='normal'
        variant='outlined'
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Component />
      </Box>
    </Box>
  );
};

const CustomizedQRCodeDemo = () => {
  const [data, setData] = useState('https://verified.inc');
  const [dotColor, setDotColor] = useState('#4267b2');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotType, setDotType] = useState<
    'rounded' | 'dots' | 'classy' | 'square'
  >('rounded');

  const { Component } = useStyledQRCode({
    options: {
      data,
      width: 300,
      height: 300,
      image:
        'https://cdn.prod.website-files.com/639c99568848490eb3265dae/644c28118efa8d305e38a0b1_Verified%20Inc.%20Logo%20(icon%2C%20green%2C%20white%20check%2C%20white%20circle%20background).webp',
      imageOptions: {
        margin: 6,
      },
      dotsOptions: {
        color: dotColor,
        type: dotType,
      },
      backgroundOptions: {
        color: bgColor,
      },
    },
  });

  const dotTypes = ['rounded', 'dots', 'classy', 'square'];

  return (
    <Box sx={{ p: 3 }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Customized QR Code Demo</h3>
        <p>A QR code with customizable styling options and an embedded logo.</p>
      </div>

      <Stack spacing={2}>
        <TextField
          label='QR Code Data'
          value={data}
          onChange={(e) => setData(e.target.value)}
          fullWidth
          variant='outlined'
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label='Dot Color'
            type='color'
            value={dotColor}
            onChange={(e) => setDotColor(e.target.value)}
            sx={{ width: '50%' }}
          />
          <TextField
            label='Background Color'
            type='color'
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            sx={{ width: '50%' }}
          />
        </Box>

        <Box>
          <p>Dot Type:</p>
          <Stack direction='row' spacing={1}>
            {dotTypes.map((type) => (
              <Button
                key={type}
                variant={dotType === type ? 'contained' : 'outlined'}
                onClick={() => setDotType(type as any)}
              >
                {type}
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Component />
      </Box>
    </Box>
  );
};

export const Basic: StoryFn = () => <BasicQRCodeDemo />;
Basic.storyName = 'Basic Usage';

export const Customized: StoryFn = () => <CustomizedQRCodeDemo />;
Customized.storyName = 'Customized QR Code';
