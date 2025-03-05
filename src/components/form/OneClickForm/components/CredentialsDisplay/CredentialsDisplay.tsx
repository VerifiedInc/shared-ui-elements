import { ReactElement, useCallback } from 'react';
import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { DataFieldStack } from '../DataField/DataFieldStack';
import { DataFieldComposite } from '../DataField/DataFieldComposite';
import { DataFieldAtomic } from '../DataField/DataFieldAtomic';

import { CredentialFieldSet } from './types';
import { extractChildrenFromCredentialFieldSet } from './utils';
import { CredentialsDisplayItem } from './CredentialsDisplayItem';

export default function CredentialsDisplay(): ReactElement {
  const form = useFormContext<CredentialFieldSet>();
  const data = form.watch();

  const renderCredentialDisplayInfo = useCallback(
    (
      credentialFieldSetEntry: [string, CredentialFieldSet],
      parents: string[] = [],
    ): ReactElement => {
      const [key, credentialFieldSet] = credentialFieldSetEntry;

      const { id, credentialDisplayInfo } = credentialFieldSet;
      const childs = extractChildrenFromCredentialFieldSet(credentialFieldSet);
      const hasChildren = Object.keys(childs).length > 0;
      const isRoot = parents.length === 0;
      const path = [...parents, key].map((key) => key).join('.');

      const providerProps = {
        credentialDisplayInfo,
        path,
        isRoot,
      };

      // For credential display with children, we build the parent and recursive render the nodes.
      if (hasChildren) {
        return (
          <CredentialsDisplayItem
            key={id}
            sx={{
              // Decrease bottom spacing for the composed credentials.
              '& > span > div:first-of-type:has(> div:last-child)': {
                marginBottom: 0,
              },
            }}
            providerProps={providerProps}
          >
            <DataFieldComposite>
              <DataFieldStack spacing={2}>
                {Object.entries(childs).map((entry) => {
                  return renderCredentialDisplayInfo(entry, [...parents, key]);
                })}
              </DataFieldStack>
            </DataFieldComposite>
          </CredentialsDisplayItem>
        );
      }

      return (
        <CredentialsDisplayItem key={id} providerProps={providerProps}>
          <DataFieldAtomic />
        </CredentialsDisplayItem>
      );
    },
    [],
  );

  return (
    <Box
      display='flex'
      sx={{
        width: '100%',
        // Traverse the card image elements to apply flex to them.
        '& > div, & > div > div': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        position='relative'
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ flex: 1, width: '100%' }}
      >
        <DataFieldStack>
          {Object.entries(data).map((entry) =>
            renderCredentialDisplayInfo(entry),
          )}
        </DataFieldStack>
      </Box>
    </Box>
  );
}
