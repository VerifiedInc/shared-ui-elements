import tinycolor from 'tinycolor2';

/**
 * Lightens a color.
 * @param color The color to lighten.
 * @param amount The amount to lighten the color.
 * @returns The lightened color.
 */
export const lighten = (color: string, amount: number) => {
  return tinycolor(color).lighten(amount).toHexString();
};

/**
 * Darkens a color.
 * @param color The color to darken.
 * @param amount The amount to darken the color.
 * @returns The darkened color.
 */
export const darken = (color: string, amount: number) => {
  return tinycolor(color).darken(amount).toHexString();
};

/**
 * Sets the alpha channel of a color.
 * @param color The color to modify.
 * @param amount The amount to set the alpha channel to.
 * @returns The color with the alpha channel set.
 */
export const alpha = (color: string, amount: number) => {
  return tinycolor(color).setAlpha(amount).toHex8String();
};

/**
 * Get the color that has the highest contrast with the given color.
 * @param color The color to check.
 * @returns The best color to use for text on the given color.
 */
export const contrastColor = (color: string, alpha: number = 1) => {
  return tinycolor(tinycolor(color).isLight() ? '#000000' : '#ffffff')
    .setAlpha(alpha)
    .toHex8String();
};

/**
 * Mixes two colors together.
 * @param color1 The first color.
 * @param color2 The second color.
 * @param amount How much of `color2` to mix in (0 = all color1, 100 = all color2).
 * @returns The blended color.
 */
export const mix = (color1: string, color2: string, amount: number) => {
  return tinycolor.mix(color1, color2, amount).toHexString();
};

/**
 * Resolves how a (possibly semi-transparent) color actually renders on top of `background`,
 * so contrast can be measured against what's visibly on screen rather than the raw color
 * (e.g. MUI's default `text.secondary` is `rgba(0,0,0,0.6)`, which is much lighter than
 * black once composited over a background).
 * @param color The color to resolve, which may have an alpha channel.
 * @param background The color it's rendered on top of.
 * @returns The equivalent fully opaque color.
 */
const flattenOverBackground = (color: string, background: string) => {
  const parsedColor = tinycolor(color);
  const alphaValue = parsedColor.getAlpha();
  if (alphaValue >= 1) {
    return parsedColor.toHexString();
  }
  return mix(
    background,
    parsedColor.setAlpha(1).toHexString(),
    alphaValue * 100,
  );
};

/**
 * Gets the WCAG contrast ratio between two colors, compositing away any alpha channel first
 * (each color is flattened over the other) so translucent colors - e.g. MUI's default
 * `rgba(0,0,0,0.6)` `text.secondary` - are measured as they actually render, not as if opaque.
 * @param color1 The first color, which may have an alpha channel.
 * @param color2 The second color, which may have an alpha channel.
 * @returns A ratio from 1 (no contrast) to 21 (max contrast, black on white).
 */
export const getContrastRatio = (color1: string, color2: string) => {
  return tinycolor.readability(
    flattenOverBackground(color1, color2),
    flattenOverBackground(color2, color1),
  );
};

/**
 * Checks whether a foreground/background pair meets the WCAG 2 level AA contrast requirement
 * (4.5:1, or 3:1 for large-scale text).
 * @param foreground The foreground (e.g. text) color.
 * @param background The background color it's shown against.
 * @param isLargeText Large-scale text (18pt+, or bold 14pt+) only needs a 3:1 ratio.
 * @returns Whether the pair meets WCAG level AA.
 */
export const meetsWcagAA = (
  foreground: string,
  background: string,
  isLargeText: boolean = false,
) => {
  return getContrastRatio(foreground, background) >= (isLargeText ? 3 : 4.5);
};

/**
 * Adjusts `foreground` towards whichever of black or white contrasts better with `background`,
 * until the pair meets the WCAG level AA contrast ratio. Returned unchanged if it already
 * meets AA (this includes pure black/white already paired with a contrasting background, and
 * semi-transparent colors like MUI's default `text.secondary` that are already readable once
 * composited over `background`).
 * @param foreground The color to make readable against `background`. May be semi-transparent.
 * @param background The color `foreground` is shown against.
 * @param isLargeText Large-scale text (18pt+, or bold 14pt+) only needs a 3:1 ratio.
 * @returns `foreground` unchanged if it already meets AA, otherwise an opaque
 * darkened/lightened color that does.
 */
export const ensureWcagAAContrast = (
  foreground: string,
  background: string,
  isLargeText: boolean = false,
) => {
  if (meetsWcagAA(foreground, background, isLargeText)) {
    return foreground;
  }

  const effectiveForeground = flattenOverBackground(foreground, background);
  const preferBlack =
    getContrastRatio('#000000', background) >=
    getContrastRatio('#ffffff', background);

  for (let amount = 5; amount <= 100; amount += 5) {
    const adjusted = preferBlack
      ? darken(effectiveForeground, amount)
      : lighten(effectiveForeground, amount);
    if (meetsWcagAA(adjusted, background, isLargeText)) {
      return adjusted;
    }
  }

  return preferBlack ? '#000000' : '#ffffff';
};

/**
 * Get the color theme from a primary color. Used in the demo.
 * @param primaryColor The primary color.
 * @returns The color theme.
 */
export const getThemeFromPrimaryColor = (primaryColor: string) => {
  return {
    light: tinycolor(primaryColor).lighten(20).toString(),
    main: primaryColor,
    dark: tinycolor(primaryColor).darken(20).toString(),
  };
};
