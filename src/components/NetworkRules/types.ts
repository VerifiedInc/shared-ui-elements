import type { ReactElement, ReactNode } from 'react';
import type { ChipProps } from '@mui/material';
import type { QueryClient } from '@tanstack/react-query';

// Shapes only: no status codes, key names, operator codes or option lists live
// here. Components branch on the presence of fields, never on string values.

export type NetworkRuleOption<TData = unknown> = {
  value: string;
  label: string;
  /** The raw record a remote source returned; read only by that source's renderers. */
  data?: TData;
};

export type NetworkRuleStatusPresentation = {
  label: string;
  color?: ChipProps['color'];
  icon?: ReactElement;
};

export type NetworkRuleOperatorDef = {
  label: string;
  /** Accepts several values. Defaults to true. */
  multi?: boolean;
};

export type NetworkRuleKeyValues = {
  source: string;
  options?: NetworkRuleOption[];
};

/**
 * `values.options` → pick-list; `values.source` alone → search through
 * `services.sources[source]`; no `values` → free text.
 */
export type NetworkRuleKeyDef = {
  key: string;
  label: string;
  operators: string[];
  type?: string;
  values?: NetworkRuleKeyValues;
};

export type NetworkRuleCatalog = {
  statuses: string[];
  operators: Record<string, NetworkRuleOperatorDef>;
  keys: NetworkRuleKeyDef[];
};

/** `value` is one string or several (inclusive OR). */
export type NetworkRuleCondition = {
  key: string;
  operator: string;
  value: string | string[];
};

/** Dates are calendar days, `YYYY-MM-DD`: from the start day up to, not including, the end day. */
export type NetworkRule = {
  uuid: string;
  /** Per-brand sequence the server assigns on create; absent until then. */
  number?: number;
  name: string;
  status: string;
  notes?: string | null;
  /** Defaults to true. */
  enabled?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  conditions: NetworkRuleCondition[];
};

/** What the editor emits: a rule without its id. */
export type NetworkRuleData = Omit<NetworkRule, 'uuid'>;

export type NetworkRuleConditionFormValues = {
  key: string;
  operator: string;
  values: string[];
};

export type NetworkRuleFormValues = {
  name: string;
  status: string;
  notes: string | null;
  enabled: boolean;
  startDate: string | null;
  endDate: string | null;
  conditions: NetworkRuleConditionFormValues[];
};

/** Handed back with the submitted rule. */
export type NetworkRuleSubmitExtras = {
  /** Note presets added while editing, not yet in `notePresets`. */
  newNotePresets: string[];
};

/** A server validation error; `index` points at the offending condition. */
export type NetworkRuleServerError = {
  index?: number;
  key?: string;
  operator?: string;
  code: string;
  message?: string;
};

export type NetworkRuleSourceSearchParams = {
  search?: string;
  limit?: number;
  skip?: number;
};

export type NetworkRuleRenderOption<TData = unknown> = (
  option: NetworkRuleOption<TData>,
) => ReactNode;

/** Receives the props the default chip would get; spread them to keep size, deletion and keyboard behaviour. */
export type NetworkRuleRenderChip<TData = unknown> = (
  option: NetworkRuleOption<TData>,
  chipProps: ChipProps,
) => ReactNode;

/** One remote option source, keyed by `NetworkRuleKeyDef.values.source`. */
export type NetworkRuleSourceService<TData = unknown> = {
  search: (
    params: NetworkRuleSourceSearchParams,
    signal?: AbortSignal,
  ) => Promise<Array<NetworkRuleOption<TData>>>;
  /** Labels for stored values. Without it they render as their raw string. */
  resolve?: (
    values: string[],
    signal?: AbortSignal,
  ) => Promise<Array<NetworkRuleOption<TData>>>;
  renderOption?: NetworkRuleRenderOption<TData>;
  renderChip?: NetworkRuleRenderChip<TData>;
  searchPlaceholder?: string;
};

export type NetworkRulesServices = {
  /** Namespaces the query keys when several providers share one query client, e.g. `${env}:${brandUuid}`. */
  scope?: string;
  getCatalog: (signal?: AbortSignal) => Promise<NetworkRuleCatalog>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each source carries its own record type
  sources?: Record<string, NetworkRuleSourceService<any>>;
  /** Shared with the host app; otherwise the provider creates its own. */
  queryClient?: QueryClient;
};
