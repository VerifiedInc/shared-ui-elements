import tinycolor from 'tinycolor2';

/**
 * Lightens a color.
 * @param color The color to lighten.
 * @param amount The amount to lighten the color.
 * @returns The lightened color.
 */
export const lighten = (color: string, amount: number) => {
  return tinycolor(color).lighten(amount).toHex();
};

/**
 * Darkens a color.
 * @param color The color to darken.
 * @param amount The amount to darken the color.
 * @returns The darkened color.
 */
export const darken = (color: string, amount: number) => {
  return tinycolor(color).darken(amount).toHex();
};

/**
 * Get the color that has the highest contrast with the given color.
 * @param color The color to check.
 * @returns The best color to use for text on the given color.
 */
export const contrastColor = (color: string) => {
  return tinycolor(color).isLight() ? '#000000' : '#FFFFFF';
};
