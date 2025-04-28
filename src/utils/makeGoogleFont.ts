export const DEFAULT_FONT_FAMILY = 'Lato';
export const DEFAULT_FONT_WEIGHTS = [300, 400, 500, 700, 900];

export const makeGoogleFontUrl = (family: string | undefined) => {
  const url = new URL('https://fonts.googleapis.com/css2');
  url.searchParams.set(
    'family',
    `${family ?? DEFAULT_FONT_FAMILY}:wght@${DEFAULT_FONT_WEIGHTS.join(';')}`,
  );
  url.searchParams.set('display', 'swap');
  return url.toString();
};
