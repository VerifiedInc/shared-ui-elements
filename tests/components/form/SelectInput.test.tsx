import { afterEach, expect, test, describe, vi } from 'vitest';
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { SelectInput } from '../../../src/components/form/SelectInput';

afterEach(() => {
  cleanup();
});

const options = [
  { label: 'Option 1', id: '1' },
  { label: 'Option 2', id: '2' },
  { label: 'Option 3', id: '3' },
];

function openListbox(utils: ReturnType<typeof render>): HTMLElement {
  const input = utils.getByRole('combobox');
  fireEvent.mouseDown(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  return utils.getByRole('listbox');
}

describe('<SelectInput/> Component', () => {
  describe('single select (default)', () => {
    test('emits the selected option', () => {
      const onChange = vi.fn();
      const utils = render(
        <SelectInput options={options} onChange={onChange} />,
      );
      const listbox = openListbox(utils);
      fireEvent.click(within(listbox).getByText('Option 2'));
      expect(onChange).toHaveBeenCalledWith(options[1]);
    });

    test('renders the default option', () => {
      const utils = render(
        <SelectInput options={options} defaultOption={options[0]} />,
      );
      expect(utils.getByRole('combobox')).toHaveProperty('value', 'Option 1');
    });
  });

  describe('multiple select', () => {
    test('emits the accumulated selection', () => {
      const onChange = vi.fn();
      const utils = render(
        <SelectInput multiple options={options} onChange={onChange} />,
      );

      let listbox = openListbox(utils);
      fireEvent.click(within(listbox).getByText('Option 1'));
      expect(onChange).toHaveBeenLastCalledWith([options[0]]);

      listbox = openListbox(utils);
      fireEvent.click(within(listbox).getByText('Option 3'));
      expect(onChange).toHaveBeenLastCalledWith([options[0], options[2]]);
    });

    test('renders default options as chips', () => {
      const utils = render(
        <SelectInput
          multiple
          options={options}
          defaultOption={[options[0], options[1]]}
        />,
      );
      expect(utils.getByText('Option 1')).toBeDefined();
      expect(utils.getByText('Option 2')).toBeDefined();
    });

    test('fires onClear when the last option is removed', () => {
      const onChange = vi.fn();
      const onClear = vi.fn();
      const utils = render(
        <SelectInput
          multiple
          options={options}
          defaultOption={[options[0]]}
          onChange={onChange}
          onClear={onClear}
        />,
      );

      const chip = utils.getByText('Option 1');
      const removeButton = chip.parentElement?.querySelector('svg');
      expect(removeButton).toBeDefined();
      fireEvent.click(removeButton as Element);

      expect(onChange).toHaveBeenLastCalledWith([]);
      expect(onClear).toHaveBeenCalled();
    });

    test('respects a controlled value', () => {
      const utils = render(
        <SelectInput multiple options={options} value={[options[2]]} />,
      );
      expect(utils.getByText('Option 3')).toBeDefined();
      expect(utils.queryByText('Option 1')).toBeNull();
    });

    test('keeps the menu open while picking', () => {
      const utils = render(<SelectInput multiple options={options} />);

      const listbox = openListbox(utils);
      fireEvent.click(within(listbox).getByText('Option 1'));

      expect(utils.queryByRole('listbox')).not.toBeNull();
    });

    test('renders options with checkboxes reflecting the selection', () => {
      const utils = render(
        <SelectInput multiple options={options} defaultOption={[options[0]]} />,
      );

      const listbox = openListbox(utils);
      const checkboxes = within(listbox).getAllByRole('checkbox');

      expect(checkboxes).toHaveLength(options.length);
      expect((checkboxes[0] as HTMLInputElement).checked).toBe(true);
      expect((checkboxes[1] as HTMLInputElement).checked).toBe(false);
    });

    test('collapses chips past limitTags into +N while unfocused', () => {
      const utils = render(
        <SelectInput multiple options={options} defaultOption={options} />,
      );

      // Default limitTags is 2: the third chip collapses until the input is focused.
      expect(utils.getByText('+1')).toBeDefined();
      expect(utils.queryByText('Option 3')).toBeNull();
    });
  });
});
