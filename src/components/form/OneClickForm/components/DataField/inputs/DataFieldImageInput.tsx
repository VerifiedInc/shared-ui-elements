import { memo, ReactElement, useRef } from 'react';
import { Box, Stack } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { Button } from '../../../../../../components/Button';

import { useOneClickFormOptions } from '../../../contexts/one-click-form-options.context';
import { handleLoadImageToBase64FromFile } from '../../../utils/image';

import { When } from '../../shared/When';
import { ImageEncoded } from '../../shared/ImageEncoded';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldInputLabel, DataFieldLabelText, DataFieldLegend } from '../';

type DataFieldImageInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

const DataFieldImageInputMemoized = memo(
  function DataFieldImageInputMemoized({
    credentialsDisplayItem,
    itemValid,
  }: DataFieldImageInputMemoizedProps) {
    const { options } = useOneClickFormOptions();
    const {
      objectController,
      credentialDisplayInfo,
      handleChangeValueCredential,
    } = credentialsDisplayItem;
    const { isValid } = itemValid;
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
      <Stack
        direction='column'
        width='100%'
        sx={{ position: 'relative', flex: 1 }}
      >
        <DataFieldInputLabel label={<DataFieldLabelText />} sx={{ mt: -1.5 }} />
        <Stack
          sx={{
            position: 'relative',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <ImageEncoded
            servicePath={options.servicePaths.credentialImagePath}
            src={objectController.field.value.value}
            sx={{ mx: 'auto' }}
          />
          <Stack
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundColor: credentialsDisplayItem.isDisabled
                ? 'transparent'
                : 'rgba(0,0,0,0.6)',
            }}
          >
            <Box
              ref={inputRef}
              component='input'
              type='file'
              accept='image/*'
              onChange={(event) => {
                void (async () => {
                  if (credentialsDisplayItem.isDisabled) return;
                  const base64 = await handleLoadImageToBase64FromFile(event);
                  if (!base64) return;
                  handleChangeValueCredential(base64);
                })();
              }}
              sx={{ display: 'none', visibility: 'hidden' }}
              disabled={credentialsDisplayItem.isDisabled}
            />
            {!credentialsDisplayItem.isDisabled && (
              <Button
                color='primary'
                type='button'
                onClick={() => {
                  if (credentialsDisplayItem.isDisabled) return;
                  inputRef.current?.click();
                }}
                tabIndex={0}
                disabled={credentialsDisplayItem.isDisabled}
              >
                {credentialDisplayInfo.value ? 'Change Image' : 'Add Image'}
              </Button>
            )}
          </Stack>
        </Stack>
        <When value={isValid}>
          <When value={credentialDisplayInfo.credentialRequest?.description}>
            <DataFieldLegend>
              {credentialDisplayInfo.credentialRequest?.description}
            </DataFieldLegend>
          </When>
        </When>
      </Stack>
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
 * This component manages the input of type Image.
 * @constructor
 */
export function DataFieldImageInput(): ReactElement {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldImageInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
