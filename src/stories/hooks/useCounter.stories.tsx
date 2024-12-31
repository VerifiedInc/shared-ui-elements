import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useCounter } from '../../hooks/useCounter';

export default {
  title: 'Hooks/useCounter',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that provides animated counting functionality with customizable duration and value mapping.',
      },
    },
  },
} as Meta;

const DemoComponent = () => {
  const { ref: counterRef1, controls: controls1 } = useCounter({
    from: 0,
    to: 100,
    map: (value) => `${Math.round(value)}%`,
  });

  const { ref: counterRef2, controls: controls2 } = useCounter({
    from: 0,
    to: 1000,
    duration: 2,
    map: (value) => `$${value.toFixed(2).toLocaleString()}`,
  });

  const resetCounters = () => {
    if (!controls1.current || !controls2.current) {
      return;
    }

    controls1.current.pause();
    controls2.current.pause();

    // Re-trigger animations
    controls1.current.time = 0;
    controls2.current.time = 0;

    controls1.current.play();
    controls2.current.play();
  };

  return (
    <Stack spacing={4} sx={{ p: 3 }}>
      <div>
        <Typography variant='h6' gutterBottom>
          useCounter Demo
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          This demo shows two counters with different configurations. Click the
          reset button to restart the animations.
        </Typography>
      </div>

      <Stack spacing={2}>
        <Box>
          <Typography variant='subtitle2' gutterBottom>
            Percentage Counter (1s duration):
          </Typography>
          <Typography ref={counterRef1} variant='h4'>
            0%
          </Typography>
        </Box>

        <Box>
          <Typography variant='subtitle2' gutterBottom>
            Currency Counter (2s duration):
          </Typography>
          <Typography ref={counterRef2} variant='h4'>
            $0
          </Typography>
        </Box>

        <Button
          variant='contained'
          onClick={resetCounters}
          sx={{ width: 'fit-content' }}
        >
          Reset Counters
        </Button>
      </Stack>
    </Stack>
  );
};

export const Default: StoryFn = () => <DemoComponent />;
Default.storyName = 'Default Example';
