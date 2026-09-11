import { createFilterOptions, type FilterOptionsState } from '@mui/material';

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
