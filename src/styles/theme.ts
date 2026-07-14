import { createTheme, Theme, ThemeOptions } from '@mui/material';
import { colors } from './colors';
import { typography } from './typography';
import { ensureWcagAAContrast } from '../utils/color';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutralContrast: true;
    warningContrast: true;
    infoContrast: true;
    dangerContrast: true;
  }
}

declare module '@mui/material/styles' {
  // custom palette
  interface Palette {
    neutral: Palette['primary'];
    neutralContrast: Palette['primary'];
    warningContrast: Palette['primary'];
    infoContrast: Palette['primary'];
    dangerContrast: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    neutralContrast: PaletteOptions['primary'];
    warningContrast: PaletteOptions['primary'];
    infoContrast: PaletteOptions['primary'];
    dangerContrast: PaletteOptions['primary'];
  }
}

// add neutral color palette as color option for buttons
declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
    warningContrast: true;
    dangerContrast: true;
  }
  interface SvgIconPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
    warningContrast: true;
    dangerContrast: true;
  }
}

interface ThemeOptionsProps extends ThemeOptions {
  primaryFontFace: Record<string, any>;
  /**
   * When true, adjusts every palette color's `main`/`dark` (and fill colors'
   * `contrastText`) plus `text.primary`/`text.secondary`/`text.disabled` so they meet the
   * WCAG level AA contrast ratio - see `applyWcagAAContrast`. `light` is left untouched, since
   * it's also used as a background/overlay tint. This can shift a color away from its
   * original hue (e.g. a `contained` button's fill, or its hover state), trading exact
   * brand-color fidelity for guaranteed readability everywhere these are used, including
   * direct `theme.palette.x.main`/`.dark` reads in app code that a theme-only fix can't
   * otherwise reach. Off by default to preserve existing palettes.
   */
  wcagAAEnabled?: boolean;
}

/**
 * Checks whether a value is a MUI-style palette color (has a `main` string), covering both
 * fill colors (e.g. `primary`, which also has `contrastText`) and foreground-only accent
 * colors (e.g. `neutral`, `infoContrast`, which don't).
 * @param value The value to check.
 * @returns Whether the value is a palette color.
 */
function isPaletteColor(value: unknown): value is {
  main: string;
  dark?: string;
  contrastText?: string;
} {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).main === 'string'
  );
}

/**
 * Adjusts every palette color's `main`/`dark` in-place so each meets WCAG level AA contrast
 * against the page background - this covers both fill colors (`primary`, `warning`, ...) and
 * foreground-only accent colors (`neutral`, `infoContrast`, ...) alike, since either can be
 * read directly as a text/icon color in both this package's components and consuming apps
 * (not just as a `contained` button's background, or `dark` as its hover background). Fill
 * colors then have their `contrastText` re-checked against the (possibly shifted) `main`.
 * `text.primary`/`text.secondary`/`text.disabled` are adjusted against the page background
 * too.
 *
 * `light` is deliberately left untouched - unlike `main`/`dark`, it's also used as a
 * background/overlay tint (e.g. `alpha(palette.secondary.light, 0.4)` as a `bgcolor`), where
 * shifting it for foreground-safety would just be an unwanted color change with no
 * accessibility benefit.
 *
 * This can shift a color away from its original hue - e.g. a `contained` button's fill color
 * may no longer exactly match the configured brand color - trading color fidelity for
 * guaranteed readability everywhere it's used, including direct `theme.palette.x.main`
 * (or `.dark`) reads in app code that no theme-level component override could otherwise
 * reach.
 * @param builtTheme The theme to adjust.
 * @returns The same theme, with contrast-adjusted colors.
 */
function applyWcagAAContrast(builtTheme: Theme) {
  const { palette } = builtTheme;
  const pageBackground = palette.background.default;

  palette.text.primary = ensureWcagAAContrast(
    palette.text.primary,
    pageBackground,
  );
  palette.text.secondary = ensureWcagAAContrast(
    palette.text.secondary,
    pageBackground,
  );
  palette.text.disabled = ensureWcagAAContrast(
    palette.text.disabled,
    pageBackground,
  );

  Object.values(palette).forEach((paletteColor) => {
    if (isPaletteColor(paletteColor)) {
      paletteColor.main = ensureWcagAAContrast(
        paletteColor.main,
        pageBackground,
      );
      if (typeof paletteColor.dark === 'string') {
        paletteColor.dark = ensureWcagAAContrast(
          paletteColor.dark,
          pageBackground,
        );
      }
      if (typeof paletteColor.contrastText === 'string') {
        paletteColor.contrastText = ensureWcagAAContrast(
          paletteColor.contrastText,
          paletteColor.main,
        );
      }
    }
  });

  return builtTheme;
}

export const theme = ({
  primaryFontFace,
  wcagAAEnabled,
  ...options
}: ThemeOptionsProps) => {
  const builtTheme = createTheme({
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
      dangerContrast: {
        main: colors.dangerContrast,
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
            '&.MuiButton-contained.Mui-focused, &.MuiButton-contained:focus': {
              // Add slight shadow on focus
              boxShadow:
                '0px 3px 5px -1px rgba(0,0,0,0.25),0px 6px 7px 0px rgba(0,0,0,0.18),0px 1px 12px 0px rgba(0,0,0,0.16)',
            },
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
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              fontSize: 20,
              fontWeight: 300,
            },

            '& .MuiInputBase-input:not(.MuiInputBase-inputSizeSmall):not(.MuiAutocomplete-input):not(.MuiInputBase-inputMultiline)':
              {
                paddingTop: 13.625,
                paddingBottom: 13.625,
              },
            '& .MuiInputBase-input.MuiAutocomplete-input:not(.MuiInputBase-inputSizeSmall)':
              {
                paddingTop: 4.625,
                paddingBottom: 4.625,
              },
            '&.MuiInputBase-multiline.MuiInputBase-sizeSmall': {
              paddingRight: '14px!important',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&[data-shrink="false"]': {
              fontSize: 20,
              fontWeight: 300,
              transform: 'translate(14px, 14px) scale(1)',
              // This is to be applied on the component DataFieldLabelText when required.
              '& span[data-asterisk]': {
                display: 'none',
              },
              '&.MuiInputLabel-sizeSmall': {
                transform: 'translate(14px, 9px) scale(1)',
              },
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
          InputLabelProps: {
            shrink: true,
          },
        },
        styleOverrides: {
          root: {
            '& .MuiInputBase-multiline textarea': {
              minHeight: 28.75,
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
          MenuProps: {
            disableScrollLock: true,
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          size: 'medium',
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            wordBreak: 'break-word',
          },
        },
      },
    },
    ...options,
  });

  return wcagAAEnabled ? applyWcagAAContrast(builtTheme) : builtTheme;
};
