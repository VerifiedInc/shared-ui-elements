import type {
  NetworkRule,
  NetworkRuleCatalog,
  NetworkRulesServices,
  NetworkRuleSourceService,
} from '../../../src/components/NetworkRules';

export const catalog: NetworkRuleCatalog = {
  statuses: ['IN_NETWORK', 'OUT_OF_NETWORK'],
  operators: {
    EQ: { label: 'equals', multi: true },
    ONE: { label: 'is exactly', multi: false },
    HAS: { label: 'includes', multi: true },
  },
  keys: [
    {
      key: 'color',
      label: 'Color',
      operators: ['EQ', 'ONE'],
      values: {
        source: 'inline',
        options: [
          { value: 'r', label: 'Red' },
          { value: 'g', label: 'Green' },
        ],
      },
    },
    {
      key: 'remote',
      label: 'Remote Thing',
      operators: ['EQ'],
      values: { source: 'things' },
    },
    { key: 'text', label: 'Free Text', operators: ['EQ', 'HAS'] },
  ],
  presets: { notes: ['Existing preset'], text: ['Gold plan'] },
};

export const thingsSource: NetworkRuleSourceService<{ id: string }> = {
  search: async ({ search }) => {
    const all = [
      { value: 't1', label: 'Thing One', data: { id: 't1' } },
      { value: 't2', label: 'Thing Two', data: { id: 't2' } },
    ];
    const term = search?.toLowerCase();
    return term ? all.filter((o) => o.label.toLowerCase().includes(term)) : all;
  },
  resolve: async (values) =>
    values
      .filter((value) => value === 't1' || value === 't2')
      .map((value) => ({
        value,
        label: value === 't1' ? 'Thing One' : 'Thing Two',
        data: { id: value },
      })),
};

export function createServices(
  overrides: Partial<NetworkRulesServices> = {},
): NetworkRulesServices {
  return {
    getCatalog: async () => catalog,
    sources: { things: thingsSource },
    ...overrides,
  };
}

export const rules: NetworkRule[] = [
  {
    uuid: 'rule-1',
    name: 'First rule',
    status: 'IN_NETWORK',
    notes: 'Some note',
    enabled: true,
    startDate: '2026-10-01',
    endDate: null,
    conditions: [
      { key: 'color', operator: 'EQ', value: ['r', 'g'] },
      { key: 'remote', operator: 'EQ', value: 't1' },
      { key: 'text', operator: 'HAS', value: 'ppo' },
    ],
  },
  {
    uuid: 'rule-2',
    name: 'Second rule',
    status: 'UNKNOWN',
    notes: null,
    enabled: false,
    startDate: null,
    endDate: null,
    conditions: [],
  },
];
