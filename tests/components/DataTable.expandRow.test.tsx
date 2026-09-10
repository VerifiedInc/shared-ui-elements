import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import type { Row } from '@tanstack/react-table';

import {
  EXPAND_COLUMN_ID,
  ExpandRowToggle,
  expandColumn,
} from '../../src/components/DataTable';

function fakeRow(expanded: boolean, toggle: () => void): Row<unknown> {
  return {
    getIsExpanded: () => expanded,
    getToggleExpandedHandler: () => toggle,
  } as unknown as Row<unknown>;
}

afterEach(() => {
  cleanup();
});

describe('expandColumn()', () => {
  test('is a display-only utility column opted out of every feature', () => {
    const column = expandColumn();

    expect(column.id).toBe(EXPAND_COLUMN_ID);
    expect(column.enableSorting).toBe(false);
    expect(column.enableHiding).toBe(false);
    expect(column.enableColumnFilter).toBe(false);
    expect(column.meta).toMatchObject({ disableColumnMenu: true });
  });
});

describe('<ExpandRowToggle/>', () => {
  test('labels itself from the row state and toggles on click', () => {
    const toggle = vi.fn();
    const { getByRole, rerender } = render(
      <ExpandRowToggle row={fakeRow(false, toggle)} />,
    );

    const button = getByRole('button', { name: 'Expand row' });
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(button);
    expect(toggle).toHaveBeenCalledTimes(1);

    rerender(<ExpandRowToggle row={fakeRow(true, toggle)} />);
    expect(getByRole('button', { name: 'Collapse row' })).toBeDefined();
  });

  test('can be disabled', () => {
    const toggle = vi.fn();
    const { getByRole } = render(
      <ExpandRowToggle row={fakeRow(false, toggle)} disabled />,
    );

    const button = getByRole('button', { name: 'Expand row' });
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });
});
