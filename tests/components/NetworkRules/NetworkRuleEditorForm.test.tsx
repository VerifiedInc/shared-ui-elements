import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';

import {
  NetworkRuleEditorForm,
  NetworkRulesProvider,
  type NetworkRuleEditorFormProps,
} from '../../../src/components/NetworkRules';

import { createServices, rules } from './fixtures';

function renderForm(props: Partial<NetworkRuleEditorFormProps> = {}) {
  const onSubmit = vi.fn();
  const utils = render(
    <NetworkRulesProvider services={createServices()}>
      <NetworkRuleEditorForm onSubmit={onSubmit} {...props} />
    </NetworkRulesProvider>,
  );
  return { ...utils, onSubmit };
}

/** Opens a MUI Select (role=combobox) and picks the option with the given name. */
async function pickSelectOption(
  select: HTMLElement,
  optionName: string | RegExp,
): Promise<void> {
  fireEvent.mouseDown(select);
  const listbox = await waitFor(() => {
    const element = document.body.querySelector('[role="listbox"]');
    if (!element) throw new Error('listbox not open');
    return element as HTMLElement;
  });
  fireEvent.click(within(listbox).getByRole('option', { name: optionName }));
}

afterEach(() => {
  cleanup();
});

describe('<NetworkRuleEditorForm/>', () => {
  test('renders fields from the catalog and starts with one empty condition', async () => {
    const { findByLabelText, getByRole, getAllByRole } = renderForm();

    expect(await findByLabelText(/rule name/i)).toBeDefined();
    expect(getByRole('combobox', { name: /status/i })).toBeDefined();
    expect(getByRole('combobox', { name: /^key/i })).toBeDefined();
    expect(getByRole('button', { name: 'Add Condition' })).toBeDefined();
    expect(getAllByRole('button', { name: /remove condition/i })).toHaveLength(
      1,
    );
  });

  test('blocks submit on shape errors and shows the messages', async () => {
    const { findByLabelText, getByRole, findByText, onSubmit } = renderForm();
    await findByLabelText(/rule name/i);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    expect(await findByText('Rule name is required')).toBeDefined();
    expect(await findByText('Select a status')).toBeDefined();
    expect(await findByText('Select a key')).toBeDefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('filters operators by key and switches the values input by key shape', async () => {
    const { findByLabelText, getByRole, getByPlaceholderText } = renderForm();
    await findByLabelText(/rule name/i);

    // Before a key is chosen the values input is a disabled placeholder.
    expect(getByPlaceholderText('Select a key first')).toBeDefined();

    // Inline-options key → pick-list.
    await pickSelectOption(getByRole('combobox', { name: /^key/i }), 'Color');
    const operator = getByRole('combobox', { name: /operator/i });
    fireEvent.mouseDown(operator);
    const listbox = await waitFor(() => {
      const element = document.body.querySelector('[role="listbox"]');
      if (!element) throw new Error('listbox not open');
      return element as HTMLElement;
    });
    const options = within(listbox)
      .getAllByRole('option')
      .map((option) => option.textContent);
    expect(options).toEqual(['equals', 'is exactly']);
    fireEvent.click(within(listbox).getByRole('option', { name: 'equals' }));
    expect(getByPlaceholderText('Select…')).toBeDefined();

    // Free-text key → chips input, and the operator resets to the only allowed one.
    await pickSelectOption(
      getByRole('combobox', { name: /^key/i }),
      'Free Text',
    );
    expect(getByPlaceholderText('Type a value and press Enter')).toBeDefined();
  });

  test('submits normalized values', async () => {
    const { findByLabelText, getByRole, getByLabelText, onSubmit } =
      renderForm();
    const name = await findByLabelText(/rule name/i);

    fireEvent.change(name, { target: { value: '  My rule ' } });
    await pickSelectOption(
      getByRole('combobox', { name: /status/i }),
      'In Network',
    );
    await pickSelectOption(
      getByRole('combobox', { name: /^key/i }),
      'Free Text',
    );
    await pickSelectOption(
      getByRole('combobox', { name: /operator/i }),
      'includes',
    );

    const values = getByLabelText(/^values/i);
    fireEvent.change(values, { target: { value: 'PPO' } });
    fireEvent.keyDown(values, { key: 'Enter' });
    fireEvent.change(values, { target: { value: 'ppo' } });
    fireEvent.keyDown(values, { key: 'Enter' });
    fireEvent.change(values, { target: { value: 'EPO' } });
    fireEvent.keyDown(values, { key: 'Enter' });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: 'My rule',
        status: 'IN_NETWORK',
        notes: null,
        enabled: true,
        startDate: null,
        endDate: null,
        conditions: [{ key: 'text', operator: 'HAS', value: ['PPO', 'EPO'] }],
      },
      { newNotePresets: [] },
    );
  });

  test('keeps a new note preset in the form and hands it back on submit', async () => {
    const { findByLabelText, getByRole, findByText, onSubmit } = renderForm({
      rule: rules[0],
      notePresets: ['Existing preset'],
      canCreateNotePresets: true,
    });

    const notes = await findByLabelText('Notes');
    fireEvent.change(notes, { target: { value: 'Brand new preset' } });
    fireEvent.click(await findByText('Add "Brand new preset" as a preset'));

    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit.mock.calls[0][0].notes).toBe('Brand new preset');
    expect(onSubmit.mock.calls[0][1]).toEqual({
      newNotePresets: ['Brand new preset'],
    });
  });

  test('loads an existing rule and surfaces server errors by condition index', async () => {
    const { findByDisplayValue, findByText, getAllByRole } = renderForm({
      rule: rules[0],
      serverErrors: [
        { index: 1, code: 'UNKNOWN_ENUM_VALUE', message: 'Bad remote value' },
        { code: 'DUPLICATE_CONDITIONS', message: 'Duplicate of another rule' },
      ],
    });

    expect(await findByDisplayValue('First rule')).toBeDefined();
    expect(getAllByRole('button', { name: /remove condition/i })).toHaveLength(
      3,
    );
    expect(await findByText('Bad remote value')).toBeDefined();
    expect(await findByText('Duplicate of another rule')).toBeDefined();
  });

  test('appendEmptyCondition adds a row to an existing rule', async () => {
    const { findByDisplayValue, getAllByRole } = renderForm({
      rule: rules[0],
      appendEmptyCondition: true,
    });
    await findByDisplayValue('First rule');
    expect(getAllByRole('button', { name: /remove condition/i })).toHaveLength(
      4,
    );
  });
});
