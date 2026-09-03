export { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../../src/styles/theme';

export const previewTheme = theme({
  primaryFontFace: { style: { fontFamily: 'Lato' } },
});
