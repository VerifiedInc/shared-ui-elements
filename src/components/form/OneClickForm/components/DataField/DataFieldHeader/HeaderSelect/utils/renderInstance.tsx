import { Fragment, ReactElement } from 'react';
import { Box, MenuItem } from '@mui/material';

import { DisplayFormatEnum } from '../../../../../types/display-format';
import { credentialTypes } from '../../../../../constants';
import { useOneClickFormOptions } from '../../../../../contexts/one-click-form-options.context';
import { formatCredentialValue } from '../../../../../utils/formatCredentialValue';

import { CredentialDisplayInfo } from '../../../../CredentialsDisplay/types';
import { ImageEncoded } from '../../../../shared/ImageEncoded';

import { getCredentialSeparator } from '../../../utils';

import { styles } from '../styles';

import { getAddressFormat } from './getAddressFormat';

export const renderInstance =
  (renderAsString: boolean) =>
  (credentialDisplayInfo: CredentialDisplayInfo) => {
    const _styles = styles();
    const oneClickFormOptions = useOneClickFormOptions();

    const getDisplayByDisplayFormat = (
      credentialDisplayInfo: CredentialDisplayInfo,
    ): ReactElement | string => {
      // Format the credential value, so it can be human-readable.
      const formattedValue = formatCredentialValue(
        credentialDisplayInfo.value,
        credentialDisplayInfo.displayFormat,
      );

      if (credentialDisplayInfo.displayFormat === DisplayFormatEnum.Image) {
        if (renderAsString) return '';
        return (
          <Box
            component='div'
            key={credentialDisplayInfo.id}
            sx={_styles.blockStyle}
          >
            <ImageEncoded
              servicePath={
                oneClickFormOptions.options.servicePaths.credentialImagePath
              }
              src={credentialDisplayInfo.value}
              alt={credentialDisplayInfo.label}
              sx={{
                '& > img': {
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                },
                width: '40px',
                height: '40px',
              }}
            />
          </Box>
        );
      } else {
        if (renderAsString) return formattedValue;
        return (
          <Fragment key={credentialDisplayInfo.id}>{formattedValue}</Fragment>
        );
      }
    };

    // Create the presentation display texts.
    const renderTextValues = (
      credentialDisplayInfo: CredentialDisplayInfo,
    ): Array<ReactElement | string> | (ReactElement | string) => {
      if (!Array.isArray(credentialDisplayInfo.children)) {
        return getDisplayByDisplayFormat(credentialDisplayInfo);
      }

      // If is an composite address credential, utilize it custom format.
      if (
        Array.isArray(credentialDisplayInfo.children) &&
        credentialDisplayInfo.credentialRequest.type ===
          credentialTypes.AddressCredential
      ) {
        const addressFormatted = getAddressFormat(credentialDisplayInfo);
        if (addressFormatted) return addressFormatted;
      }

      // Use parent credential type to define the separator.
      const separator = getCredentialSeparator(
        credentialDisplayInfo.credentialRequest?.type,
      );

      // For composite credentials, concat the value of all atomic credentials.
      const listHeader = credentialDisplayInfo.children
        .reduce<Array<ReactElement | string>>((acc, credentialDisplayInfo) => {
          // Add the display only if the value is not empty.
          if (credentialDisplayInfo.value) {
            acc.push(getDisplayByDisplayFormat(credentialDisplayInfo));
          }

          // For children credential make the recursion call.
          if (Array.isArray(credentialDisplayInfo.children)) {
            acc.push(
              ...(
                renderTextValues(credentialDisplayInfo) as Array<
                  ReactElement | string
                >
              )
                // Flat the nested to make sure they will render linear.
                .flat(Infinity),
            );
          }

          return acc;
          // Setting initial value to the reducer to infer array of element.
        }, [])
        .filter(Boolean)
        .map((element, index, list) => {
          const hasNext = !!list[index + 1];
          if (renderAsString) {
            if (hasNext) {
              return `${element as string}${separator}`;
            }
            return element as string;
          }
          return (
            <Fragment key={typeof element === 'string' ? element : element.key}>
              {element}
              {hasNext && <>{separator === ' ' ? ' ' : (separator ?? '')}</>}
            </Fragment>
          );
        });

      if (renderAsString) return listHeader.join(separator);

      return listHeader;
    };

    if (renderAsString) return renderTextValues(credentialDisplayInfo);

    return (
      <MenuItem
        key={credentialDisplayInfo.id}
        value={credentialDisplayInfo.id}
        sx={_styles.menuStyle}
        onClick={(e) => {
          // Prevent the event to propagate to the parent.
          e.stopPropagation();
        }}
      >
        {renderTextValues(credentialDisplayInfo)}
      </MenuItem>
    );
  };
