import { useMemo } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';

import { inputStyle, readOnlyInputStyle } from '../../../styles/input';

import { When } from '../../shared/When';
import { useCredentialsDisplay } from '../../CredentialsDisplay/CredentialsDisplayContext';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import { findCorrectSchemaProperty } from '../../CredentialsDisplay/utils';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldLegend } from '..';

type DataFieldInputSelectProps = {
  hasMultipleInstances?: boolean;
};

/**
 * This component manages the input of type Select.
 * @constructor
 */
export function DataFieldInputSelect(props: DataFieldInputSelectProps) {
  const { schema } = useCredentialsDisplay();
  const { credentialDisplayInfo, parentFieldSet } = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();

  const schemaProperty = findCorrectSchemaProperty(
    credentialDisplayInfo.schema,
    schema,
    parentFieldSet,
  );

  // Format the options in label/value keypair.
  const options = useMemo(() => {
    return (schemaProperty?.input?.options || []).map((option: any) => {
      if (typeof option === 'string') return { label: option, value: option };
      return option;
    });
  }, [schemaProperty?.input?.options]);

  const value = useMemo(() => {
    const option = options.find(
      (option: any) => option.value === credentialDisplayInfo.value,
    );
    return option?.value || undefined;
  }, [credentialDisplayInfo, options]);

  const textFieldStyle: TextFieldProps = {
    ...inputStyle,
    ...readOnlyInputStyle,
    select: false,
    label: <DataFieldLabelText />,
    value,
    InputProps: {
      readOnly: true,
      // prevent this element from being recorded by Sentry
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // 'data-sentry-mask':
      //   appContext.config.env.env === 'production' || undefined,
    },
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
