import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { ThemeProvider } from '@mui/material';

import {
  NETWORK_RULE_METADATA_PRESET_FIELDS,
  NetworkRuleEditorForm,
  NetworkRulesProvider,
  type NetworkRuleCatalog,
  type NetworkRuleEditorFormProps,
  type NetworkRulePresetRename,
  type NetworkRulePresets,
  type NetworkRulesServices,
} from '../../../src/components/NetworkRules';

import { theme } from '../../../src/styles/theme';

import { catalog, createServices, rules } from './fixtures';

// The preset dialogs use the theme's `neutral` color, which the default MUI theme lacks.
const appTheme = theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } });

const metadataCatalog: NetworkRuleCatalog = {
  ...catalog,
  notePresets: ['Existing preset', 'Other preset'],
  metadata: {
    types: ['string', 'number', 'boolean'],
    limits: { maxEntries: 20, maxKeyLength: 64, maxValueLength: 200 },
    keyPresets: ['tier'],
    valuePresets: ['Gold'],
  },
};

/** `base` with the given fields' lists swapped, as core serves a patched brand. */
function applyPresets(
  base: NetworkRuleCatalog,
  presets: NetworkRulePresets,
): NetworkRuleCatalog {
  const next: NetworkRuleCatalog = { ...base, keys: [...base.keys] };
  for (const [field, list] of Object.entries(presets)) {
    if (field === 'notes') {
      next.notePresets = list;
    } else if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.key) {
      if (next.metadata) next.metadata = { ...next.metadata, keyPresets: list };
    } else if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.value) {
      if (next.metadata) {
        next.metadata = { ...next.metadata, valuePresets: list };
      }
    } else {
      next.keys = next.keys.map((definition) =>
        definition.key === field
          ? { ...definition, presets: list }
          : definition,
      );
    }
  }
  return next;
}

/**
 * An in-memory brand: the catalog serves whatever was last stored. `withRename` adds the host's
 * own rename, which is what lets the edit dialog offer to change rules too.
 */
function createPresetStore(
  base: NetworkRuleCatalog = metadataCatalog,
  { withRename = false } = {},
) {
  let current = base;
  const updatePresets = vi.fn(async (presets: NetworkRulePresets) => {
    current = applyPresets(current, presets);
  });
  const renamePreset = vi.fn(
    async ({ field, presets }: NetworkRulePresetRename) => {
      current = applyPresets(current, { [field]: presets });
    },
  );
  const getCatalog = vi.fn(async () => current);
  return withRename
    ? { updatePresets, renamePreset, getCatalog }
    : { updatePresets, getCatalog };
}

function renderForm(
  services: Partial<NetworkRulesServices>,
  props: Partial<NetworkRuleEditorFormProps> = {},
) {
  const onSubmit = vi.fn();
  const utils = render(
    <ThemeProvider theme={appTheme}>
      <NetworkRulesProvider services={createServices(services)}>
        <NetworkRuleEditorForm
          rule={rules[0]}
          canCreatePresets
          onSubmit={onSubmit}
          {...props}
        />
      </NetworkRulesProvider>
    </ThemeProvider>,
  );
  return { ...utils, onSubmit };
}

/** The dropdown row (`li`) that shows `text`. */
function rowOf(element: HTMLElement): HTMLElement {
  const row = element.closest('li');
  if (!row) throw new Error(`${element.textContent ?? ''} is not in a row`);
  return row;
}

/** Opens the Notes dropdown and returns the row for `preset`. */
async function openNotesRow(
  utils: ReturnType<typeof renderForm>,
  preset: string,
): Promise<HTMLElement> {
  const notes = await utils.findByLabelText('Notes');
  fireEvent.mouseDown(notes);
  const listbox = await utils.findByRole('listbox');
  return rowOf(within(listbox).getByText(preset));
}

afterEach(() => {
  cleanup();
});

describe('preset management in <NetworkRuleEditorForm/>', () => {
  test('saved presets get edit and delete controls; the add row does not', async () => {
    const utils = renderForm(createPresetStore());
    const row = await openNotesRow(utils, 'Existing preset');

    expect(
      within(row).getByRole('button', { name: 'Edit Preset' }),
    ).toBeDefined();
    expect(
      within(row).getByRole('button', { name: 'Delete Preset' }),
    ).toBeDefined();

    fireEvent.change(utils.getByLabelText('Notes'), {
      target: { value: 'Brand new' },
    });
    const addRow = rowOf(await utils.findByText('Add "Brand new" as a preset'));
    expect(within(addRow).queryAllByRole('button')).toHaveLength(0);
  });

  test('offers no controls without services.updatePresets or when managing is off', async () => {
    const withoutService = renderForm({
      getCatalog: async () => metadataCatalog,
    });
    await openNotesRow(withoutService, 'Existing preset');
    expect(
      withoutService.queryAllByRole('button', { name: 'Edit Preset' }),
    ).toHaveLength(0);
    withoutService.unmount();

    const managingOff = renderForm(createPresetStore(), {
      canManagePresets: false,
    });
    await openNotesRow(managingOff, 'Existing preset');
    expect(
      managingOff.queryAllByRole('button', { name: 'Delete Preset' }),
    ).toHaveLength(0);
  });

  test('renames a saved preset through the services and leaves the rule alone', async () => {
    const store = createPresetStore();
    const utils = renderForm(store);
    const row = await openNotesRow(utils, 'Existing preset');

    fireEvent.click(within(row).getByRole('button', { name: 'Edit Preset' }));
    const input = await utils.findByLabelText(/^preset/i);
    expect((input as HTMLInputElement).value).toBe('Existing preset');
    // Without a host rename there is nothing to offer for the rules.
    expect(utils.queryByRole('checkbox')).toBeNull();
    expect(
      utils.getByText('Rules that already use this preset are not changed.'),
    ).toBeDefined();

    fireEvent.change(input, { target: { value: '  Renamed preset ' } });
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(store.updatePresets).toHaveBeenCalledTimes(1);
    });
    // The whole field, and only that field, in its stored order.
    expect(store.updatePresets).toHaveBeenCalledWith({
      notes: ['Renamed preset', 'Other preset'],
    });
    await waitFor(() => {
      expect(utils.queryByText('Edit Preset')).toBeNull();
    });

    // The refetched catalog drives the reopened dropdown; the rule keeps its own note.
    const renamed = await openNotesRow(utils, 'Renamed preset');
    expect(renamed).toBeDefined();
    expect(utils.queryByText('Existing preset')).toBeNull();
    expect(utils.getByText('Some note')).toBeDefined();
  });

  test('deletes a saved preset after confirmation and leaves the rule alone', async () => {
    const store = createPresetStore();
    const utils = renderForm(store);
    const row = await openNotesRow(utils, 'Existing preset');

    fireEvent.click(within(row).getByRole('button', { name: 'Delete Preset' }));
    expect(await utils.findByText('Delete Preset?')).toBeDefined();
    expect(
      utils.getByText(/"Existing preset" will no longer be suggested/),
    ).toBeDefined();
    expect(store.updatePresets).not.toHaveBeenCalled();

    fireEvent.click(utils.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(store.updatePresets).toHaveBeenCalledWith({
        notes: ['Other preset'],
      });
    });
    await waitFor(() => {
      expect(utils.queryByText('Delete Preset?')).toBeNull();
    });

    await openNotesRow(utils, 'Other preset');
    expect(utils.queryByText('Existing preset')).toBeNull();
    expect(utils.getByText('Some note')).toBeDefined();
  });

  test('blocks a blank or duplicate rename before anything is written', async () => {
    const store = createPresetStore();
    const utils = renderForm(store);
    const row = await openNotesRow(utils, 'Other preset');

    fireEvent.click(within(row).getByRole('button', { name: 'Edit Preset' }));
    const input = await utils.findByLabelText(/^preset/i);

    fireEvent.change(input, { target: { value: 'existing PRESET' } });
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));
    expect(await utils.findByText('This preset already exists')).toBeDefined();

    fireEvent.change(input, { target: { value: '   ' } });
    expect(await utils.findByText('Preset cannot be empty')).toBeDefined();

    expect(store.updatePresets).not.toHaveBeenCalled();
    expect(utils.getByText('Edit Preset')).toBeDefined();
  });

  test('keeps the dialog open and shows why when the write is refused', async () => {
    const store = createPresetStore();
    store.updatePresets.mockRejectedValueOnce(
      new Error('Preset must be at most 120 characters'),
    );
    const utils = renderForm(store);
    const row = await openNotesRow(utils, 'Other preset');

    fireEvent.click(within(row).getByRole('button', { name: 'Delete Preset' }));
    fireEvent.click(await utils.findByRole('button', { name: 'Delete' }));

    expect(
      await utils.findByText('Preset must be at most 120 characters'),
    ).toBeDefined();
    expect(utils.getByText('Delete Preset?')).toBeDefined();
  });

  test('renames a preset added in this session in place, without a write', async () => {
    const store = createPresetStore();
    const utils = renderForm(store);

    const notes = await utils.findByLabelText('Notes');
    fireEvent.change(notes, { target: { value: 'Fresh' } });
    fireEvent.click(await utils.findByText('Add "Fresh" as a preset'));

    const row = await openNotesRow(utils, 'Fresh');
    fireEvent.click(within(row).getByRole('button', { name: 'Edit Preset' }));
    const input = await utils.findByLabelText(/^preset/i);
    fireEvent.change(input, { target: { value: 'Fresher' } });
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(utils.queryByText('Edit Preset')).toBeNull();
    });
    expect(store.updatePresets).not.toHaveBeenCalled();

    // The grown list hands the renamed preset back on submit; the note itself is unchanged.
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(utils.onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(utils.onSubmit.mock.calls[0][0].notes).toBe('Fresh');
    expect(utils.onSubmit.mock.calls[0][1]).toEqual({
      presets: { notes: ['Existing preset', 'Other preset', 'Fresher'] },
    });
  });

  test('with a host rename, the rules checkbox starts off and leaves the open rule alone', async () => {
    const store = createPresetStore(metadataCatalog, { withRename: true });
    const utils = renderForm(store, {
      rule: { ...rules[0], notes: 'Existing preset' },
    });
    const row = await openNotesRow(utils, 'Existing preset');

    fireEvent.click(within(row).getByRole('button', { name: 'Edit Preset' }));
    const input = await utils.findByLabelText(/^preset/i);
    const checkbox = utils.getByRole('checkbox', {
      name: 'Edit existing rules that use this preset',
    });
    expect((checkbox as HTMLInputElement).checked).toBe(false);

    fireEvent.change(input, { target: { value: 'Renamed preset' } });
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(store.renamePreset).toHaveBeenCalledWith({
        field: 'notes',
        from: 'Existing preset',
        to: 'Renamed preset',
        presets: ['Renamed preset', 'Other preset'],
        updateRules: false,
      });
    });
    expect(store.updatePresets).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(utils.queryByText('Edit Preset')).toBeNull();
    });
    // The open rule keeps its note: presets are suggestions unless asked otherwise.
    expect(utils.getByText('Existing preset')).toBeDefined();
    expect(utils.queryByText('Renamed preset')).toBeNull();
  });

  test('ticking the checkbox asks the host to update rules and renames the open rule too', async () => {
    const store = createPresetStore(metadataCatalog, { withRename: true });
    const utils = renderForm(store, {
      rule: {
        ...rules[0],
        notes: 'Existing preset',
        conditions: [
          ...rules[0].conditions.slice(0, 2),
          { key: 'text', operator: 'HAS', values: ['Gold plan', 'ppo'] },
        ],
      },
    });

    // The note first.
    let row = await openNotesRow(utils, 'Existing preset');
    fireEvent.click(within(row).getByRole('button', { name: 'Edit Preset' }));
    let input = await utils.findByLabelText(/^preset/i);
    fireEvent.change(input, { target: { value: 'Renamed preset' } });
    fireEvent.click(
      utils.getByRole('checkbox', {
        name: 'Edit existing rules that use this preset',
      }),
    );
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(store.renamePreset).toHaveBeenLastCalledWith({
        field: 'notes',
        from: 'Existing preset',
        to: 'Renamed preset',
        presets: ['Renamed preset', 'Other preset'],
        updateRules: true,
      });
    });
    await waitFor(() => {
      expect(utils.queryByText('Edit Preset')).toBeNull();
    });
    expect(utils.getByText('Renamed preset')).toBeDefined();
    expect(utils.queryByText('Existing preset')).toBeNull();

    // Then a condition value, on the free-text condition.
    const values = utils.getAllByLabelText(/^values/i);
    const textValues = values[values.length - 1];
    fireEvent.mouseDown(textValues);
    const listbox = await utils.findByRole('listbox');
    row = rowOf(within(listbox).getByText('Gold plan'));
    fireEvent.click(within(row).getByRole('button', { name: 'Edit Preset' }));
    input = await utils.findByLabelText(/^preset/i);
    fireEvent.change(input, { target: { value: 'Platinum plan' } });
    fireEvent.click(
      utils.getByRole('checkbox', {
        name: 'Edit existing rules that use this preset',
      }),
    );
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(store.renamePreset).toHaveBeenLastCalledWith({
        field: 'text',
        from: 'Gold plan',
        to: 'Platinum plan',
        presets: ['Platinum plan'],
        updateRules: true,
      });
    });
    await waitFor(() => {
      expect(utils.queryByText('Edit Preset')).toBeNull();
    });

    // Both followed into the form, and go out with it on save.
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(utils.onSubmit).toHaveBeenCalledTimes(1);
    });
    const submitted = utils.onSubmit.mock.calls[0][0];
    expect(submitted.notes).toBe('Renamed preset');
    expect(submitted.conditions[2]).toEqual({
      key: 'text',
      operator: 'HAS',
      values: ['Platinum plan', 'ppo'],
    });
  });

  test('a metadata key preset is bounded by the catalog limit and written by its field', async () => {
    const store = createPresetStore();
    const utils = renderForm(store);
    await utils.findByLabelText('Notes');

    fireEvent.click(utils.getByRole('button', { name: 'Add Metadata' }));
    const key = utils.getByPlaceholderText('Pick a preset or type a key');
    fireEvent.mouseDown(key);
    const listbox = await utils.findByRole('listbox');
    const row = rowOf(within(listbox).getByText('tier'));
    fireEvent.click(within(row).getByRole('button', { name: 'Edit Preset' }));

    const input = await utils.findByLabelText(/^preset/i);
    expect(input.getAttribute('maxlength')).toBe('64');

    fireEvent.change(input, { target: { value: 'planTier' } });
    fireEvent.click(utils.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(store.updatePresets).toHaveBeenCalledWith({
        metadataKeys: ['planTier'],
      });
    });
  });
});
