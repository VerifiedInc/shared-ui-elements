import { ReactElement } from 'react';
import { Box, TextField } from '@mui/material';

import { formatCredentialValue } from '../../../utils/formatCredentialValue';
import { inputStyle, readOnlyInputStyle } from '../../../styles/input';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import { When } from '../../shared/When';

import { DataFieldLegend } from '../';

type DataFieldInputAddressProps = {
  hasMultipleInstances: boolean;
};

/**
 * This component renders and manages display format Address.
 * @constructor
 */
export function DataFieldInputAddress(
  props: DataFieldInputAddressProps,
): ReactElement {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const formattedValue = formatCredentialValue(
    credentialDisplayInfo.value,
    credentialDisplayInfo.displayFormat,
  );
  const lines = formattedValue.split('\n');

  if (props.hasMultipleInstances) {
    return (
      <When value={credentialDisplayInfo.credentialRequest?.description}>
        <Box width='100%'>
          <DataFieldLegend sx={{ mt: -0.5 }}>
            {credentialDisplayInfo.credentialRequest?.description}
          </DataFieldLegend>
        </Box>
      </When>
    );
  }

  return (
    <Box width='100%'>
      <TextField
        {...inputStyle}
        {...readOnlyInputStyle}
        label={<DataFieldLabelText />}
        value={formattedValue}
        multiline
        rows={lines.length}
        helperText={credentialDisplayInfo.credentialRequest?.description}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
      />
    </Box>
  );
}
