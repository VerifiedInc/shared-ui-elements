import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography } from '@mui/material';

import {
  BrandChallengePromptsTooltip,
  LazyBrandChallengePromptsTooltip,
  type ChallengePrompt,
} from '../../components/BrandChallengePromptsTooltip';

const ALL_PROMPTS: ChallengePrompt[] = [
  { type: 'birthDate', promptForChallenge: 'always' },
  { type: 'ssn4', promptForChallenge: 'ifNecessary' },
  { type: 'fullName.firstName', promptForChallenge: 'always' },
];

const SINGLE_PROMPT: ChallengePrompt[] = [
  { type: 'ssn4', promptForChallenge: 'always' },
];

const meta: Meta<typeof BrandChallengePromptsTooltip> = {
  title: 'Components/BrandChallengePromptsTooltip',
  component: BrandChallengePromptsTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Wraps a child element with a hover tooltip listing the brand challenge prompts. Renders children unwrapped (no tooltip mounted) when prompts are empty or undefined — useful for dense surfaces like billing tables where most rows have no prompts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BrandChallengePromptsTooltip>;

export const AllPrompts: Story = {
  args: {
    prompts: ALL_PROMPTS,
    children: <Typography>Hover me — Acme Corp</Typography>,
  },
};

export const SinglePrompt: Story = {
  args: {
    prompts: SINGLE_PROMPT,
    children: <Typography>Hover me — Pied Piper</Typography>,
  },
};

export const EmptyArrayNoTooltip: Story = {
  args: {
    prompts: [],
    children: (
      <Typography>
        Hover me — no tooltip mounts (children render unwrapped)
      </Typography>
    ),
  },
};

export const UndefinedNoTooltip: Story = {
  args: {
    prompts: undefined,
    children: (
      <Typography>
        Hover me — no tooltip mounts (children render unwrapped)
      </Typography>
    ),
  },
};

export const SideBySideComparison: Story = {
  render: () => (
    <Stack spacing={3} alignItems='flex-start'>
      <BrandChallengePromptsTooltip prompts={ALL_PROMPTS}>
        <Typography>Brand A — three prompts</Typography>
      </BrandChallengePromptsTooltip>
      <BrandChallengePromptsTooltip prompts={SINGLE_PROMPT}>
        <Typography>Brand B — one prompt</Typography>
      </BrandChallengePromptsTooltip>
      <BrandChallengePromptsTooltip prompts={[]}>
        <Typography>Brand C — no prompts (silent on hover)</Typography>
      </BrandChallengePromptsTooltip>
    </Stack>
  ),
};

export const LazyVariantForDenseTables: Story = {
  render: () => (
    <Stack spacing={1} alignItems='flex-start'>
      <Typography variant='caption' color='text.secondary'>
        Used inside the billable events table — Tooltip mounts only after the
        first hover/focus, so initial render of 100+ rows stays cheap.
      </Typography>
      <LazyBrandChallengePromptsTooltip prompts={ALL_PROMPTS}>
        Acme Corp
      </LazyBrandChallengePromptsTooltip>
      <LazyBrandChallengePromptsTooltip prompts={[]}>
        Pied Piper (no prompts — never mounts a Tooltip)
      </LazyBrandChallengePromptsTooltip>
    </Stack>
  ),
};
