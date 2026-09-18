import type { ReactElement } from 'react';
import type { ChipProps } from '@mui/material';
import type { QueryClient } from '@tanstack/react-query';

// Shapes only: no status codes, key names, operator codes or option lists live
// here. Components branch on the presence of fields, never on string values.

export type NetworkRuleOption<TData = unknown> = {
  value: string;
  label: string;
  /** Remote options show it as an avatar before the label, with the label's initial as fallback. */
  logoUrl?: string | null;
  /** The raw record a remote source returned. */
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
  /** The brand's saved suggestions for a free-text key. */
  presets?: string[];
};

export type NetworkRuleCatalog = {
  statuses: string[];
  operators: Record<string, NetworkRuleOperatorDef>;
  keys: NetworkRuleKeyDef[];
  /** The brand's saved suggestions for the rule's note. */
  notePresets?: string[];
  /** Absent from an older catalog; the editor falls back to its own defaults. */
  metadata?: NetworkRuleCatalogMetadata;
};

export type NetworkRuleMetadataLimits = {
  maxEntries: number;
  maxKeyLength: number;
  /** Characters a string value may have. A number is bounded by precision instead. */
  maxValueLength: number;
};

/** What the metadata section renders from, so no limit or type list is hard-coded here. */
export type NetworkRuleCatalogMetadata = {
  /** The value types an entry may hold; the Type select lists them in this order. */
  types: NetworkRuleMetadataType[];
  limits: NetworkRuleMetadataLimits;
  /** The brand's saved keys and string values. An entry may still use others. */
  keyPresets?: string[];
  valuePresets?: string[];
};

/** Always a list, one entry or several; several are an inclusive OR (ENG-572). */
export type NetworkRuleCondition = {
  key: string;
  operator: string;
  values: string[];
};

export type NetworkRuleMetadataType = 'string' | 'number' | 'boolean';

/** Flat typed key/value pairs returned with the decision beside the note. Never nested. */
export type NetworkRuleMetadata = Record<string, string | number | boolean>;

/** Dates are calendar days, `YYYY-MM-DD`: from the start day up to, not including, the end day. */
export type NetworkRule = {
  uuid: string;
  /** Per-brand sequence the server assigns on create; absent until then. */
  number?: number;
  name: string;
  status: string;
  notes?: string | null;
  /** `{}` when the rule has none. */
  metadata?: NetworkRuleMetadata;
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

/** One metadata row. The value stays text while editing; `type` says how to parse it on submit. */
export type NetworkRuleMetadataFormValues = {
  key: string;
  type: NetworkRuleMetadataType;
  /** `'true'` or `'false'` for a boolean row. */
  value: string;
};

export type NetworkRuleFormValues = {
  name: string;
  status: string;
  notes: string | null;
  enabled: boolean;
  startDate: string | null;
  endDate: string | null;
  metadata: NetworkRuleMetadataFormValues[];
  conditions: NetworkRuleConditionFormValues[];
};

/**
 * Complete preset lists keyed by the field they suggest for: `notes` for the rule's note,
 * `metadataKeys` and `metadataValues` for the metadata rows, otherwise the free-text condition
 * key. Fields left out are untouched: the brand patch merges per field.
 */
export type NetworkRulePresets = Record<string, string[]>;

/**
 * One saved preset renamed. `presets` is the field's complete list with the change applied, ready
 * to store as `updatePresets` would. `updateRules` is the user's choice to also change the rules
 * that carry `from`; `renamePresetInRule` says what that means for one rule.
 */
export type NetworkRulePresetRename = {
  field: string;
  from: string;
  to: string;
  presets: string[];
  updateRules: boolean;
};

/** Handed back with the submitted rule. */
export type NetworkRuleSubmitExtras = {
  /** Preset lists that grew while editing, ready to store. Empty when nothing was added. */
  presets: NetworkRulePresets;
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
  searchPlaceholder?: string;
};

export type NetworkRulesServices = {
  /** Namespaces the query keys when several providers share one query client, e.g. `${env}:${brandUuid}`. */
  scope?: string;
  getCatalog: (signal?: AbortSignal) => Promise<NetworkRuleCatalog>;
  /**
   * Stores the given fields' complete lists, leaving the others alone. With it the editor offers
   * edit and delete controls on saved presets and refetches the catalog after each write.
   */
  updatePresets?: (presets: NetworkRulePresets) => Promise<void>;
  /**
   * Renames one saved preset: stores `presets` as `updatePresets` would and, when `updateRules` is
   * set, changes the rules that carry the old text. With it the edit dialog offers that choice;
   * without it a rename goes through `updatePresets` and rules are left alone.
   */
  renamePreset?: (rename: NetworkRulePresetRename) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each source carries its own record type
  sources?: Record<string, NetworkRuleSourceService<any>>;
  /** Shared with the host app; otherwise the provider creates its own. */
  queryClient?: QueryClient;
};
