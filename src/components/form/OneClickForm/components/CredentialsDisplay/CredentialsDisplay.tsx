import { ReactElement, useCallback } from 'react';
import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { DataFieldRootStack } from '../DataField/DataFieldRootStack';
import { DataFieldComposite } from '../DataField/DataFieldComposite';
import { DataFieldAtomic } from '../DataField/DataFieldAtomic';

import { CredentialFieldSet } from './types';
import { extractChildrenFromCredentialFieldSet } from './utils';
import { EditModeButton } from './components';
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
          <CredentialsDisplayItem key={id} providerProps={providerProps}>
            <DataFieldComposite>
              {Object.entries(childs).map((entry) => {
                return renderCredentialDisplayInfo(entry, [...parents, key]);
              })}
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
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        <EditModeButton />
        <DataFieldRootStack>
          {Object.entries(data).map((entry) =>
            renderCredentialDisplayInfo(entry),
          )}
        </DataFieldRootStack>
      </Box>
    </Box>
  );
}
