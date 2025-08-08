import React, { ReactElement, type ComponentType } from 'react';
import {
  Autocomplete,
  Box,
  Paper,
  PaperProps,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import { Address } from './types';
import { useDataFieldAddressInput } from './hook';
import { AddressInputProvider } from './context';

type Option = {
  title: string;
  value: string;
};

type AddressInputProps = {
  name: string;
  defaultValue: Address | null;
  onChange: (
    value: string | Address | null,
    changeOptions?: { shouldValidate?: boolean },
  ) => void;
  disabled?: boolean;
  variant?: TextFieldProps['variant'];
  size?: TextFieldProps['size'];
  helperText?: string;
  inputProps?: TextFieldProps['inputProps'];
  InputProps?: TextFieldProps['InputProps'];
  ClearAdornment?: ComponentType<{ onClick: () => void }>;
  service: {
    googlePlacesAutocompletePlaces?: string;
    googlePlacesGetPlace?: string;
  };
};

type AddressInputContentProps = Omit<AddressInputProps, 'service'>;

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

function AddressInputContent({
  name,
  defaultValue,
  onChange,
  disabled,
  variant,
  size,
  helperText,
  inputProps,
  InputProps,
  ClearAdornment,
}: AddressInputContentProps): ReactElement {
  const {
    value,
    inputValue,
    suggestions,
    isPending,
    isFetchingPlace,
    error,
    handleInputChange,
    handleOptionChange,
    handleClear,
  } = useDataFieldAddressInput({ name, defaultValue, onChange });

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
        disabled={isFetchingPlace || disabled}
        onChange={(event, newValue: string | Option | null) => {
          event.preventDefault();
          event.stopPropagation();
          if (disabled) return;
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
            variant={variant}
            size={size}
            error={!!error}
            helperText={!error ? helperText : error}
            inputProps={{
              ...params.inputProps,
              // Tab index for each block.
              tabIndex: 0,
              autoCapitalize: 'off',
              autoComplete:
                'street-address address-level2 address-level1 postal-code',
              ...inputProps,
            }}
            InputProps={{
              ...params.InputProps,
              // Disabling injected global styles to preserve the performance rendering
              // Ref: https://github.com/mui/material-ui/issues/38314#issuecomment-1667854679
              disableInjectingGlobalStyles: true,
              endAdornment: ClearAdornment ? (
                <ClearAdornment
                  onClick={() => {
                    handleClear();
                  }}
                />
              ) : undefined,
              ...InputProps,
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
}

/**
 * This component composes the fields of address except line 2.
 * @constructor
 */
export function AddressInput({
  name,
  defaultValue,
  onChange,
  disabled,
  variant,
  size,
  helperText,
  inputProps,
  InputProps,
  ClearAdornment,
  service,
}: AddressInputProps): ReactElement {
  return (
    <AddressInputProvider
      googlePlacesAutocompletePlaces={service.googlePlacesAutocompletePlaces}
      googlePlacesGetPlace={service.googlePlacesGetPlace}
    >
      <AddressInputContent
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        variant={variant}
        size={size}
        helperText={helperText}
        inputProps={inputProps}
        InputProps={InputProps}
        ClearAdornment={ClearAdornment}
      />
    </AddressInputProvider>
  );
}
