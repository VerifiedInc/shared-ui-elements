import type { Meta, StoryObj } from '@storybook/react';

import { SeriesPercentageChartLegend } from '../../../components/chart/SeriesPercentageChartLegend';
import type { ChallengePrompt } from '../../../components/BrandChallengePromptsTooltip';

const ACME_PROMPTS: ChallengePrompt[] = [
  { type: 'birthDate', promptForChallenge: 'always' },
  { type: 'ssn4', promptForChallenge: 'ifNecessary' },
  { type: 'fullName.firstName', promptForChallenge: 'always' },
];

const PIED_PIPER_PROMPTS: ChallengePrompt[] = [
  { type: 'ssn4', promptForChallenge: 'always' },
];

const meta: Meta<typeof SeriesPercentageChartLegend> = {
  title: 'Components/chart/SeriesPercentageChartLegend',
  component: SeriesPercentageChartLegend,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Renders a multi-brand chart legend. Each entry can carry an optional `inputChallengePrompts` payload — when present, hovering the entry reveals a tooltip listing the brand`s challenge prompt configuration.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeriesPercentageChartLegend>;

export const WithChallengePrompts: Story = {
  args: {
    showUuid: true,
    showChallengePromptsTooltip: true,
    payload: [
      {
        uuid: 'c44d24d0-8cef-4fcc-ad37-1fe154d97e57',
        value: 'Acme Corp',
        color: '#1976d2',
        dataKey: 'acme',
        integrationType: 'SDK',
        brandName: 'Acme Corp',
        inputChallengePrompts: ACME_PROMPTS,
      },
      {
        uuid: '42f12a06-47a7-46bf-901b-e4a8227266d0',
        value: 'Pied Piper',
        color: '#388e3c',
        dataKey: 'pied-piper',
        integrationType: 'API',
        brandName: 'Pied Piper',
        inputChallengePrompts: PIED_PIPER_PROMPTS,
      },
      {
        uuid: '8a9b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d',
        value: 'Aviato',
        color: '#d32f2f',
        dataKey: 'aviato',
        integrationType: 'Semi-Hosted',
        brandName: 'Aviato',
        // No inputChallengePrompts — hovering this entry shows nothing.
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hover each legend entry. Acme and Pied Piper show their challenge prompts; Aviato has none configured, so its entry renders without a tooltip.',
      },
    },
  },
};

export const NoPromptsAnywhere: Story = {
  args: {
    showUuid: true,
    payload: [
      {
        uuid: 'c44d24d0-8cef-4fcc-ad37-1fe154d97e57',
        value: 'Acme Corp',
        color: '#1976d2',
        dataKey: 'acme',
        integrationType: 'SDK',
        brandName: 'Acme Corp',
      },
      {
        uuid: '42f12a06-47a7-46bf-901b-e4a8227266d0',
        value: 'Pied Piper',
        color: '#388e3c',
        dataKey: 'pied-piper',
        integrationType: 'API',
        brandName: 'Pied Piper',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Baseline: legend without any challenge prompts (e.g. Health, Verify, TTS charts). Hover does nothing.',
      },
    },
  },
};
