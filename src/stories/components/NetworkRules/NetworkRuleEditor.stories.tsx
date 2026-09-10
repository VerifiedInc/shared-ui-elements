import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import {
  NetworkRuleEditorDialog,
  NetworkRuleEditorForm,
  NetworkRulesProvider,
  type NetworkRuleData,
  type NetworkRuleEditorDialogProps,
  type NetworkRuleServerError,
} from '../../../components/NetworkRules';

import {
  createStoryServices,
  exampleNotePresets,
  exampleRules,
} from './fixtures';

const meta: Meta<typeof NetworkRuleEditorDialog> = {
  title: 'Components/NetworkRules/NetworkRuleEditor',
  component: NetworkRuleEditorDialog,
  decorators: [
    (Story, context) => (
      <NetworkRulesProvider
        services={createStoryServices(context.parameters.services)}
      >
        <Box sx={{ p: 2 }}>
          <Story />
        </Box>
      </NetworkRulesProvider>
    ),
  ],
  args: {
    notePresets: exampleNotePresets,
    canCreateNotePresets: true,
  },
};

export default meta;
type Story = StoryObj<typeof NetworkRuleEditorDialog>;

function DialogHarness(
  props: Readonly<
    Omit<NetworkRuleEditorDialogProps, 'open' | 'onClose' | 'onSubmit'>
  >,
) {
  const [open, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<NetworkRuleData | null>(null);

  return (
    <Stack spacing={2}>
      <Button
        variant='contained'
        onClick={() => {
          setOpen(true);
        }}
      >
        Open editor
      </Button>
      <NetworkRuleEditorDialog
        {...props}
        open={open}
        isSubmitting={isSubmitting}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setIsSubmitting(false);
          setSubmitted(values);
          setOpen(false);
        }}
      />
      {submitted && (
        <Paper variant='outlined' sx={{ p: 2 }}>
          <Typography variant='subtitle2'>Submitted</Typography>
          <pre style={{ margin: 0, fontSize: 12 }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </Paper>
      )}
    </Stack>
  );
}

export const Create: Story = {
  render: (args) => <DialogHarness {...args} />,
};

export const Edit: Story = {
  render: (args) => <DialogHarness {...args} rule={exampleRules[0]} />,
};

export const AddCondition: Story = {
  render: (args) => (
    <DialogHarness {...args} rule={exampleRules[1]} appendEmptyCondition />
  ),
};

const serverErrors: NetworkRuleServerError[] = [
  {
    index: 1,
    key: 'payerId',
    operator: 'EQUAL',
    code: 'UNKNOWN_ENUM_VALUE',
    message: 'Payer V100006 is not a known payer.',
  },
  {
    code: 'DUPLICATE_CONDITIONS',
    message: 'Another rule already has exactly these conditions.',
  },
];

export const WithServerErrors: Story = {
  render: (args) => (
    <DialogHarness
      {...args}
      rule={exampleRules[0]}
      serverErrors={serverErrors}
    />
  ),
};

export const CatalogUnavailable: Story = {
  parameters: { services: { failCatalog: true, catalogDelayMs: 300 } },
  render: (args) => <DialogHarness {...args} />,
};

export const FormOnly: Story = {
  render: (args) => (
    <Paper variant='outlined' sx={{ p: 3, maxWidth: 960 }}>
      <NetworkRuleEditorForm
        notePresets={args.notePresets}
        canCreateNotePresets={args.canCreateNotePresets}
        rule={exampleRules[2]}
        onSubmit={fn()}
        onCancel={fn()}
      />
    </Paper>
  ),
};
