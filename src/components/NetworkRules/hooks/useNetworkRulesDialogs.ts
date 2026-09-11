import { useCallback, useMemo, useState } from 'react';

import type { NetworkRuleDeleteDialogProps } from '../dialog/NetworkRuleDeleteDialog';
import type { NetworkRuleEditorDialogProps } from '../editor/NetworkRuleEditorDialog';
import type { NetworkRuleRowHandlers } from '../table/NetworkRuleExpandedPanel';
import type { NetworkRule, NetworkRuleServerError } from '../types';

export interface NetworkRulesEditorState {
  open: boolean;
  /** Undefined for a new rule. */
  rule?: NetworkRule;
  focusConditionIndex?: number;
}

export interface NetworkRulesDeletionState {
  open: boolean;
  rule?: NetworkRule;
  /** Set when one condition is being deleted rather than the rule. */
  conditionIndex?: number;
}

/** Table callbacks wired to the dialogs; `onToggleEnabled` stays with the consumer. */
export type NetworkRulesDialogTableHandlers = Required<
  Pick<
    NetworkRuleRowHandlers,
    'onEdit' | 'onDelete' | 'onEditCondition' | 'onDeleteCondition'
  >
>;

export type NetworkRulesEditorDialogProps = Pick<
  NetworkRuleEditorDialogProps,
  'open' | 'rule' | 'focusConditionIndex' | 'serverErrors' | 'onClose'
>;

export type NetworkRulesDeleteDialogProps = Pick<
  NetworkRuleDeleteDialogProps,
  'open' | 'rule' | 'conditionIndex' | 'onClose'
>;

export interface UseNetworkRulesDialogsResult {
  editor: NetworkRulesEditorState;
  deletion: NetworkRulesDeletionState;
  /** Cleared on open and close. */
  serverErrors: NetworkRuleServerError[] | undefined;
  setServerErrors: (errors: NetworkRuleServerError[] | undefined) => void;
  openCreate: () => void;
  openEdit: (rule: NetworkRule) => void;
  openEditCondition: (rule: NetworkRule, index: number) => void;
  closeEditor: () => void;
  requestDeleteRule: (rule: NetworkRule) => void;
  requestDeleteCondition: (rule: NetworkRule, index: number) => void;
  closeDeletion: () => void;
  tableHandlers: NetworkRulesDialogTableHandlers;
  editorDialogProps: NetworkRulesEditorDialogProps;
  deleteDialogProps: NetworkRulesDeleteDialogProps;
}

/** Which dialog is open and about what. Data stays with the consumer. */
export function useNetworkRulesDialogs(): UseNetworkRulesDialogsResult {
  const [editor, setEditor] = useState<NetworkRulesEditorState>({
    open: false,
  });
  const [deletion, setDeletion] = useState<NetworkRulesDeletionState>({
    open: false,
  });
  const [serverErrors, setServerErrors] = useState<
    NetworkRuleServerError[] | undefined
  >();

  const openCreate = useCallback(() => {
    setServerErrors(undefined);
    setEditor({ open: true });
  }, []);

  const openEdit = useCallback((rule: NetworkRule) => {
    setServerErrors(undefined);
    setEditor({ open: true, rule });
  }, []);

  const openEditCondition = useCallback((rule: NetworkRule, index: number) => {
    setServerErrors(undefined);
    setEditor({ open: true, rule, focusConditionIndex: index });
  }, []);

  // The rest of the state stays for the exit transition.
  const closeEditor = useCallback(() => {
    setServerErrors(undefined);
    setEditor((current) => ({ ...current, open: false }));
  }, []);

  const requestDeleteRule = useCallback((rule: NetworkRule) => {
    setDeletion({ open: true, rule });
  }, []);

  const requestDeleteCondition = useCallback(
    (rule: NetworkRule, index: number) => {
      setDeletion({ open: true, rule, conditionIndex: index });
    },
    [],
  );

  const closeDeletion = useCallback(() => {
    setDeletion((current) => ({ ...current, open: false }));
  }, []);

  const tableHandlers = useMemo<NetworkRulesDialogTableHandlers>(
    () => ({
      onEdit: openEdit,
      onDelete: requestDeleteRule,
      onEditCondition: openEditCondition,
      onDeleteCondition: requestDeleteCondition,
    }),
    [openEdit, requestDeleteRule, openEditCondition, requestDeleteCondition],
  );

  const editorDialogProps = useMemo<NetworkRulesEditorDialogProps>(
    () => ({
      open: editor.open,
      rule: editor.rule,
      focusConditionIndex: editor.focusConditionIndex,
      serverErrors,
      onClose: closeEditor,
    }),
    [editor, serverErrors, closeEditor],
  );

  const deleteDialogProps = useMemo<NetworkRulesDeleteDialogProps>(
    () => ({
      open: deletion.open,
      rule: deletion.rule,
      conditionIndex: deletion.conditionIndex,
      onClose: closeDeletion,
    }),
    [deletion, closeDeletion],
  );

  return {
    editor,
    deletion,
    serverErrors,
    setServerErrors,
    openCreate,
    openEdit,
    openEditCondition,
    closeEditor,
    requestDeleteRule,
    requestDeleteCondition,
    closeDeletion,
    tableHandlers,
    editorDialogProps,
    deleteDialogProps,
  };
}
