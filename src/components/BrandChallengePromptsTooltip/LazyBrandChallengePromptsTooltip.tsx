import { useState, type ReactElement, type ReactNode } from 'react';

import {
  BrandChallengePromptsTooltip,
  type BrandChallengePromptsTooltipProps,
} from './BrandChallengePromptsTooltip';

interface LazyProps
  extends Omit<BrandChallengePromptsTooltipProps, 'children'> {
  children: ReactNode;
}

/**
 * Defers mounting the underlying MUI `Tooltip` until the trigger is hovered or
 * focused. Use in dense surfaces (e.g. tables with 50+ rows) to avoid the
 * documented Popper-render cost of mounting one Tooltip per row up front
 * (see MUI #27057, #41144).
 *
 * For sparse surfaces (chart legend with <50 entries), prefer
 * `<BrandChallengePromptsTooltip>` directly — the lazy-mount wrapper has no
 * benefit and the extra re-render hurts.
 */
export function LazyBrandChallengePromptsTooltip({
  prompts,
  children,
}: Readonly<LazyProps>): ReactElement {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      // The wrapper is a focusable info-only trigger that swaps in the real
      // Tooltip on first hover/focus. It's not a button (no click action) and
      // not a link, so the standard a11y interactive-element rules don't fit.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex
      <span
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onMouseEnter={() => setActive(true)}
        onFocus={() => setActive(true)}
      >
        {children}
      </span>
    );
  }

  return (
    <BrandChallengePromptsTooltip prompts={prompts}>
      {children}
    </BrandChallengePromptsTooltip>
  );
}
