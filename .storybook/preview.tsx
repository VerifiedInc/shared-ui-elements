import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  CustomAlertComponent,
  SnackbarProvider,
} from '../src/components/Snackbar';
import { theme } from '../src/styles/theme';
import React from 'react';

import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import '@fontsource/material-icons';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'desktop',
    },
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } }),
      dark: theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } }),
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
  // Add SnackbarProvider to enable snackbar notifications in storybook
  (Story) => (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      Components={{
        customAlertComponent: CustomAlertComponent,
      }}
    >
      <Story />
    </SnackbarProvider>
  ),
];

export default preview;
