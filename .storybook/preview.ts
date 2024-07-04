import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../src/styles/theme';

import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
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
      defaultViewport: 'iphone14promax',
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
];

export default preview;
