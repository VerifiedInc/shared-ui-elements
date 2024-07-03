import { createTheme } from '@mui/material';
import * as colors from './colors';

declare module '@mui/material/styles' {
  // custom palette
  interface Palette {
    neutral: Palette['primary'];
    neutralContrast: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    neutralContrast: PaletteOptions['primary'];
  }
}

// add neutral color palette as color option for buttons
declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
  }
  interface SvgIconPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
  }
}

type ThemeOptions = {
  primaryFontFace: Record<string, any>;
};

export const theme = ({ primaryFontFace }: ThemeOptions) =>
  createTheme({
    typography: {
      fontFamily: primaryFontFace.style.fontFamily,
    },
    palette: {
      primary: {
        main: colors.green,
        light: colors.lightGreen,
        dark: colors.darkGreen,
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
      warning: {
        main: colors.yellow,
        light: colors.yellow,
        dark: colors.darkYellow,
        contrastText: colors.white,
      },
      success: {
        main: colors.green,
        light: colors.green,
        dark: colors.darkGreen,
        contrastText: colors.white,
      },
      info: {
        main: colors.blue,
        light: colors.lightBlue,
        dark: colors.darkBlue,
        contrastText: colors.white,
      },
      neutral: {
        main: colors.grey,
        light: colors.lightGrey,
        dark: colors.darkGrey,
      },
      neutralContrast: {
        main: colors.greyContrast,
        light: colors.lightGreyContrast,
        dark: colors.darkGreyContrast,
      },
    },
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 34,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontWeight: 800,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          circular: {
            width: 42,
            height: 42,
          },
          sizeSmall: {
            width: 40,
            height: 40,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 800,
          },
        },
      },
    },
  });
