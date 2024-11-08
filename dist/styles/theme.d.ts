declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
        neutralContrast: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
        neutralContrast: PaletteOptions['primary'];
    }
}
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
export declare const theme: ({ primaryFontFace }: ThemeOptions) => import('@mui/material').Theme;
export {};
