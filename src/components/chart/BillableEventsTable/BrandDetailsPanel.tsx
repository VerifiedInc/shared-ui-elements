import { Box, Stack, Typography } from '@mui/material';

import { CopyableUuid } from '../../CopyableUuid';
import type { BrandProviders, ChallengePrompt } from './BillableEventsTable.types';
import {
  formatChallengeInput,
  formatHealthDataProviderMode,
  formatPromptForChallenge,
} from './format';

interface BrandDetailsPanelProps {
  brandUuid: string;
  customerUuid?: string;
  challengePrompts?: ChallengePrompt[];
  providers?: BrandProviders;
}

const SECTION_HEADER_SX = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 0.6,
  textTransform: 'uppercase' as const,
  color: 'text.primary',
  mb: 1.5,
};

const PRODUCT_HEADER_SX = {
  fontSize: 14,
  fontWeight: 700,
  color: 'text.primary',
  mb: 1,
};

const SUBSECTION_HEADER_SX = {
  fontSize: 12,
  fontWeight: 600,
  color: 'text.secondary',
  mb: 0.5,
};

const LIST_SX = {
  m: 0,
  pl: 3,
  '& li': { mb: 0.25 },
  '& li::marker': {
    color: 'text.secondary',
    fontWeight: 500,
  },
};

const IDENTIFIER_LABEL_SX = {
  fontSize: 12,
  color: 'text.secondary',
  mr: 0.75,
};

export function BrandDetailsPanel({
  brandUuid,
  customerUuid,
  challengePrompts,
  providers,
}: Readonly<BrandDetailsPanelProps>): JSX.Element {
  const hasSignupProviders = Boolean(
    providers?.allowedProviders && providers.allowedProviders.length > 0,
  );
  const hasHealth = Boolean(
    providers &&
      ((providers.healthDataProviders &&
        providers.healthDataProviders.length > 0) ||
        providers.healthDataProviderMode),
  );

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={3}>
        <IdentifiersSection
          brandUuid={brandUuid}
          customerUuid={customerUuid}
        />
        <SettingsSection
          challengePrompts={challengePrompts}
          providers={providers}
          hasSignupProviders={hasSignupProviders}
          hasHealth={hasHealth}
        />
      </Stack>
    </Box>
  );
}

function IdentifiersSection({
  brandUuid,
  customerUuid,
}: Readonly<{ brandUuid: string; customerUuid?: string }>): JSX.Element {
  return (
    <Box>
      <Typography sx={SECTION_HEADER_SX}>Identifiers</Typography>
      <Stack
        direction={{ xs: 'column', sm: 'column' }}
        spacing={{ xs: 0.5, sm: 0.5 }}
      >
        <IdentifierField label='Brand UUID' value={brandUuid} />
        {customerUuid && (
          <IdentifierField label='Customer UUID' value={customerUuid} />
        )}
      </Stack>
    </Box>
  );
}

function IdentifierField({
  label,
  value,
}: Readonly<{ label: string; value: string }>): JSX.Element {
  return (
    <Stack direction='row' alignItems='center'>
      <Typography component='span' sx={IDENTIFIER_LABEL_SX}>
        {label}:
      </Typography>
      <CopyableUuid
        uuid={value}
        label={label}
        variant='button'
        head={36}
        mono
        typographyProps={{ fontWeight: 800 }}
        iconSx={{ fontSize: 14, p: 0.125 }}
      />
    </Stack>
  );
}

function SettingsSection({
  challengePrompts,
  providers,
  hasSignupProviders,
  hasHealth,
}: Readonly<{
  challengePrompts?: ChallengePrompt[];
  providers?: BrandProviders;
  hasSignupProviders: boolean;
  hasHealth: boolean;
}>): JSX.Element {
  return (
    <Box>
      <Typography sx={SECTION_HEADER_SX}>Settings</Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems='flex-start'
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <OneClickSignupColumn
            challengePrompts={challengePrompts}
            allowedProviders={providers?.allowedProviders}
            hasSignupProviders={hasSignupProviders}
          />
        </Box>
        {hasHealth && providers && (
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <OneClickHealthColumn providers={providers} />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

function OneClickSignupColumn({
  challengePrompts,
  allowedProviders,
  hasSignupProviders,
}: Readonly<{
  challengePrompts?: ChallengePrompt[];
  allowedProviders?: string[];
  hasSignupProviders: boolean;
}>): JSX.Element {
  return (
    <Box>
      <Typography sx={PRODUCT_HEADER_SX}>1-Click Signup</Typography>
      <Stack spacing={1.5}>
        <ChallengesSubsection prompts={challengePrompts} />
        {hasSignupProviders && allowedProviders && (
          <DataProvidersSubsection providers={allowedProviders} ordered />
        )}
      </Stack>
    </Box>
  );
}

function OneClickHealthColumn({
  providers,
}: Readonly<{ providers: BrandProviders }>): JSX.Element {
  const healthProviders = providers.healthDataProviders ?? [];
  const isParallel = providers.healthDataProviderMode === 'parallel';

  return (
    <Box>
      <Typography sx={PRODUCT_HEADER_SX}>1-Click Health</Typography>
      <DataProvidersSubsection
        providers={healthProviders}
        mode={providers.healthDataProviderMode}
        ordered={!isParallel}
      />
    </Box>
  );
}

function ChallengesSubsection({
  prompts,
}: Readonly<{ prompts?: ChallengePrompt[] }>): JSX.Element {
  return (
    <Box>
      <Typography sx={SUBSECTION_HEADER_SX}>Challenges</Typography>
      {prompts && prompts.length > 0 ? (
        <Box component='ol' sx={LIST_SX}>
          {prompts.map((prompt, index) => (
            <Typography
              key={`${prompt.type}-${index}`}
              component='li'
              variant='body2'
            >
              {formatChallengeInput(prompt.type)} (
              {formatPromptForChallenge(prompt.promptForChallenge)})
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography
          variant='body2'
          color='text.secondary'
          fontStyle='italic'
          sx={{ pl: 1 }}
        >
          None configured
        </Typography>
      )}
    </Box>
  );
}

function DataProvidersSubsection({
  providers,
  mode,
  ordered,
}: Readonly<{ providers: string[]; mode?: string, ordered: boolean }>): JSX.Element {
  if (providers.length === 0) {
    return (
      <Box>
        <Typography sx={SUBSECTION_HEADER_SX}>Data Providers</Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          fontStyle='italic'
          sx={{ pl: 1 }}
        >
          None configured
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={SUBSECTION_HEADER_SX}>Data Providers</Typography>
      {mode && (
        <Stack
          direction='row'
          alignItems='baseline'
          spacing={0.5}
          sx={{ mb: 0.5 }}
        >
          <Typography component='span' sx={IDENTIFIER_LABEL_SX}>
            Mode:
          </Typography>
          <Typography component='span' variant='body2' fontWeight={600}>
            {formatHealthDataProviderMode(mode)}
          </Typography>
        </Stack>
      )}
      <Box component={ordered ? 'ol' : 'ul'} sx={LIST_SX}>
        {providers.map((provider, index) => (
          <Typography
            key={`${provider}-${index}`}
            component='li'
            variant='body2'
          >
            {provider}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
