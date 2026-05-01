import { Box, Tooltip, Typography } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';

import { formatChallengePrompt, type ChallengePrompt } from './format';

export type { ChallengePrompt } from './format';
export { LazyBrandChallengePromptsTooltip } from './LazyBrandChallengePromptsTooltip';

export interface BrandChallengePromptsTooltipProps {
  prompts?: readonly ChallengePrompt[];
  children: ReactNode;
}

/**
 * Wraps `children` with a hover tooltip listing the brand's challenge prompts.
 * When `prompts` is empty or undefined, renders `children` unwrapped, no
 * tooltip mounts, so dense surfaces (e.g. billing tables with many rows) pay
 * zero per-row Popper cost when there's nothing to show.
 */
export function BrandChallengePromptsTooltip({
  prompts,
  children,
}: Readonly<BrandChallengePromptsTooltipProps>): ReactElement {
  if (!prompts || prompts.length === 0) {
    return <>{children}</>;
  }

  const body = (
    <Box>
      {prompts.map((prompt) => (
        <Typography
          key={`${prompt.type}-${prompt.promptForChallenge}`}
          variant='caption'
          component='div'
        >
          {formatChallengePrompt(prompt)}
        </Typography>
      ))}
    </Box>
  );

  return (
    <Tooltip title={body} describeChild placement='top' arrow enterDelay={300}>
      {/*
       * `tabIndex={0}` makes the wrapper focusable so the tooltip surfaces on
       * keyboard navigation. MUI Tooltip requires a focusable child for that;
       * The span pattern matches MUI's documented guidance for info-only tooltip triggers.
       */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <span tabIndex={0}>{children}</span>
    </Tooltip>
  );
}
