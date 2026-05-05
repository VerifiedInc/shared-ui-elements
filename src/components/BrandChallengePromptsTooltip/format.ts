export type ChallengeInputType = 'birthDate' | 'ssn4' | 'fullName.firstName';

export type ChallengePromptBehavior = 'always' | 'ifNecessary';

export interface ChallengePrompt {
  type: ChallengeInputType;
  promptForChallenge: ChallengePromptBehavior;
}

const INPUT_LABELS: Record<ChallengeInputType, string> = {
  birthDate: 'Birth Date',
  ssn4: 'SSN (last 4)',
  'fullName.firstName': 'First Name',
};

const BEHAVIOR_LABELS: Record<ChallengePromptBehavior, string> = {
  always: 'Always',
  ifNecessary: 'If Necessary',
};

export function formatChallengeInput(type: ChallengeInputType): string {
  return INPUT_LABELS[type] ?? type;
}

export function formatChallengePromptBehavior(
  behavior: ChallengePromptBehavior,
): string {
  return BEHAVIOR_LABELS[behavior] ?? behavior;
}

export function formatChallengePrompt(prompt: ChallengePrompt): string {
  return `${formatChallengeInput(prompt.type)}: ${formatChallengePromptBehavior(prompt.promptForChallenge)}`;
}
