## Using this design system

**Wrapping is required.** Every component needs the real provider chain — without it, MUI falls back to its own factory defaults (unthemed blue buttons, default fonts) instead of this system's look:

```jsx
<ThemeProvider theme={theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } })}>
  <CssBaseline>
    <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
      {children}
    </SnackbarProvider>
  </CssBaseline>
</ThemeProvider>
```

`theme()` and `ThemeProvider`/`CssBaseline` come from MUI (`@mui/material`); `theme` itself and `SnackbarProvider` are this package's own exports. `CssBaseline` is not optional — it resets native browser control styling (buttons, form fields) to inherit the theme instead of the browser default.

**Styling idiom: MUI + Emotion (CSS-in-JS), not utility classes.** Components take an `sx` prop (MUI's styling prop, e.g. `sx={{ mt: 2, p: 1.5 }}`) and standard MUI variant/color props (`variant="contained"`, `color="primary"`), never Tailwind-style class names. Compose new layout with MUI primitives (`Box`, `Stack`) the same way.

**Color: `color` props map through this theme's palette, not MUI's stock one.**

| Palette key | Hex | Typical use |
|---|---|---|
| `primary` | `#0dbc3d` (green) | main brand actions, CTAs |
| `secondary` | `#164fd6` (blue) | secondary actions |
| `error` | `#eb0d28` (red) | destructive/error states |
| `warning` | `#F5D328` (yellow) | warnings |
| `success` | `#0dbc3d` (green) | success states |
| `neutral`, `neutralContrast`, `warningContrast`, `infoContrast`, `dangerContrast` | — | custom additions beyond MUI's stock palette, for contrast-safe text/icons on colored surfaces |

So `color="primary"` on a `Button` renders **green**, not MUI's default blue — always reference the theme's palette (`color="primary"`, `color="secondary"`, etc.), never a hardcoded hex, and never assume MUI's stock defaults.

**Where the truth lives:** the theme source is `theme.ts` (light-weight — call `theme({ primaryFontFace })` to build a full MUI theme object); colors resolve from `colors.ts`. Every component ships its own `.d.ts` (prop types) and `.prompt.md` (usage guidance) alongside its bundled preview.

**Build example** (a themed CTA, matching a verified preview):

```jsx
<ThemeProvider theme={theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } })}>
  <CssBaseline>
    <Button variant="contained" color="primary" size="large">
      Get started
    </Button>
  </CssBaseline>
</ThemeProvider>
```
