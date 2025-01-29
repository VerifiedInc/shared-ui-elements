import { Box, TextField, TextFieldProps } from '@mui/material';

import { inputStyle, readOnlyInputStyle } from '../../../styles/input';
import { formatCredentialValue } from '../../../utils/formatCredentialValue';

import { When } from '../../shared/When';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldLegend } from '../';

type DataFieldInputTextProps = {
  hasMultipleInstances?: boolean;
};

/**
 * This component renders and manages the input value for display format Text or to strings.
 * @constructor
 */
export function DataFieldInputText(props: DataFieldInputTextProps) {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  const formattedValue = formatCredentialValue(
    credentialDisplayInfo.value,
    credentialDisplayInfo.displayFormat,
  );

  const inputProps = {
    readOnly: true,
    // prevent this element from being recorded by Sentry
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // 'data-sentry-mask': appContext.config.env.env === 'production' || undefined,
  };

  const textFieldStyle: TextFieldProps = {
    ...inputStyle,
    ...readOnlyInputStyle,
    label: <DataFieldLabelText />,
    value: formattedValue,
    InputProps: inputProps,
    fullWidth: true,
    error: !itemValid.isValid,
    helperText: itemValid.isValid
      ? credentialDisplayInfo.credentialRequest?.description
      : itemValid.errorMessage,
  };

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
      <TextField {...textFieldStyle} />
    </Box>
  );
}
