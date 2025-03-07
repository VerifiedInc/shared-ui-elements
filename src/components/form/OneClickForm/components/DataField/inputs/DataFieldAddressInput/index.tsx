import React, { useRef, memo, ReactElement, useMemo, useState } from 'react';
import { produce } from 'immer';
import isEqual from 'lodash/isEqual';
import {
  Autocomplete,
  Box,
  Paper,
  PaperProps,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { LocationOn } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

import { useDebounceCallback } from '../../../../../../../hooks';

import { fromUSAddress, toUSaddress } from '../../../../utils/addressFormatter';
import { inputStyle } from '../../../../styles/input';

import { CredentialFieldSet } from '../../../CredentialsDisplay/types';
import { extractChildrenFromCredentialFieldSet } from '../../../CredentialsDisplay/utils';
import { useCredentialsDisplayItem } from '../../../CredentialsDisplay/CredentialsDisplayItemContext';
import { useCredentialsDisplayItemValid } from '../../../CredentialsDisplay/hooks';

import { DataFieldLabelText } from '../../DataFieldLabelText';

import { Address, useAutoFill } from './autofill.hook';

type DataFieldAddressInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

type Option = {
  title: string;
  value: google.maps.places.AutocompleteSuggestion | undefined;
};

function CustomPaper(props: PaperProps): ReactElement {
  const theme = useTheme();

  return (
    <Paper {...props}>
      {props.children}
      {/* Legal requirment https://developers.google.com/maps/documentation/javascript/policies#logo */}
      <Box
        sx={(staticTheme) => ({
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          pt: '1px',
          ...staticTheme.applyStyles('dark', {
            opacity: 0.8,
          }),
        })}
      >
        <img
          src={
            theme.palette.mode === 'dark'
              ? 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-non-white3_hdpi.png'
              : 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png'
          }
          alt=''
          width='120'
          height='14'
        />
      </Box>
    </Paper>
  );
}

/**
 * This a memoized component composes the fields of address except line 2.
 * It re-renders from outside if credentialsDisplayItem and itemValid changes.
 */
const DataFieldAddressInputMemoized = memo(
  function DataFieldAddressInputMemoized({
    credentialsDisplayItem,
  }: DataFieldAddressInputMemoizedProps) {
    const form = useFormContext();
    const { objectController } = credentialsDisplayItem;
    const fieldName = objectController.field.name;
    const fieldValue = objectController.field.value;

    const { handleAutoComplete, buildAddress, suggestions, isPending } =
      useAutoFill();

    const error = useMemo(() => {
      for (const [key] of Object.entries(
        extractChildrenFromCredentialFieldSet(fieldValue),
      )) {
        // Composite address data field does not changes line 2
        if (key === 'line2') continue;
        const childFieldState = form.getFieldState(`${fieldName}.${key}`);
        if (childFieldState.error?.message)
          return childFieldState.error?.message;
      }
      return undefined;
    }, [form]);

    const defaultValue = useMemo(() => {
      return toUSaddress({
        line1: fieldValue.line1.value,
        city: fieldValue.city.value,
        state: fieldValue.state.value,
        zipCode: fieldValue.zipCode.value,
      });
    }, []);

    const [value, setValue] = useState<Option>({
      title: defaultValue ?? '',
      value: undefined,
    });

    const [inputValue, setInputValue] = useState('');

    const handleChange = (value: string | Address): void => {
      console.log({ value });

      let addressParts: string | Address | null;

      if (typeof value === 'string') {
        addressParts = fromUSAddress(value);
      } else {
        addressParts = value;
      }

      const setValueOptions = {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      };

      // Update all existing child values in the form context.
      for (const [key] of Object.entries(
        extractChildrenFromCredentialFieldSet(fieldValue),
      )) {
        // Composite address data field does not changes line 2
        if (key === 'line2') continue;
        const path = `${fieldName}.${key}`;
        const fieldValue = produce(
          form.getValues(path),
          (draft: CredentialFieldSet) => {
            draft.value =
              addressParts?.[key as keyof typeof addressParts] ?? '';
            draft.credentialDisplayInfo.value = draft.value;
          },
        );
        form.setValue(path, fieldValue, setValueOptions);
      }
    };

    const handleOptionChange = async (option: Option): Promise<void> => {
      const place = option.value?.placePrediction?.toPlace();
      if (!place) return;
      await place.fetchFields({ fields: ['addressComponents'] });
      const address = buildAddress(place);
      handleChange(address);
    };

    const handleInputChange = useDebounceCallback((event, newInputValue) => {
      handleChange(newInputValue);
      setInputValue(newInputValue);
      if (!newInputValue) return;
      // Prevent small input length and same input value from triggering an autocomplete request
      if (newInputValue.length <= 3 || newInputValue === inputValue) return;
      handleAutoComplete(newInputValue).catch(console.error);
    });

    return (
      <Box width='100%'>
        <Autocomplete
          freeSolo
          isOptionEqualToValue={(option: Option, value: Option) =>
            option?.title === value?.title
          }
          getOptionLabel={(option: string | Option) =>
            typeof option === 'string' ? option : option?.title
          }
          filterOptions={(x) => x}
          options={suggestions.map((suggestion) => ({
            title: suggestion.placePrediction?.text.toString() ?? '',
            value: suggestion as typeof suggestion | undefined,
          }))}
          autoComplete
          includeInputInList
          filterSelectedOptions
          noOptionsText='No locations'
          loading={isPending}
          value={value}
          onChange={(event, newValue: string | Option | null) => {
            event.preventDefault();
            event.stopPropagation();
            if (!newValue) return;
            if (typeof newValue === 'string') return;
            setValue(newValue);
            handleOptionChange(newValue).catch(console.error);
          }}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              {...inputStyle}
              label={<DataFieldLabelText />}
              error={!!error}
              helperText={
                !error
                  ? credentialsDisplayItem.credentialDisplayInfo
                      .credentialRequest?.description
                  : error
              }
              inputProps={{
                ...params.inputProps,
                // Tab index for each block.
                tabIndex: 0,
                autoCorrect: 'off',
                autoCapitalize: 'off',
              }}
              fullWidth
              multiline
            />
          )}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Grid2 container sx={{ alignItems: 'center' }}>
                  <Grid2 sx={{ display: 'flex', width: 44 }}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                  </Grid2>
                  <Grid2
                    sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
                  >
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary' }}
                    >
                      {option?.title}
                    </Typography>
                  </Grid2>
                </Grid2>
              </li>
            );
          }}
          PaperComponent={CustomPaper}
        />
      </Box>
    );
  },
  (props, nextProps) => {
    return isEqual(
      {
        itemValid: props.itemValid,
        objectController: props.credentialsDisplayItem.objectController,
      },
      {
        itemValid: nextProps.itemValid,
        objectController: nextProps.credentialsDisplayItem.objectController,
      },
    );
  },
);

/**
 * This component composes the fields of address except line 2.
 * @constructor
 */
export function DataFieldAddressInput(): ReactElement {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldAddressInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
