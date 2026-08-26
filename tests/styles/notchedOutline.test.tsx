import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Autocomplete, TextField, ThemeProvider } from '@mui/material';

import { theme } from '../../src/styles/theme';

const appTheme = theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } });

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={appTheme}>{ui}</ThemeProvider>);

// The label floats when MUI marks it shrunk; the outline is notched when the legend is
// allowed to take up width in the fieldset's top border. If the first happens without the
// second, the border is drawn through the label text.
const labelFloats = (container: HTMLElement) =>
  container.querySelector('label')?.getAttribute('data-shrink') === 'true';

const outlineIsNotched = (container: HTMLElement) => {
  const legend = container.querySelector('fieldset > legend');
  return legend ? getComputedStyle(legend).maxWidth === '100%' : false;
};

describe('outlined inputs', () => {
  // The theme floats every label unconditionally, so the notch has to follow it
  // unconditionally too - MUI would otherwise leave it closed until the field is focused,
  // filled, or carries a start adornment.
  test.each([
    ['an empty text field', <TextField key='text' label='Customer' />],
    [
      'an empty autocomplete',
      <Autocomplete
        key='auto'
        options={[]}
        renderInput={(params) => <TextField {...params} label='Customer' />}
      />,
    ],
    [
      'a filled text field',
      <TextField key='filled' label='Customer' value='Acme' />,
    ],
  ])('notches the outline for %s', (_name, ui) => {
    const { container } = renderWithTheme(ui);

    expect(labelFloats(container)).toBe(true);
    expect(outlineIsNotched(container)).toBe(true);
  });

  test('leaves the notch closed for a field that opts out of floating', () => {
    const { container } = renderWithTheme(
      <TextField label='Customer' InputLabelProps={{ shrink: false }} />,
    );

    expect(labelFloats(container)).toBe(false);
    expect(outlineIsNotched(container)).toBe(false);
  });
});
