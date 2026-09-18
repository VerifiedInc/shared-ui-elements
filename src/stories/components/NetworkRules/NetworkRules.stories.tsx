import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { QueryClient } from '@tanstack/react-query';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import {
  NetworkRuleDeleteDialog,
  NetworkRuleEditorDialog,
  NetworkRulesProvider,
  NetworkRulesTable,
  networkRulesCatalogQueryKey,
  renamePresetInRule,
  type NetworkRuleData,
  type NetworkRuleSubmitExtras,
  type NetworkRulesServices,
  useNetworkRulesDialogs,
  type NetworkRule,
} from '../../../components/NetworkRules';

import {
  createStoryServices,
  exampleRules,
  saveStoryPresets,
} from './fixtures';

const sleep = async (ms: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Everything a host wires, in memory: rules in state, presets in the story catalog, and every call
 * the host receives logged to the Actions panel. Name a rule "duplicate" to see server-side errors
 * surface in the editor; a preset containing "refuse" is rejected, so the preset dialogs' error
 * path can be seen too.
 */
function FullExample({ readOnly = false }: Readonly<{ readOnly?: boolean }>) {
  const [rules, setRules] = useState<NetworkRule[]>(exampleRules);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogs = useNetworkRulesDialogs();

  // Shared with the services, so a preset stored on submit can be refetched into the dropdowns.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
        },
      }),
  );
  const services = useMemo<NetworkRulesServices>(
    () => ({
      ...createStoryServices({
        // "Edit existing rules that use this preset": patch every rule that carries it.
        renamePresetInRules: (field, from, to) => {
          action('host.renamePresetInRules')({ field, from, to });
          setRules((current) =>
            current.map((rule) => ({
              ...rule,
              ...renamePresetInRule(rule, field, from, to),
            })),
          );
        },
      }),
      queryClient,
    }),
    [queryClient],
  );

  const handleSubmit = async (
    body: NetworkRuleData,
    { presets }: NetworkRuleSubmitExtras,
  ): Promise<void> => {
    action('host.onSubmit')(body, { presets });
    setIsSubmitting(true);
    await sleep(600);

    if (body.name.toLowerCase().includes('duplicate')) {
      setIsSubmitting(false);
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

    // Presets the host could not store when they were picked; stored with the rule, as the
    // Dashboard does, and refetched so the dropdowns offer them.
    if (Object.keys(presets).length > 0) {
      action('host.savePresetsOnSubmit')(presets);
      saveStoryPresets(presets);
      await queryClient.invalidateQueries({
        queryKey: networkRulesCatalogQueryKey(),
      });
    }

    const editing = dialogs.editor.rule;
    setRules((current) =>
      editing
        ? current.map((rule) =>
            rule.uuid === editing.uuid ? { ...rule, ...body } : rule,
          )
        : [...current, { uuid: `new-${Date.now()}`, ...body }],
    );
    setIsSubmitting(false);
    dialogs.closeEditor();
  };

  const handleConfirmDelete = (rule: NetworkRule, conditionIndex?: number) => {
    action('host.onConfirmDelete')(rule.name, { conditionIndex });
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
    <NetworkRulesProvider services={services}>
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
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
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
          Network rules are evaluated only when you run an eligibility check,
          not just an insurance autofill. You can automatically run checks after
          autofills by setting the Check After Autofill setting to On.
        </Alert>

        <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
          <NetworkRulesTable
            rules={rules}
            readOnly={readOnly}
            maxHeight='100%'
            onToggleEnabled={(rule, enabled) => {
              action('host.onToggleEnabled')(rule.name, enabled);
              setRules((current) =>
                current.map((candidate) =>
                  candidate.uuid === rule.uuid
                    ? { ...candidate, enabled }
                    : candidate,
                ),
              );
            }}
            onEdit={(rule) => {
              action('host.onEdit')(rule.name);
              dialogs.tableHandlers.onEdit(rule);
            }}
            onDelete={(rule) => {
              action('host.onDelete')(rule.name);
              dialogs.tableHandlers.onDelete(rule);
            }}
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
    </NetworkRulesProvider>
  );
}

const meta: Meta<typeof FullExample> = {
  title: 'Components/NetworkRules/Full Example',
  component: FullExample,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FullExample>;

export const Default: Story = {};

export const Viewer: Story = {
  args: { readOnly: true },
};
