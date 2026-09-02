import * as React from 'react';
import { Box } from '@mui/material';
import { PoweredByVerified } from '@verifiedinc-public/shared-ui-elements';

// Mirrors src/stories/components/components/PoweredByVerified.stories.tsx
// (src/stories/components/PoweredByVerified.stories.tsx). The `white` and
// `whiteGreen` variants render white/near-white text+icon strokes — the
// story makes them visible via `parameters.backgrounds.default = 'dark'`
// (Storybook's backgrounds addon paints the canvas dark). That addon isn't
// part of the render tree the converter replays, so the generated preview
// rendered those two variants on the page's plain white background and they
// went invisible. Reproduced here with an explicit dark wrapper matching
// Storybook addon-backgrounds' default "dark" swatch (#333333).
export const Default = () => (
  <PoweredByVerified variant='default' containerProps={{}} />
);

export const Green = () => <PoweredByVerified variant='green' containerProps={{}} />;

export const Gray = () => <PoweredByVerified variant='gray' containerProps={{}} />;

export const White = () => (
  <Box sx={{ bgcolor: '#333333', p: 2, display: 'inline-flex' }}>
    <PoweredByVerified variant='white' containerProps={{}} />
  </Box>
);

export const Black = () => <PoweredByVerified variant='black' containerProps={{}} />;

export const WhiteGreen = () => (
  <Box sx={{ bgcolor: '#333333', p: 2, display: 'inline-flex' }}>
    <PoweredByVerified variant='whiteGreen' containerProps={{}} />
  </Box>
);

export const BlackGreen = () => (
  <PoweredByVerified variant='blackGreen' containerProps={{}} />
);
