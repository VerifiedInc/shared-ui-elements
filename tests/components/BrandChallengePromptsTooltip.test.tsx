import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

import {
  BrandChallengePromptsTooltip,
  LazyBrandChallengePromptsTooltip,
  type ChallengePrompt,
} from '../../src/components/BrandChallengePromptsTooltip';

const PROMPTS: ChallengePrompt[] = [
  { type: 'birthDate', promptForChallenge: 'always' },
  { type: 'ssn4', promptForChallenge: 'ifNecessary' },
];

afterEach(() => {
  cleanup();
});

describe('<BrandChallengePromptsTooltip/>', () => {
  test('renders prompts on hover', async () => {
    const { getByText, findByRole } = render(
      <BrandChallengePromptsTooltip prompts={PROMPTS}>
        <span>Acme</span>
      </BrandChallengePromptsTooltip>,
    );

    fireEvent.mouseOver(getByText('Acme'));

    const tooltip = await findByRole('tooltip');
    expect(tooltip.textContent).toContain('Birth Date: Always');
    expect(tooltip.textContent).toContain('SSN (last 4): If Necessary');
  });

  test('trigger is keyboard-focusable', () => {
    // Real focus-visible activation is browser-only; jsdom can't simulate it.
    // Assert the structural prerequisite: tabIndex=0 on the wrapping span.
    const { getByText } = render(
      <BrandChallengePromptsTooltip prompts={PROMPTS}>
        <span>Acme</span>
      </BrandChallengePromptsTooltip>,
    );

    const trigger = getByText('Acme').parentElement!;
    expect(trigger.getAttribute('tabindex')).toBe('0');
  });

  test('renders children unwrapped when prompts is undefined or empty', () => {
    const { getByText, queryByRole, rerender } = render(
      <BrandChallengePromptsTooltip prompts={undefined}>
        <span>Acme</span>
      </BrandChallengePromptsTooltip>,
    );
    fireEvent.mouseOver(getByText('Acme'));
    expect(queryByRole('tooltip')).toBeNull();

    rerender(
      <BrandChallengePromptsTooltip prompts={[]}>
        <span>Acme</span>
      </BrandChallengePromptsTooltip>,
    );
    fireEvent.mouseOver(getByText('Acme'));
    expect(queryByRole('tooltip')).toBeNull();
  });
});

describe('<LazyBrandChallengePromptsTooltip/>', () => {
  test('does not mount Tooltip until hovered, then shows it on subsequent hover', async () => {
    const { getByText, queryByRole, findByRole } = render(
      <LazyBrandChallengePromptsTooltip prompts={PROMPTS}>
        Acme
      </LazyBrandChallengePromptsTooltip>,
    );

    // Pre-activation: no tooltip role anywhere.
    expect(queryByRole('tooltip')).toBeNull();

    // First mouseOver activates the lazy wrapper; the Tooltip mounts on
    // subsequent interaction.
    fireEvent.mouseOver(getByText('Acme'));
    fireEvent.mouseOver(getByText('Acme'));

    const tooltip = await findByRole('tooltip');
    expect(tooltip.textContent).toContain('Birth Date: Always');
  });

  test('stays inert when prompts empty', () => {
    const { getByText, queryByRole } = render(
      <LazyBrandChallengePromptsTooltip prompts={[]}>
        Acme
      </LazyBrandChallengePromptsTooltip>,
    );

    fireEvent.mouseOver(getByText('Acme'));
    fireEvent.mouseOver(getByText('Acme'));

    expect(queryByRole('tooltip')).toBeNull();
  });
});
