import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import {
  DiffusiveText,
  defaultDiffusiveTextTiming,
  verifiedMorphFontFamily,
} from '../../../components/animation/DiffusiveText';

import '../../../../fonts/verified-morph.css';

type DemoProps = {
  template: string;
  value: string;
  /** How long the fake request takes before `value` arrives, in ms. */
  latencyMs: number;
  fontSize: number;
  fontWeight: 400 | 700 | 800 | 900;
  /** A width cap, to see a long value wrap. */
  maxWidth: number;
  swapMs: number;
  lockMs: number;
  monoEaseMs: number;
  /** The value is already there when it mounts, so it just shows. */
  loaded: boolean;
};

function Demo({
  template,
  value,
  latencyMs,
  fontSize,
  fontWeight,
  maxWidth,
  swapMs,
  lockMs,
  monoEaseMs,
  loaded,
}: DemoProps): React.ReactElement {
  const [run, setRun] = useState(0);
  const [arrived, setArrived] = useState<string | undefined>(
    loaded ? value : undefined,
  );

  useEffect(() => {
    // Already loaded: the first render shows it, and a replay refetches it at once.
    const timer = setTimeout(() => setArrived(value), loaded ? 0 : latencyMs);
    return () => clearTimeout(timer);
  }, [run, value, latencyMs, loaded]);

  return (
    <Stack sx={{ gap: 2, alignItems: 'flex-start' }}>
      <Typography sx={{ fontSize, fontWeight, lineHeight: 1.2, maxWidth }}>
        <DiffusiveText
          template={template}
          value={arrived}
          fontFamily={verifiedMorphFontFamily}
          timing={{ swapMs, lockMs, monoEaseMs }}
        />
      </Typography>
      <Stack direction='row' sx={{ gap: 2, alignItems: 'center' }}>
        <Button
          variant='outlined'
          size='small'
          onClick={() => {
            setArrived(undefined);
            setRun((r) => r + 1);
          }}
        >
          Replay
        </Button>
        <Box component='span' sx={{ fontSize: 12, color: 'text.secondary' }}>
          {arrived === undefined ? 'Loading…' : 'Arrived'}
        </Box>
      </Stack>
    </Stack>
  );
}

const meta = {
  title: 'Components/Animation/DiffusiveText',
  component: Demo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    latencyMs: { control: { type: 'range', min: 0, max: 6000, step: 100 } },
    fontSize: { control: { type: 'range', min: 12, max: 64, step: 1 } },
    fontWeight: { control: 'inline-radio', options: [400, 700, 800, 900] },
    maxWidth: { control: { type: 'range', min: 120, max: 800, step: 10 } },
    swapMs: { control: { type: 'range', min: 10, max: 200, step: 5 } },
    lockMs: { control: { type: 'range', min: 0, max: 2000, step: 20 } },
    monoEaseMs: { control: { type: 'range', min: 200, max: 6000, step: 100 } },
  },
  args: {
    latencyMs: 1500,
    fontSize: 32,
    fontWeight: 900,
    maxWidth: 560,
    loaded: false,
    ...defaultDiffusiveTextTiming,
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Name: Story = {
  args: { template: 'Xxxxxxx Xxxxxxxx', value: 'Richard Hendricks' },
};

export const DateOfBirth: Story = {
  args: {
    template: '##/##/####',
    value: '08/01/••••',
    fontSize: 20,
    fontWeight: 700,
  },
};

// The template's literal `+1` stays put; only `#` scrambles.
export const Phone: Story = {
  args: {
    template: '+1 (###) ###-####',
    value: '+1 (212) 555-0100',
    fontSize: 20,
    fontWeight: 700,
  },
};

// A placeholder short enough to stay on one line while monospaced; the value then takes its own lines.
export const LongValue: Story = {
  args: {
    template: 'Xxxxxx Xxxxxx Xxxxx',
    value: 'Aviato Health Insurance Of California',
    maxWidth: 380,
  },
};

export const SlowReveal: Story = {
  args: {
    template: 'Xxxxxxx Xxxxxxxx',
    value: 'Richard Hendricks',
    lockMs: 1600,
    monoEaseMs: 4000,
  },
};

export const AlreadyLoaded: Story = {
  args: {
    template: 'Xxxxxxx Xxxxxxxx',
    value: 'Richard Hendricks',
    loaded: true,
  },
};
