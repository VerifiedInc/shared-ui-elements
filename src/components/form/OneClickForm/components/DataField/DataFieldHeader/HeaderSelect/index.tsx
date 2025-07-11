import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

import { inputStyle } from '../../../../styles/input';

import { CredentialDisplayInfo } from '../../../CredentialsDisplay/types';
import { useCredentialsDisplayItem } from '../../../CredentialsDisplay/CredentialsDisplayItemContext';
import { isNewCredentialValues } from '../../../CredentialsDisplay/utils/isNewCredentialValues';

import { renderInstance } from '../../DataFieldHeader/HeaderSelect/utils';
import { styles } from '../../DataFieldHeader/HeaderSelect/styles';

export function HeaderSelect(): ReactElement {
  const { credentialDisplayInfo, handleChangeCredentialInstance } =
    useCredentialsDisplayItem();
  const _styles = styles();

  const isNewCredential = isNewCredentialValues(credentialDisplayInfo);

  const inputRef = useRef<HTMLDivElement | undefined>(undefined);
  const [inputWidth, setInputWidth] = useState<string | undefined>(undefined);

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

  const textFieldProps: TextFieldProps = {
    ...inputStyle,
    ref: (ref) => {
      ref && (inputRef.current = ref);
    },
    select: true,
    variant: 'outlined',
    'aria-label':
      instances.length <= 1
        ? `Current ${credentialDisplayInfo.label}`
        : `Select ${credentialDisplayInfo.label}`,
    // When the credential is new, it should display with placeholder the select component.
    value: isNewCredential ? undefined : credentialDisplayInfo.id,
    helperText: credentialDisplayInfo.credentialRequest.description,
    onChange: (e) => {
      // Prevent the event to propagate to the parent.
      e.stopPropagation();
      e.preventDefault();
      handleChangeCredentialInstance(e.target.value);
    },
    InputProps: {
      tabIndex: instances.length <= 1 ? -1 : 0,
      readOnly: instances.length <= 1,
    },
    SelectProps: {
      size: 'small',
      onClose: (e) => {
        // Prevent the event to propagate to the parent.
        e.stopPropagation();
        e.preventDefault();
      },
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
      ..._styles.fieldInputDisabledStyle,
      ...(instances.length <= 1 && (_styles.fieldInputReadonlyStyle as any)),
      '& div[role="combobox"]': {
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        whiteSpace: 'break-spaces!important',
      },
      '& .MuiSelect-select': {
        display: 'block',
        alignItems: 'center',
        whiteSpace: 'break-spaces!important',
      },
      '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .Mui-disabled.MuiSelect-icon': {
        display: 'none',
      },
      '& .Mui-disabled': {
        color: (theme) => `${theme.palette.text.primary}`,
        WebkitTextFillColor: (theme) => `${theme.palette.text.primary}`,
      },
      '& .MuiFormHelperText-root': {
        ml: instances.length <= 1 ? 0 : undefined,
      },
    },
  };

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
    <TextField {...textFieldProps}>
      {instances.map(renderInstance(false))}
    </TextField>
  );
}
