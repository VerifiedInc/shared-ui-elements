import { z } from 'zod';

import type {
  NetworkRuleCatalogMetadata,
  NetworkRuleMetadataType,
} from '../types';
import {
  NETWORK_RULE_METADATA_TYPES,
  isExactNumberValue,
  isNumberValue,
} from '../utils/metadata';

// Shape only; the server validates keys, operators and values against the catalog.

/** The catalog's type allow-list as `z.enum` wants it; every type when a catalog lists none. */
const offeredTypes = (
  types: readonly NetworkRuleMetadataType[],
): [NetworkRuleMetadataType, ...NetworkRuleMetadataType[]] =>
  types.length > 0
    ? (types as [NetworkRuleMetadataType, ...NetworkRuleMetadataType[]])
    : NETWORK_RULE_METADATA_TYPES;

/**
 * Mirrors core's `validateMetadata` so a limit shows up on the field instead of coming back as a
 * METADATA_INVALID. Limits and the allowed types are the catalog's, never a second copy of them:
 * the row can render every type, but a rule may only hold the ones this brand's catalog offers.
 */
const metadataEntrySchema = ({
  types,
  limits: { maxKeyLength, maxValueLength },
}: NetworkRuleCatalogMetadata) =>
  z
    .object({
      key: z
        .string()
        .trim()
        .min(1, 'Key is required')
        .max(maxKeyLength, `Key must be at most ${maxKeyLength} characters`),
      type: z.enum(offeredTypes(types)),
      value: z.string(),
    })
    .superRefine((entry, ctx) => {
      const value = entry.value.trim();
      const fail = (message: string): void => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['value'],
          message,
        });
      };

      if (!value) {
        fail('Value is required');
        return;
      }
      if (entry.type === 'string' && value.length > maxValueLength) {
        fail(`Value must be at most ${maxValueLength} characters`);
      }
      if (entry.type === 'number') {
        if (!isNumberValue(value)) {
          fail('Value must be a number');
        } else if (!isExactNumberValue(value)) {
          // Storing it would round it, so the rule would carry a number nobody typed.
          fail(
            'Too many digits to keep as a number. Use the String type instead',
          );
        }
      }
      if (entry.type === 'boolean' && value !== 'true' && value !== 'false') {
        fail('Select True or False');
      }
    });

export const networkRuleConditionFormSchema = z.object({
  key: z.string().min(1, 'Select a key'),
  operator: z.string().min(1, 'Select an operator'),
  values: z
    .array(z.string().trim().min(1, 'Values cannot be empty'))
    .min(1, 'Add at least one value'),
});

export function createNetworkRuleFormSchema(
  metadata: NetworkRuleCatalogMetadata | undefined,
) {
  return z
    .object({
      name: z.string().trim().min(1, 'Rule name is required'),
      status: z.string().min(1, 'Select a status'),
      notes: z.string().nullable(),
      enabled: z.boolean(),
      startDate: z.string().nullable(),
      endDate: z.string().nullable(),
      // A catalog without metadata offers no section, so the only list that passes is an empty one.
      metadata: metadata
        ? z
            .array(metadataEntrySchema(metadata))
            .max(
              metadata.limits.maxEntries,
              `A rule may have at most ${metadata.limits.maxEntries} metadata entries`,
            )
        : z.array(z.never()).max(0, 'Metadata is not available'),
      conditions: z
        .array(networkRuleConditionFormSchema)
        .min(1, 'Add at least one condition'),
    })
    .superRefine((values, ctx) => {
      // One value per key: the rule's metadata is an object, so a repeat would silently win.
      const seen = new Set<string>();
      values.metadata.forEach((entry, index) => {
        const key = entry.key.trim().toLowerCase();
        if (!key) return;
        if (seen.has(key)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['metadata', index, 'key'],
            message: 'Key already used',
          });
          return;
        }
        seen.add(key);
      });

      // The end day is exclusive, so it has to come after the start day.
      if (
        values.startDate !== null &&
        values.endDate !== null &&
        values.endDate <= values.startDate
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endDate'],
          message: 'End must be after start',
        });
      }
    });
}

export type NetworkRuleFormSchema = z.infer<
  ReturnType<typeof createNetworkRuleFormSchema>
>;
