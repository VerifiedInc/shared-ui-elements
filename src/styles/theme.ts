import { createTheme } from '@mui/material';
import { colors } from './colors';
import { typography } from './typography';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutralContrast: true;
    warningContrast: true;
    infoContrast: true;
  }
}

declare module '@mui/material/styles' {
  // custom palette
  interface Palette {
    neutral: Palette['primary'];
    neutralContrast: Palette['primary'];
    warningContrast: Palette['primary'];
    infoContrast: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    neutralContrast: PaletteOptions['primary'];
    warningContrast: PaletteOptions['primary'];
    infoContrast: PaletteOptions['primary'];
  }
}

// add neutral color palette as color option for buttons
declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
    warningContrast: true;
  }
  interface SvgIconPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
    warningContrast: true;
  }
}

interface ThemeOptions {
  primaryFontFace: Record<string, any>;
}

export const theme = ({ primaryFontFace }: ThemeOptions) =>
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: primaryFontFace.style.fontFamily,
      ...typography,
    },
    palette: {
      text: {
        disabled: colors.textDisabled,
      },
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
        contrastText: colors.infoContrast,
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
      // We can register custom color to our palette with the augmentColor method.
      warningContrast: {
        main: colors.warningContrast,
      },
      infoContrast: {
        main: colors.infoContrast,
      },
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          action: {
            // the action wrapper is pretty narrow (only fits about 5 characters of text) and the default is to wrap the text, which looks really bad
            overflowWrap: 'normal',
            // we want the action text, element, etc to be vertically centered if there are multiple lines of text in the alert body
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
            marginRight: 0,
            '& button, & a': {
              lineHeight: '0',
            },
          },
        },
      },
      MuiAlertTitle: {
        styleOverrides: {
          root: {
            ...typography.body2,
            fontSize: '1.1rem',
            fontWeight: 700,
          },
        },
      },
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
            fontSize: '1rem',
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
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          size: 'medium',
        },
      },
    },
  });
