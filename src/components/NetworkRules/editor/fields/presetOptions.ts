import { createFilterOptions, type FilterOptionsState } from '@mui/material';

/*
 * Presets are opt-in, by design. Typed text becomes a preset only when the user picks the
 * "Add … as a preset" row (Enter on the highlighted row, or a click); leaving the field any other
 * way — Tab, clicking on, Enter with the list closed — keeps the text on the rule and saves no
 * preset. So a rule can carry a note, a condition value or a metadata key that is not in the
 * brand's presets, and that is the user's choice: presets are a curated vocabulary, not a log of
 * everything ever typed. Anything that offers presets as choices (the table's filters, say) must
 * treat them as suggestions, never as the full set of values in use.
 */

export type CreatePresetOption = { inputValue: string; label: string };
export type PresetOption = string | CreatePresetOption;

const filter = createFilterOptions<PresetOption>();

export const presetOptionLabel = (option: PresetOption): string =>
  typeof option === 'string' ? option : option.label;

/** The matching presets, plus "Add … as a preset" for typed text that is not one yet. */
export function filterPresetOptions(
  options: PresetOption[],
  state: FilterOptionsState<PresetOption>,
  canCreate: boolean,
): PresetOption[] {
  const filtered = filter(options, state);
  const input = state.inputValue.trim();
  const exists = options.some(
    (option) =>
      typeof option === 'string' &&
      option.toLowerCase() === input.toLowerCase(),
  );
  if (input && canCreate && !exists) {
    filtered.push({ inputValue: input, label: `Add "${input}" as a preset` });
  }
  return filtered;
}
