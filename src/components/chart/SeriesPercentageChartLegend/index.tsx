import { Box, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { AnimatePresence } from 'framer-motion';
import { type ReactElement } from 'react';
import { type LegendProps } from 'recharts';

import { MotionStack } from '../../animation';
import { CopyableUuid } from '../../CopyableUuid';
import {
  BrandChallengePromptsTooltip,
  type ChallengePrompt,
} from '../../BrandChallengePromptsTooltip';

type CustomPayload = {
  uuid: string;
  value: string;
  color: string;
  dataKey: string;
  integrationType?: string;
  brandName?: string;
  inputChallengePrompts?: readonly ChallengePrompt[];
};

function EntryBlock({
  entry,
  showUuid = true,
}: Readonly<{
  entry: CustomPayload;
  showUuid?: boolean;
}>): ReactElement {
  return (
    <MotionStack
      direction='row'
      spacing={1}
      sx={{
        color: entry.color,
      }}
      layout='position'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        sx={{
          width: '3px',
          height: '100%',
          backgroundColor: entry.color,
          borderRadius: 3,
        }}
      />
      <Stack>
        <Typography variant='body1'>{entry.value}</Typography>
        {entry.brandName && (
          <Typography variant='body2'>{entry.brandName}</Typography>
        )}
        {entry.integrationType && (
          <Typography variant='body2'>{entry.integrationType}</Typography>
        )}
        {showUuid && entry.uuid && (
          <CopyableUuid
            uuid={entry.uuid}
            label='UUID'
            head={5}
            tail={0}
            variant='text'
            mono={false}
            typographyProps={{ color: 'inherit' }}
          />
        )}
      </Stack>
    </MotionStack>
  );
}

interface SeriesPercentageChartLegendProps
  extends Omit<LegendProps, 'payload'> {
  showUuid?: boolean;
  payload?: CustomPayload[];
  showChallengePromptsTooltip?: boolean;
}

export function SeriesPercentageChartLegend(
  props: Readonly<SeriesPercentageChartLegendProps>,
): ReactElement {
  const { payload, showChallengePromptsTooltip = false } = props;

  return (
    <Grid2
      container
      direction='row'
      component='ul'
      gap={2}
      sx={{
        mt: 2,
        pl: 0,
        listStyle: 'none',
        justifyContent: 'flex-start',
        alignItem: 'center',
        flexWrap: 'wrap',
      }}
    >
      <AnimatePresence>
        {payload?.map((entry) => (
          <Grid2 key={`item-${entry.uuid}-${entry.value}`} component='li'>
            {showChallengePromptsTooltip ? (
              <BrandChallengePromptsTooltip
                prompts={entry.inputChallengePrompts}
              >
                <EntryBlock entry={entry} showUuid={props.showUuid} />
              </BrandChallengePromptsTooltip>
            ) : (
              <EntryBlock entry={entry} showUuid={props.showUuid} />
            )}
          </Grid2>
        ))}
      </AnimatePresence>
    </Grid2>
  );
}
