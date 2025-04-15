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
