import { describe, expect, test } from 'vitest';

import { buildNetworkRuleExportSections } from '../../../src/components/NetworkRules';

import { catalog, rules } from './fixtures';

describe('buildNetworkRuleExportSections', () => {
  test('labels conditions from the catalog and lists the rule metadata', () => {
    const [conditions, metadata] = buildNetworkRuleExportSections(
      {
        ...rules[0],
        metadata: { tier: 'gold', seats: 4, active: true },
      },
      catalog,
    );

    expect(conditions.title).toBe('Conditions');
    expect(conditions.rows).toEqual([
      // Inline options carry their label; a remote source keeps the stored value.
      ['Color', 'equals', 'Red, Green'],
      ['Remote Thing', 'equals', 't1'],
      ['Free Text', 'includes', 'ppo'],
    ]);

    expect(metadata.title).toBe('Metadata');
    expect(metadata.rows).toEqual([
      ['tier', 'String', 'gold'],
      ['seats', 'Number', '4'],
      ['active', 'Boolean', 'True'],
    ]);

    // Collapsed into one sheet cell, an entry reads as a line.
    expect(conditions.lines).toEqual([
      'Color equals Red, Green',
      'Remote Thing equals t1',
      'Free Text includes ppo',
    ]);
    expect(metadata.lines).toEqual(['tier: gold', 'seats: 4', 'active: True']);
  });

  test('carries an empty message for a rule with neither', () => {
    const [conditions, metadata] = buildNetworkRuleExportSections(
      rules[1],
      catalog,
    );

    expect(conditions.rows).toEqual([]);
    expect(conditions.emptyMessage).toBe('No conditions');
    expect(metadata.rows).toEqual([]);
    expect(metadata.emptyMessage).toBe('No metadata');
  });
});
