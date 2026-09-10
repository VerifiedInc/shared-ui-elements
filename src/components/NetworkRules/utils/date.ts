import { format } from 'date-fns';

const RULE_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** `YYYY-MM-DD` → a local Date on that day, for pickers. */
export function ruleDateToDay(value?: string | null): Date | null {
  const match = value ? RULE_DATE.exec(value) : null;
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

/** A picked Date → `YYYY-MM-DD` from its local calendar fields. */
export function dayToRuleDate(date?: Date | null): string | null {
  if (!date || Number.isNaN(date.getTime())) return null;
  return format(date, 'yyyy-MM-dd');
}

/** `YYYY-MM-DD` → "October 1, 2026". */
export function formatRuleDate(value?: string | null): string | null {
  const day = ruleDateToDay(value);
  return day ? format(day, 'MMMM d, yyyy') : null;
}
