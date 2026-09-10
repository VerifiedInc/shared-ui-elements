// Story-only example data; the components know only the shapes in `types.ts`.
import { Box, Stack, Typography } from '@mui/material';

import type {
  NetworkRule,
  NetworkRuleCatalog,
  NetworkRuleOption,
  NetworkRuleSourceService,
  NetworkRulesServices,
} from '../../../components/NetworkRules';
import { LogoAvatar } from '../../../components/UI/LogoAvatar';
import { LogoChip } from '../../../components/UI/LogoChip';

type ExamplePayer = {
  verifiedId: string;
  name: string;
  logoUrl?: string;
  ids: string[];
};

const EXAMPLE_PAYERS: ExamplePayer[] = [
  { verifiedId: 'V100002', name: 'UnitedHealthcare', ids: ['87726', 'UHC'] },
  { verifiedId: 'V100001', name: 'Aetna', ids: ['60054', 'AETNA'] },
  { verifiedId: 'V100003', name: 'Cigna', ids: ['62308', 'CIGNA'] },
  { verifiedId: 'V100004', name: 'Humana', ids: ['61101'] },
  {
    verifiedId: 'V100006',
    name: 'Anthem Blue Cross',
    ids: ['040', 'BCBSCA', 'ANTHEM'],
  },
  {
    verifiedId: 'V100007',
    name: 'Empire BlueCross BlueShield',
    ids: ['00803', 'BCBSNY', 'EMPIRE'],
  },
  { verifiedId: 'V581261', name: 'BCBS Minnesota', ids: ['00720', 'BCBSMN'] },
  { verifiedId: 'V100005', name: 'Kaiser Permanente', ids: ['94135'] },
  {
    verifiedId: 'V100008',
    name: 'Blue Cross Blue Shield of Texas',
    ids: ['84980', 'BCBSTX'],
  },
  { verifiedId: 'V100009', name: 'Oscar Health', ids: ['OSCAR'] },
];

const toPayerOption = (
  payer: ExamplePayer,
): NetworkRuleOption<ExamplePayer> => ({
  value: payer.verifiedId,
  label: payer.name,
  data: payer,
});

const sleep = async (ms: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

// In-memory version of the payers API's ranked search.
function rankPayers(search: string): ExamplePayer[] {
  const raw = search
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const tokens = raw.split(' ').filter((token) => token.length >= 2);
  if (raw.length < 3 || tokens.length === 0) return [];

  const term = search.trim().toUpperCase();

  const scored = EXAMPLE_PAYERS.map((payer, index) => {
    const name = payer.name.toLowerCase();
    const words = name.split(/\s+/);
    const ids = payer.ids.map((id) => id.toLowerCase());

    const exactId = payer.verifiedId === term || payer.ids.includes(term);
    const nameScore = tokens.reduce((sum, token) => {
      const hit = words.some((word) =>
        token.length === 2 ? word === token : word.startsWith(token),
      );
      return sum + (hit ? 2 : 0);
    }, 0);
    const exactName = name === raw ? 100 : 0;
    const aliasPrefix = ids.some((id) => id.startsWith(raw)) ? 7 : 0;
    const idPrefix = payer.verifiedId.toLowerCase().startsWith(raw) ? 1 : 0;

    const matched = nameScore > 0 || aliasPrefix > 0 || idPrefix > 0;
    let score = 0;
    if (exactId) score = 1000;
    else if (matched) score = nameScore + exactName + aliasPrefix + idPrefix;

    return { payer, index, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.payer);
}

export const examplePayersSource: NetworkRuleSourceService<ExamplePayer> = {
  searchPlaceholder: 'Search by name or ID…',
  search: async ({ search, limit = 10, skip = 0 }) => {
    await sleep(400);
    const matches = search?.trim() ? rankPayers(search) : EXAMPLE_PAYERS;
    return matches.slice(skip, skip + limit).map(toPayerOption);
  },
  resolve: async (values) => {
    await sleep(250);
    return EXAMPLE_PAYERS.filter((payer) =>
      values.includes(payer.verifiedId),
    ).map(toPayerOption);
  },
  renderOption: (option) => (
    <Stack direction='row' spacing={1} alignItems='center' minWidth={0}>
      <LogoAvatar
        name={option.label}
        logoUrl={option.data?.logoUrl}
        size={28}
      />
      <Box
        component='span'
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {option.label}
      </Box>
      <Typography variant='caption' color='text.secondary' noWrap>
        {option.value}
      </Typography>
    </Stack>
  ),
  renderChip: (option, chipProps) => (
    <LogoChip
      {...chipProps}
      name={option.label}
      logoUrl={option.data?.logoUrl}
    />
  ),
};

export const exampleCatalog: NetworkRuleCatalog = {
  statuses: ['IN_NETWORK', 'OUT_OF_NETWORK', 'INDETERMINATE'],
  operators: {
    EQUAL: { label: 'equals', multi: true },
    NOT_EQUAL: { label: 'does not equal', multi: true },
    INCLUDE: { label: 'includes', multi: true },
    NOT_INCLUDE: { label: 'does not include', multi: true },
  },
  keys: [
    {
      key: 'payerId',
      label: 'Payer',
      type: 'enum',
      operators: ['EQUAL', 'NOT_EQUAL'],
      values: { source: 'payers' },
    },
    {
      key: 'payerName',
      label: 'Payer Name',
      type: 'text',
      operators: ['EQUAL', 'NOT_EQUAL', 'INCLUDE', 'NOT_INCLUDE'],
    },
    {
      key: 'state',
      label: 'Patient State',
      type: 'enum',
      operators: ['EQUAL', 'NOT_EQUAL'],
      values: {
        source: 'inline',
        options: [
          { value: 'CA', label: 'California' },
          { value: 'MN', label: 'Minnesota' },
          { value: 'NY', label: 'New York' },
          { value: 'TX', label: 'Texas' },
          { value: 'PR', label: 'Puerto Rico' },
        ],
      },
    },
    {
      key: 'insuranceTypeCodes',
      label: 'Insurance Types',
      type: 'enum',
      operators: ['INCLUDE', 'NOT_INCLUDE'],
      values: {
        source: 'inline',
        options: [
          { value: 'HM', label: 'HMO' },
          { value: 'PR', label: 'PPO' },
          { value: 'PS', label: 'POS' },
          { value: 'MA', label: 'Medicare Part A' },
          { value: 'MC', label: 'Medicaid' },
        ],
      },
    },
    {
      key: 'planName',
      label: 'Plan Name',
      type: 'text',
      operators: ['EQUAL', 'NOT_EQUAL', 'INCLUDE', 'NOT_INCLUDE'],
    },
  ],
};

export const exampleRules: NetworkRule[] = [
  {
    uuid: 'a1b2c3d4-0000-4000-8000-000000000001',
    name: 'Every condition key',
    status: 'IN_NETWORK',
    notes: 'Showcases a remote source, inline options and free text together',
    enabled: true,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    conditions: [
      { key: 'payerId', operator: 'EQUAL', value: ['V100002', 'V100001'] },
      { key: 'payerName', operator: 'NOT_INCLUDE', value: ['Medicare'] },
      { key: 'state', operator: 'EQUAL', value: ['CA', 'TX', 'NY'] },
      {
        key: 'insuranceTypeCodes',
        operator: 'INCLUDE',
        value: ['PR', 'PS', 'HM'],
      },
      { key: 'planName', operator: 'INCLUDE', value: ['PPO', 'Choice'] },
    ],
  },
  {
    uuid: '6f1c2a3e-1b2c-4d5e-8f90-0a1b2c3d4e5f',
    name: 'NY, BCBS - EMPIRE',
    status: 'IN_NETWORK',
    notes: null,
    enabled: true,
    startDate: '2026-08-01',
    endDate: null,
    conditions: [
      { key: 'state', operator: 'EQUAL', value: 'NY' },
      { key: 'payerId', operator: 'EQUAL', value: ['V100007', 'V100006'] },
      { key: 'planName', operator: 'INCLUDE', value: ['PPO', 'EPO', 'FEP'] },
    ],
  },
  {
    uuid: '9a8b7c6d-5e4f-4a3b-9c2d-1e0f9a8b7c6d',
    name: 'Medicaid never',
    status: 'OUT_OF_NETWORK',
    notes: 'No self pay',
    enabled: true,
    startDate: null,
    endDate: null,
    conditions: [
      { key: 'insuranceTypeCodes', operator: 'INCLUDE', value: ['MC'] },
    ],
  },
  {
    uuid: '0c1d2e3f-4a5b-4c6d-8e9f-0a1b2c3d4e5f',
    name: 'BCBS MN PPO (expired)',
    status: 'INDETERMINATE',
    notes: 'Call payer to confirm',
    enabled: false,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    conditions: [
      { key: 'payerId', operator: 'EQUAL', value: 'V581261' },
      { key: 'state', operator: 'EQUAL', value: ['MN'] },
      { key: 'planName', operator: 'INCLUDE', value: 'Blue Choice PPO' },
    ],
  },
];

export const exampleNotePresets = [
  'No self pay',
  'Call payer to confirm',
  'Verify plan tier',
];

export interface StoryServicesOptions {
  catalogDelayMs?: number;
  failCatalog?: boolean;
  withoutPayersSource?: boolean;
}

export function createStoryServices({
  catalogDelayMs = 500,
  failCatalog = false,
  withoutPayersSource = false,
}: StoryServicesOptions = {}): NetworkRulesServices {
  return {
    getCatalog: async () => {
      await sleep(catalogDelayMs);
      if (failCatalog) throw new Error('Catalog unavailable');
      return exampleCatalog;
    },
    sources: withoutPayersSource ? {} : { payers: examplePayersSource },
  };
}
