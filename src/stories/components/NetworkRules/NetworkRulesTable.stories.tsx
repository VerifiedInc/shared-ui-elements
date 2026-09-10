import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box } from '@mui/material';

import {
  NetworkRulesProvider,
  NetworkRulesTable,
} from '../../../components/NetworkRules';

import { createStoryServices, exampleRules } from './fixtures';

const meta: Meta<typeof NetworkRulesTable> = {
  title: 'Components/NetworkRules/NetworkRulesTable',
  component: NetworkRulesTable,
  decorators: [
    (Story, context) => (
      <NetworkRulesProvider
        services={createStoryServices(context.parameters.services)}
      >
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            boxSizing: 'border-box',
          }}
        >
          <Story />
        </Box>
      </NetworkRulesProvider>
    ),
  ],
  args: {
    rules: exampleRules,
    maxHeight: '100%',
    onToggleEnabled: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onAddCondition: fn(),
    onEditCondition: fn(),
    onDeleteCondition: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof NetworkRulesTable>;

export const Default: Story = {};

export const ReadOnly: Story = {
  args: { readOnly: true },
};

export const Loading: Story = {
  args: { rules: [], isLoading: true },
};

export const Empty: Story = {
  args: { rules: [] },
};

export const CatalogUnavailable: Story = {
  parameters: { services: { failCatalog: true, catalogDelayMs: 300 } },
};

export const WithoutPayersSource: Story = {
  parameters: { services: { withoutPayersSource: true } },
};
