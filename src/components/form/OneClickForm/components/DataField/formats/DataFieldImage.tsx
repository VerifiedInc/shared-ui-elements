import { Stack, SxProps } from '@mui/material';

import { useOneClickFormOptions } from '../../../contexts/one-click-form-options.context';

import { When } from '../../shared/When';
import { ImageEncoded } from '../../shared/ImageEncoded';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabel } from '../DataFieldLabel';
import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldLegend } from '../DataFieldLegend';

type DataFieldImageProps = {
  hasMultipleInstances: boolean;
};

/**
 * This component is responsible to render the credential of type Image.
 * @constructor
 */
export function DataFieldImage(props: DataFieldImageProps) {
  const oneClickFormOptions = useOneClickFormOptions();
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const containerStyle: SxProps = { flex: 1 };
  return (
    <Stack
      direction='column'
      sx={containerStyle}
      {
        ...{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // 'data-sentry-mask':
          //   appContext.config.env.env === 'production' || undefined,
        }
      }
    >
      <When value={!props.hasMultipleInstances}>
        <DataFieldLabel label={<DataFieldLabelText />} />
      </When>
      <ImageEncoded
        servicePath={
          oneClickFormOptions.options.servicePaths.credentialImagePath
        }
        src={credentialDisplayInfo.value}
        alt={credentialDisplayInfo.label}
        sx={{ mt: 1 }}
      />
      <When value={credentialDisplayInfo.credentialRequest?.description}>
        {(description) => <DataFieldLegend>{description}</DataFieldLegend>}
      </When>
    </Stack>
  );
}
