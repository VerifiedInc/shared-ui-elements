import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import {
  NetworkRuleEditorDialog,
  NetworkRulesProvider,
} from '../../../src/components/NetworkRules';

import { createServices, rules } from './fixtures';

function renderDialog() {
  const onClose = vi.fn();
  const utils = render(
    <NetworkRulesProvider services={createServices()}>
      <NetworkRuleEditorDialog
        open
        rule={rules[0]}
        onClose={onClose}
        onSubmit={vi.fn()}
      />
    </NetworkRulesProvider>,
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

  test('titles itself for adding a condition', async () => {
    const { findByText } = render(
      <NetworkRulesProvider services={createServices()}>
        <NetworkRuleEditorDialog
          open
          rule={rules[0]}
          appendEmptyCondition
          onClose={vi.fn()}
          onSubmit={vi.fn()}
        />
      </NetworkRulesProvider>,
    );
    expect(await findByText('Add Condition', { selector: 'h2' })).toBeDefined();
  });
});
