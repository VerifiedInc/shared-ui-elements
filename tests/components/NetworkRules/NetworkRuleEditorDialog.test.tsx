import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';

import {
  NetworkRuleEditorDialog,
  NetworkRulesProvider,
} from '../../../src/components/NetworkRules';

import { theme } from '../../../src/styles/theme';

import { createServices, rules } from './fixtures';

// The dialogs use the theme's `neutral` color, which the default MUI theme lacks.
const appTheme = theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } });

function renderDialog() {
  const onClose = vi.fn();
  const utils = render(
    <ThemeProvider theme={appTheme}>
      <NetworkRulesProvider services={createServices()}>
        <NetworkRuleEditorDialog
          open
          rule={rules[0]}
          onClose={onClose}
          onSubmit={vi.fn()}
        />
      </NetworkRulesProvider>
    </ThemeProvider>,
  );
  return { ...utils, onClose };
}

afterEach(() => {
  cleanup();
});

describe('<NetworkRuleEditorDialog/>', () => {
  test('closes straight away when nothing changed', async () => {
    const { findByDisplayValue, getByRole, onClose, queryByText } =
      renderDialog();
    await findByDisplayValue('First rule');

    fireEvent.click(getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(queryByText('Discard Changes?')).toBeNull();
  });

  test('asks before discarding unsaved changes', async () => {
    const { findByDisplayValue, getByRole, findByText, queryByText, onClose } =
      renderDialog();
    const name = await findByDisplayValue('First rule');

    fireEvent.change(name, { target: { value: 'Renamed' } });
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    expect(await findByText('Discard Changes?')).toBeDefined();
    expect(onClose).not.toHaveBeenCalled();

    // Keep editing: the guard closes, the editor stays.
    fireEvent.click(getByRole('button', { name: 'Keep editing' }));
    await waitFor(() => {
      expect(queryByText('Discard Changes?')).toBeNull();
    });
    expect(onClose).not.toHaveBeenCalled();

    // Discard: the editor closes.
    fireEvent.click(getByRole('button', { name: 'Cancel' }));
    fireEvent.click(await findByText('Discard'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
