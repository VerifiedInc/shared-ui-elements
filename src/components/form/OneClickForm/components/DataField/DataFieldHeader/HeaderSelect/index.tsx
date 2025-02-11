import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, SxProps, TextField, TextFieldProps } from '@mui/material';
import { Add } from '@mui/icons-material';

import { Button } from '../../../../../../Button';

import { inputStyle } from '../../../../styles/input';

import { CredentialDisplayInfo } from '../../../CredentialsDisplay/types';
import { useCredentialsDisplayItem } from '../../../CredentialsDisplay/CredentialsDisplayItemContext';
import { isNewCredentialValues } from '../../../CredentialsDisplay/utils/isNewCredentialValues';

import { DataFieldLabelText } from '../../';
import { renderInstance } from '../../DataFieldHeader/HeaderSelect/utils';
import { styles } from '../../DataFieldHeader/HeaderSelect/styles';

export function HeaderSelect() {
  const {
    credentialDisplayInfo,
    handleChangeCredentialInstance,
    handleToggleEditModeCredential,
  } = useCredentialsDisplayItem();
  const _styles = styles();

  const isNewCredential = isNewCredentialValues(credentialDisplayInfo);

  const allowUserInput =
    credentialDisplayInfo.credentialRequest?.allowUserInput;

  const inputRef = useRef<HTMLDivElement | undefined>(undefined);
  const [inputWidth, setInputWidth] = useState<string | undefined>(undefined);

  const boxStyle: Record<string, SxProps> | undefined = useMemo(() => {
    const isTallerBox = ['AddressCredential'].includes(
      credentialDisplayInfo.credentialRequest?.type ?? 'unknown',
    );

    if (isTallerBox) {
      return {
        '& div[role="combobox"]': {
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
          whiteSpace: 'unset !important',
        },
      };
    }

    return undefined;
  }, [credentialDisplayInfo.credentialRequest?.type]);

  const textFieldProps: TextFieldProps = {
    ...inputStyle,
    ref: (ref) => {
      ref && (inputRef.current = ref);
    },
    select: true,
    variant: 'outlined',
    label: <DataFieldLabelText />,
    // When the credential is new, it should display with placeholder the select component.
    value: isNewCredential ? undefined : credentialDisplayInfo.id,
    onChange: (e) => handleChangeCredentialInstance(e.target.value),
    SelectProps: {
      MenuProps: {
        slotProps: {
          paper: {
            sx: {
              width: inputWidth,
            },
          },
        },
      },
    },
    sx: {
      width: '100%',
      ...boxStyle,
      ..._styles.fieldInputDisabledStyle,
      '& .MuiSelect-select': {
        display: 'block',
        alignItems: 'center',
        whiteSpace: 'nowrap!important',
      },
      '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .Mui-disabled.MuiSelect-icon': {
        display: 'none',
      },
    },
  };

  // Replace from instances list the actual display info, so all changes that happens there reflects into the select UI.
  const instances = useMemo(() => {
    const hasInstances = credentialDisplayInfo.instances.length > 0;
    const instances = hasInstances ? credentialDisplayInfo.instances : [];
    return instances
      .filter((instance: any) => !isNewCredentialValues(instance))
      .map((instanceCredentialDisplayInfo: CredentialDisplayInfo) =>
        instanceCredentialDisplayInfo.id === credentialDisplayInfo.id
          ? credentialDisplayInfo
          : instanceCredentialDisplayInfo,
      );
  }, [credentialDisplayInfo]);

  // Observe the input width to set the menu width.
  useEffect(() => {
    const input = inputRef.current;

    if (!input) return;

    // Create a new instance of ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Set the new width whenever it changes
        setInputWidth(`${entry.contentRect.width}px`);
      }
    });

    // Start observing the target element
    resizeObserver.observe(input);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <TextField
      {...textFieldProps}
      disabled={!allowUserInput && instances.length <= 0}
    >
      {instances.map(renderInstance(false))}
      {allowUserInput && (
        <Box sx={_styles.menuStyle}>
          <Button
            variant='text'
            onClick={() => handleToggleEditModeCredential(true)}
            startIcon={<Add />}
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              px: 2,
              py: 1,
              borderRadius: 0,
              color: 'inherit',
            }}
          >
            Add New
          </Button>
        </Box>
      )}
    </TextField>
  );
}
