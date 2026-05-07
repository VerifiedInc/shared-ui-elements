/**
 * Display formatters for brand-settings panel content.
 *
 * Each map uses lookup-and-fallback so a new enum member shows its raw
 * value rather than breaking compilation.
 */

const CHALLENGE_INPUT_LABELS: Record<string, string> = {
  birthDate: 'Birth Date',
  ssn4: 'SSN4',
  'fullName.firstName': 'First Name',
};

const PROMPT_FOR_CHALLENGE_LABELS: Record<string, string> = {
  always: 'always',
  ifNecessary: 'if necessary',
};

const HEALTH_DATA_PROVIDER_MODE_LABELS: Record<string, string> = {
  fallback: 'Fallback',
  parallel: 'Parallel',
};

export function formatChallengeInput(type: string): string {
  return CHALLENGE_INPUT_LABELS[type] ?? type;
}

export function formatPromptForChallenge(prompt: string): string {
  return PROMPT_FOR_CHALLENGE_LABELS[prompt] ?? prompt;
}

export function formatHealthDataProviderMode(mode: string): string {
  return HEALTH_DATA_PROVIDER_MODE_LABELS[mode] ?? mode;
}
