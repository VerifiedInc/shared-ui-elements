import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useNetworkRulesDialogs } from '../../../src/components/NetworkRules';

import { rules } from './fixtures';

describe('useNetworkRulesDialogs()', () => {
  test('starts with both dialogs closed', () => {
    const { result } = renderHook(() => useNetworkRulesDialogs());
    expect(result.current.editor.open).toBe(false);
    expect(result.current.deletion.open).toBe(false);
    expect(result.current.editorDialogProps.open).toBe(false);
    expect(result.current.deleteDialogProps.open).toBe(false);
  });

  test('opens the editor for create, edit, add-condition and edit-condition', () => {
    const { result } = renderHook(() => useNetworkRulesDialogs());

    act(() => result.current.openCreate());
    expect(result.current.editor).toEqual({
      open: true,
      appendEmptyCondition: false,
    });

    act(() => result.current.tableHandlers.onEdit(rules[0]));
    expect(result.current.editor).toEqual({
      open: true,
      rule: rules[0],
      appendEmptyCondition: false,
    });

    act(() => result.current.tableHandlers.onAddCondition(rules[0]));
    expect(result.current.editor.appendEmptyCondition).toBe(true);

    act(() => result.current.tableHandlers.onEditCondition(rules[0], 2));
    expect(result.current.editor.focusConditionIndex).toBe(2);
    expect(result.current.editor.appendEmptyCondition).toBe(false);
  });

  test('closing the editor keeps its content for the exit transition and clears server errors', () => {
    const { result } = renderHook(() => useNetworkRulesDialogs());

    act(() => result.current.openEdit(rules[0]));
    act(() => result.current.setServerErrors([{ code: 'X', index: 0 }]));
    expect(result.current.editorDialogProps.serverErrors).toHaveLength(1);

    act(() => result.current.closeEditor());
    expect(result.current.editor.open).toBe(false);
    expect(result.current.editor.rule).toBe(rules[0]);
    expect(result.current.editorDialogProps.serverErrors).toBeUndefined();

    // Reopening starts a clean session.
    act(() => result.current.setServerErrors([{ code: 'Y' }]));
    act(() => result.current.openCreate());
    expect(result.current.serverErrors).toBeUndefined();
  });

  test('tracks rule and condition deletion requests', () => {
    const { result } = renderHook(() => useNetworkRulesDialogs());

    act(() => result.current.tableHandlers.onDelete(rules[1]));
    expect(result.current.deleteDialogProps).toMatchObject({
      open: true,
      rule: rules[1],
      conditionIndex: undefined,
    });

    act(() => result.current.tableHandlers.onDeleteCondition(rules[0], 1));
    expect(result.current.deleteDialogProps).toMatchObject({
      open: true,
      rule: rules[0],
      conditionIndex: 1,
    });

    act(() => result.current.closeDeletion());
    expect(result.current.deletion.open).toBe(false);
    expect(result.current.deletion.rule).toBe(rules[0]);
  });
});
