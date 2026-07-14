import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, ThemeProvider, Typography } from '@mui/material';

import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';
import { getContrastRatio } from '../../utils/color';
import { Button } from '../../components';

// A palette picked the way a brand admin might - for looks, not contrast - so the effect of
// `wcagAAEnabled` is visible. `secondary` and `error` already pass AA and are left untouched;
// `primary` (reusing the shipped `warning` yellow) fails, so both its `main` (against the page
// background) and `contrastText` (against the resulting `main`) get corrected - the fill color
// itself shifts, trading exact brand-hue fidelity for guaranteed readability everywhere `main`
// is read, including outside MUI's styling system entirely. `text.secondary` is overridden to
// `colors.grey` (the same grey the real `neutral` color uses) to demonstrate the fix for plain
// body text on the page background too (no colored box involved).
const riskyPalette = {
  primary: {
    main: colors.yellow,
    light: colors.yellow,
    dark: colors.darkYellow,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.blue,
    light: colors.lightBlue,
    dark: colors.darkBlue,
    contrastText: colors.white,
  },
  error: {
    main: colors.red,
    light: colors.lightRed,
    dark: colors.darkRed,
    contrastText: colors.white,
  },
  text: {
    secondary: colors.grey,
  },
} as const;

const PALETTE_KEYS = ['primary', 'secondary', 'error'] as const;

interface ContrastReportProps {
  wcagAAEnabled: boolean;
}

interface RatioLabelProps {
  ratio: number;
}

function RatioLabel({ ratio }: Readonly<RatioLabelProps>) {
  const passesAA = ratio >= 4.5;
  return (
    <Typography
      variant='body2'
      sx={{ color: passesAA ? 'success.dark' : 'error.main' }}
    >
      {ratio.toFixed(2)}:1 — {passesAA ? 'passes AA' : 'fails AA'}
    </Typography>
  );
}

function ContrastReport({ wcagAAEnabled }: Readonly<ContrastReportProps>) {
  const demoTheme = theme({
    primaryFontFace: { style: { fontFamily: 'sans-serif' } },
    wcagAAEnabled,
    palette: riskyPalette as any,
  });
  const textSecondaryRatio = getContrastRatio(
    demoTheme.palette.text.secondary,
    demoTheme.palette.background.default,
  );

  return (
    <ThemeProvider theme={demoTheme}>
      <Box sx={{ p: 2, minWidth: 280, backgroundColor: 'background.default' }}>
        <Typography variant='overline' color='text.primary'>
          wcagAAEnabled: {String(wcagAAEnabled)}
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          {PALETTE_KEYS.map((key) => {
            const paletteColor = demoTheme.palette[key];
            const ratio = getContrastRatio(
              paletteColor.main,
              paletteColor.contrastText,
            );

            return (
              <Stack key={key} direction='row' spacing={2} alignItems='center'>
                <Button color={key} variant='contained' sx={{ width: 140 }}>
                  {key}
                </Button>
                <RatioLabel ratio={ratio} />
              </Stack>
            );
          })}
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ width: 140 }}
            >
              Secondary text
            </Typography>
            <RatioLabel ratio={textSecondaryRatio} />
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

// The colors this package actually ships in `theme.ts` today - no palette override. Several
// of these already fail AA (primary/success at 2.54:1, warning at 1.48:1, info at 2.23:1,
// neutral/neutralContrast against the page background), which `wcagAAEnabled` corrects.
const FILL_KEYS = [
  'primary',
  'secondary',
  'error',
  'warning',
  'success',
  'info',
] as const;
const FOREGROUND_KEYS = [
  'neutral',
  'neutralContrast',
  'warningContrast',
  'infoContrast',
  'dangerContrast',
] as const;

function RealPaletteReport({ wcagAAEnabled }: Readonly<ContrastReportProps>) {
  const demoTheme = theme({
    primaryFontFace: { style: { fontFamily: 'sans-serif' } },
    wcagAAEnabled,
  });
  const backgroundDefault = demoTheme.palette.background.default;
  const disabledRatio = getContrastRatio(
    demoTheme.palette.text.disabled,
    backgroundDefault,
  );

  return (
    <ThemeProvider theme={demoTheme}>
      <Box sx={{ p: 2, minWidth: 320, backgroundColor: 'background.default' }}>
        <Typography variant='overline' color='text.primary'>
          wcagAAEnabled: {String(wcagAAEnabled)} (real base palette)
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          {FILL_KEYS.map((key) => {
            const paletteColor = demoTheme.palette[key];
            const ratio = getContrastRatio(
              paletteColor.main,
              paletteColor.contrastText,
            );
            return (
              <Stack key={key} direction='row' spacing={2} alignItems='center'>
                <Button color={key} variant='contained' sx={{ width: 160 }}>
                  {key}
                </Button>
                <RatioLabel ratio={ratio} />
              </Stack>
            );
          })}
          {FILL_KEYS.map((key) => {
            const paletteColor = demoTheme.palette[key];
            // `variant="text"` draws `main` directly as the text color, with no
            // `contrastText` pairing involved - so this is checked against the page
            // background instead. When enabled, `main` itself is already the corrected
            // value (see `applyWcagAAContrast`), so no extra handling is needed here.
            const ratio = getContrastRatio(paletteColor.main, backgroundDefault);
            return (
              <Stack
                key={`${key}-text`}
                direction='row'
                spacing={2}
                alignItems='center'
              >
                <Button color={key} variant='text' sx={{ width: 160 }}>
                  {key} (text)
                </Button>
                <RatioLabel ratio={ratio} />
              </Stack>
            );
          })}
          {FOREGROUND_KEYS.map((key) => {
            const paletteColor = (demoTheme.palette as any)[key];
            const ratio = getContrastRatio(paletteColor.main, backgroundDefault);
            return (
              <Stack key={key} direction='row' spacing={2} alignItems='center'>
                <Typography
                  sx={{ width: 160, color: `${key}.main`, fontWeight: 700 }}
                >
                  {key}
                </Typography>
                <RatioLabel ratio={ratio} />
              </Stack>
            );
          })}
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography
              variant='body1'
              color='text.disabled'
              sx={{ width: 160 }}
            >
              Disabled text
            </Typography>
            <RatioLabel ratio={disabledRatio} />
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

const meta = {
  title: 'Styles/WCAG AA Contrast',
  component: ContrastReport,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    wcagAAEnabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ContrastReport>;

export default meta;
type Story = StoryObj<typeof meta>;

// theme({ wcagAAEnabled: false }) - `primary`'s white contrastText fails AA against its
// pale yellow main.
export const Disabled: Story = {
  args: {
    wcagAAEnabled: false,
  },
};

// theme({ wcagAAEnabled: true }) - the same palette, but `primary`'s `main` is darkened
// against the page background, then its `contrastText` is re-checked against the new `main`.
// Colors already compliant are left unchanged.
export const Enabled: Story = {
  args: {
    wcagAAEnabled: true,
  },
};

export const SideBySide: StoryObj = {
  render: () => (
    <Stack direction='row' spacing={4}>
      <ContrastReport wcagAAEnabled={false} />
      <ContrastReport wcagAAEnabled={true} />
    </Stack>
  ),
};

// Same toggle, but against this package's actual `theme()` defaults - no palette override.
// `primary`/`success`/`warning`/`info`/`neutral`/`neutralContrast` currently fail AA; enabling
// the flag corrects them while leaving the already-compliant ones untouched.
export const RealPalette: StoryObj = {
  render: () => (
    <Stack direction='row' spacing={4}>
      <RealPaletteReport wcagAAEnabled={false} />
      <RealPaletteReport wcagAAEnabled={true} />
    </Stack>
  ),
};
