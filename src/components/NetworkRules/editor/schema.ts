import { z } from 'zod';

// Shape only; the server validates keys, operators and values against the catalog.

export const networkRuleConditionFormSchema = z.object({
  key: z.string().min(1, 'Select a key'),
  operator: z.string().min(1, 'Select an operator'),
  values: z
    .array(z.string().trim().min(1, 'Values cannot be empty'))
    .min(1, 'Add at least one value'),
});

export const networkRuleFormSchema = z
  .object({
    name: z.string().trim().min(1, 'Rule name is required'),
    status: z.string().min(1, 'Select a status'),
    notes: z.string().nullable(),
    enabled: z.boolean(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    conditions: z
      .array(networkRuleConditionFormSchema)
      .min(1, 'Add at least one condition'),
  })
  .superRefine((values, ctx) => {
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

export type NetworkRuleFormSchema = z.infer<typeof networkRuleFormSchema>;
