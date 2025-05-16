import React, { memo, ReactElement } from 'react';
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

import { inputStyle } from '../../../../styles/input';

import { useCredentialsDisplayItem } from '../../../CredentialsDisplay/CredentialsDisplayItemContext';
import { useCredentialsDisplayItemValid } from '../../../CredentialsDisplay/hooks';

import { getAutoCompleteAttributeValue } from '../../utils';
import { DataFieldLabelText } from '../../DataFieldLabelText';
import { DataFieldClearAdornment } from '../../DataFieldClearAdornment';

import { useDataFieldAddressInput } from './hook';

type DataFieldAddressInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

type Option = {
  title: string;
  value: string;
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
    const {
      value,
      inputValue,
      suggestions,
      isPending,
      isFetchingPlace,
      error,
      handleInputChange,
      handleOptionChange,
    } = useDataFieldAddressInput({ credentialsDisplayItem });

    return (
      <Box width='100%'>
        <Autocomplete
          // Disabling clearable to match the appearance and behavior of the other data fields
          disableClearable
          freeSolo
          isOptionEqualToValue={(option: Option, value: Option) =>
            option?.value === value?.value
          }
          getOptionLabel={(option: string | Option) => {
            return typeof option === 'string' ? option : option?.title;
          }}
          filterOptions={(x) => x}
          options={
            isPending
              ? []
              : suggestions.map((suggestion) => ({
                  title: suggestion.placePrediction.text.text ?? '',
                  value: suggestion.placePrediction.place ?? '',
                }))
          }
          autoComplete
          includeInputInList
          filterSelectedOptions
          noOptionsText='No locations'
          value={value}
          inputValue={inputValue}
          loading={isPending || isFetchingPlace}
          disabled={isFetchingPlace || credentialsDisplayItem.isDisabled}
          onChange={(event, newValue: string | Option | null) => {
            event.preventDefault();
            event.stopPropagation();
            if (credentialsDisplayItem.isDisabled) return;
            if (!newValue || typeof newValue === 'string') return;
            handleOptionChange(newValue).catch(console.error);
          }}
          onInputChange={(event, newIputvalue) => {
            handleInputChange(newIputvalue);
          }}
          renderInput={(params) => (
            <TextField
              id={params.id}
              disabled={params.disabled}
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
                autoCapitalize: 'off',
                autoComplete: getAutoCompleteAttributeValue(
                  credentialsDisplayItem.objectController.field.value.type,
                ),
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <DataFieldClearAdornment
                    onClick={() => {
                      handleInputChange('', {
                        shouldValidate: false,
                      });
                    }}
                  />
                ),
              }}
              fullWidth
              multiline
            />
          )}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Grid2 container sx={{ alignItems: 'flex-start' }}>
                  <Grid2 sx={{ width: '100%', wordWrap: 'break-word' }}>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary', textAlign: 'left' }}
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
