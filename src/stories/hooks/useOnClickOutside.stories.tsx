import * as React from 'react';
import { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Box, Paper, Typography } from '@mui/material';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const meta = {
  title: 'Hooks/useOnClickOutside',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

function DemoComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [clickedOutside, setClickedOutside] = useState(false);

  useOnClickOutside(ref, () => {
    setClickedOutside(true);
    // Reset after a short delay
    setTimeout(() => setClickedOutside(false), 1000);
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='body1' sx={{ mb: 2 }}>
        Click outside the box below to see the effect
      </Typography>

      <Paper
        ref={ref}
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: clickedOutside ? '#ffebee' : '#fff',
          transition: 'background-color 0.3s ease',
          cursor: 'pointer',
        }}
      >
        <Typography>
          {clickedOutside ? 'Clicked outside!' : 'Click outside this box'}
        </Typography>
      </Paper>
    </Box>
  );
}

export function Basic() {
  return <DemoComponent />;
}

function MultipleRefsDemoComponent() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [clickedOutside, setClickedOutside] = useState(false);

  useOnClickOutside([ref1, ref2], () => {
    setClickedOutside(true);
    setTimeout(() => setClickedOutside(false), 1000);
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='body1' sx={{ mb: 2 }}>
        Click outside both boxes to see the effect
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Paper
          ref={ref1}
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: clickedOutside ? '#ffebee' : '#fff',
            transition: 'background-color 0.3s ease',
            cursor: 'pointer',
          }}
        >
          <Typography>Box 1</Typography>
        </Paper>

        <Paper
          ref={ref2}
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: clickedOutside ? '#ffebee' : '#fff',
            transition: 'background-color 0.3s ease',
            cursor: 'pointer',
          }}
        >
          <Typography>Box 2</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export function MultipleRefs() {
  return <MultipleRefsDemoComponent />;
}

function CustomEventDemoComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [touchedOutside, setTouchedOutside] = useState(false);

  useOnClickOutside(
    ref,
    () => {
      setTouchedOutside(true);
      setTimeout(() => setTouchedOutside(false), 1000);
    },
    'touchstart',
  );

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='body1' sx={{ mb: 2 }}>
        Touch outside the box to see the effect (mobile only)
      </Typography>

      <Paper
        ref={ref}
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: touchedOutside ? '#ffebee' : '#fff',
          transition: 'background-color 0.3s ease',
          cursor: 'pointer',
        }}
      >
        <Typography>
          {touchedOutside ? 'Touched outside!' : 'Touch outside this box'}
        </Typography>
      </Paper>
    </Box>
  );
}

export function CustomEvent() {
  return <CustomEventDemoComponent />;
}
