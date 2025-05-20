import { ReactElement, ReactNode } from 'react';
import { Box, Stack, SxProps } from '@mui/material';

import { credentialTypes } from '../../constants';
import { when } from '../../utils/when';
import { When } from '../../components/shared/When';
import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldAddressInput } from './inputs';
import { DataFieldHeader } from './DataFieldHeader';
import { DataFieldLeftSide } from './DataFieldLeftSide';

type DataFieldCompositeProps = {
  children?: ReactNode | ReactNode[] | undefined;
};

/**
 * This component renders a composite level credential, followed by child of atomic/composite credentials.
 * @param props
 * @constructor
 */
export function DataFieldComposite(
  props: DataFieldCompositeProps,
): ReactElement | null {
  const { children } = props;
  const { credentialDisplayInfo, objectController, isRoot } =
    useCredentialsDisplayItem();
  const isEditMode = credentialDisplayInfo.uiState.isEditMode;

  const leftSideFixStyle: SxProps = {
    width: '100%',
  };
  const leftSideRightSideFixStyle: SxProps = {};
  const middleSideStyle: SxProps = {
    ...leftSideFixStyle,
    '&:not(:last-child)': leftSideRightSideFixStyle,
  };

  const renderCustomDataFieldInput = (): ReactElement | null | undefined => {
    if (!isEditMode) return null;
    return when(objectController.field.value.type, {
      [credentialTypes.AddressCredential]: () => <DataFieldAddressInput />,
      else: () => null,
    });
  };

  /**
   * Method to conditionally render the header part of this data field.
   * @returns
   */
  const shouldRender = (): boolean => {
    return (
      objectController.field.value.type === credentialTypes.AddressCredential
    );
  };

  const customDataInput = renderCustomDataFieldInput();

  return (
    <>
      <When value={!isEditMode && shouldRender()}>
        <Box
          component='section'
          role='region'
          aria-label={
            typeof credentialDisplayInfo.label === 'string'
              ? credentialDisplayInfo.label
              : 'Credential field'
          }
          width='100%'
          data-testid='data-field-composite2'
          data-credentialid={credentialDisplayInfo.id}
        >
          <Stack
            direction='row'
            alignItems='center'
            sx={{ flex: 1, flexShrink: 1, width: '100%' }}
          >
            <DataFieldLeftSide />
            <Box sx={middleSideStyle}>
              <When value={isRoot}>
                <DataFieldHeader block />
              </When>
            </Box>
          </Stack>
        </Box>
      </When>
      {customDataInput && (
        <Stack
          role='region'
          aria-label={
            typeof credentialDisplayInfo.label === 'string'
              ? credentialDisplayInfo.label
              : 'Credential field'
          }
          component='section'
          direction='row'
          alignItems='center'
          sx={{ flex: 1, flexShrink: 1, width: '100%' }}
        >
          <DataFieldLeftSide />
          <Box
            width='100%'
            data-testid='data-field-composite'
            data-credentialid={credentialDisplayInfo.id}
          >
            {customDataInput}
          </Box>
        </Stack>
      )}
      {children}
    </>
  );
}
