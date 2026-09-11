import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import {
  NetworkRuleDeleteDialog,
  NetworkRuleEditorDialog,
  NetworkRulesProvider,
  NetworkRulesTable,
  type NetworkRuleData,
  type NetworkRuleSubmitExtras,
  useNetworkRulesDialogs,
  type NetworkRule,
} from '../../../components/NetworkRules';

import { createStoryServices, exampleRules } from './fixtures';

const sleep = async (ms: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

// Name a rule "duplicate" to see server-side errors surface in the editor.
function FullExample({ readOnly = false }: Readonly<{ readOnly?: boolean }>) {
  const [rules, setRules] = useState<NetworkRule[]>(exampleRules);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogs = useNetworkRulesDialogs();

  const handleSubmit = async (
    body: NetworkRuleData,
    { presets }: NetworkRuleSubmitExtras,
  ): Promise<void> => {
    setIsSubmitting(true);
    await sleep(600);
    setIsSubmitting(false);

    if (body.name.toLowerCase().includes('duplicate')) {
      dialogs.setServerErrors([
        {
          code: 'DUPLICATE_CONDITIONS',
          message: 'Another rule already has exactly these conditions.',
        },
        {
          index: 0,
          code: 'UNKNOWN_ENUM_VALUE',
          message: 'This value is not in the catalog.',
        },
      ]);
      return;
    }

    // A host would store these on the brand; the catalog serves them back.
    if (Object.keys(presets).length > 0) console.log('presets', presets);

    const editing = dialogs.editor.rule;
    setRules((current) =>
      editing
        ? current.map((rule) =>
            rule.uuid === editing.uuid ? { ...rule, ...body } : rule,
          )
        : [...current, { uuid: `new-${Date.now()}`, ...body }],
    );
    dialogs.closeEditor();
  };

  const handleConfirmDelete = (rule: NetworkRule, conditionIndex?: number) => {
    setRules((current) =>
      conditionIndex === undefined
        ? current.filter((candidate) => candidate.uuid !== rule.uuid)
        : current.map((candidate) =>
            candidate.uuid === rule.uuid
              ? {
                  ...candidate,
                  conditions: candidate.conditions.filter(
                    (_condition, index) => index !== conditionIndex,
                  ),
                }
              : candidate,
          ),
    );
    dialogs.closeDeletion();
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        boxSizing: 'border-box',
        gap: 2,
      }}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography fontSize={22} fontWeight={900}>
          Network Rules
        </Typography>
        {!readOnly && (
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={dialogs.openCreate}
          >
            Create
          </Button>
        )}
      </Stack>

      <Alert severity='warning'>
        Network rules work best (and sometimes can only work at all) when you
        run eligibility checks, not just health insurance autofills. You can
        automatically run checks after autofills by setting the Check After
        Autofill setting above to On.
      </Alert>

      <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
        <NetworkRulesTable
          rules={rules}
          readOnly={readOnly}
          maxHeight='100%'
          onToggleEnabled={(rule, enabled) => {
            setRules((current) =>
              current.map((candidate) =>
                candidate.uuid === rule.uuid
                  ? { ...candidate, enabled }
                  : candidate,
              ),
            );
          }}
          {...dialogs.tableHandlers}
        />
      </Box>

      <NetworkRuleEditorDialog
        {...dialogs.editorDialogProps}
        canCreatePresets={!readOnly}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <NetworkRuleDeleteDialog
        {...dialogs.deleteDialogProps}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}

const meta: Meta<typeof FullExample> = {
  title: 'Components/NetworkRules/Full Example',
  component: FullExample,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, context) => (
      <NetworkRulesProvider
        services={createStoryServices(context.parameters.services)}
      >
        <Story />
      </NetworkRulesProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FullExample>;

export const Default: Story = {};

export const Viewer: Story = {
  args: { readOnly: true },
};
