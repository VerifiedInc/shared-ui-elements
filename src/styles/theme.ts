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

interface ThemeOptions {
  primaryFontFace: Record<string, any>;
}

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
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              svg: {
                opacity: 0.4,
              },
            },
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
      MuiDialog: {
        defaultProps: {
          maxWidth: 'xs',
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: 20,
            fontWeight: 800,
            textAlign: 'center',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: '8px!important',
            paddingBottom: 8,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 24,
            justifyContent: 'space-between',
            '& .MuiButton-root': {
              marginTop: 0,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            maxWidth: '339px',
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              color: `${colors.grey} !important`,
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '& th.MuiTableCell-root': {
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
            },
            '& td.MuiTableCell-root': {
              fontSize: 20,
              fontWeight: 300,
            },
          },
        },
      },
    },
  });
