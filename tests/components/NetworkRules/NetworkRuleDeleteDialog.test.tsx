import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';

import {
  NetworkRuleDeleteDialog,
  NetworkRulesProvider,
  type NetworkRuleDeleteDialogProps,
} from '../../../src/components/NetworkRules';

import { theme } from '../../../src/styles/theme';

import { createServices, rules } from './fixtures';

// The dialogs use the theme's `neutral` color, which the default MUI theme lacks.
const appTheme = theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } });

function renderDialog(props: Partial<NetworkRuleDeleteDialogProps> = {}) {
  const onConfirm = vi.fn();
  const onClose = vi.fn();
  const utils = render(
    <ThemeProvider theme={appTheme}>
      <NetworkRulesProvider services={createServices()}>
        <NetworkRuleDeleteDialog
          open
          rule={rules[0]}
          onConfirm={onConfirm}
          onClose={onClose}
          {...props}
        />
      </NetworkRulesProvider>
    </ThemeProvider>,
  );
  return { ...utils, onConfirm, onClose };
}

afterEach(() => {
  cleanup();
});

describe('<NetworkRuleDeleteDialog/>', () => {
  test('asks to delete the rule and confirms with the rule only', () => {
    const { getByText, getByRole, onConfirm } = renderDialog();

    expect(getByText('Delete rule?')).toBeDefined();
    expect(getByText(/"First rule" and its 3 conditions/)).toBeDefined();

    fireEvent.click(getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledWith(rules[0], undefined);
  });

  test('describes a condition with catalog labels and confirms with its index', async () => {
    const { findByText, getByText, getByRole, onConfirm } = renderDialog({
      conditionIndex: 0,
    });

    expect(getByText('Delete condition?')).toBeDefined();
    // Labels arrive once the catalog query resolves.
    expect(
      await findByText(/"Color equals r, g" will be removed from "First rule"/),
    ).toBeDefined();

    fireEvent.click(getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledWith(rules[0], 0);
  });

  test('cancel closes without confirming; deleting disables both buttons', () => {
    const { getByRole, onClose, onConfirm, rerender } = renderDialog();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();

    rerender(
      <ThemeProvider theme={appTheme}>
        <NetworkRulesProvider services={createServices()}>
          <NetworkRuleDeleteDialog
            open
            rule={rules[0]}
            onConfirm={onConfirm}
            onClose={onClose}
            isDeleting
          />
        </NetworkRulesProvider>
      </ThemeProvider>,
    );
    expect(
      (getByRole('button', { name: 'Delete' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    expect(
      (getByRole('button', { name: 'Cancel' }) as HTMLButtonElement).disabled,
    ).toBe(true);
  });
});
