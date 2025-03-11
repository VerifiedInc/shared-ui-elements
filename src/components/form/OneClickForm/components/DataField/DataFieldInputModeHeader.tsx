import { ReactElement } from 'react';
import { Stack, SxProps } from '@mui/material';

import { When } from '../../components/shared/When';

import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldInputLabel } from './DataFieldInputLabel';
import { DataFieldLabelText } from './DataFieldLabelText';

type DataFieldInputModeHeaderProps = {
  sx?: SxProps;
};

/**
 * Component that displays the header on input mode for a data field.
 * @constructor
 */
export function DataFieldInputModeHeader(
  props: Readonly<DataFieldInputModeHeaderProps>,
): ReactElement | null {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const instancesLength = credentialDisplayInfo.instances.length;
  const isComposite = credentialDisplayInfo.children?.length;
  const hasMoreInstances = instancesLength > 1;

  if (!isComposite && !hasMoreInstances) return null;

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      spacing={1}
      mb={2}
      {...props}
    >
      <When value={isComposite}>
        <DataFieldInputLabel label={<DataFieldLabelText />} />
      </When>
    </Stack>
  );
}
