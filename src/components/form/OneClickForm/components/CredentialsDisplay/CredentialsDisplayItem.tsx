import { ReactElement, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

import { DataFieldPaper } from '../DataField/DataFieldPaper';
import CredentialsDisplayItemProvider, {
  useCredentialsDisplayItem,
} from '../CredentialsDisplay/CredentialsDisplayItemContext';

type CredentialsDisplayItemProps = {
  providerProps: any;
  sx?: SxProps;
  children?: ReactNode;
};

function CredentialsDisplayItemBody(
  props: Omit<CredentialsDisplayItemProps, 'providerProps'>,
): ReactElement {
  const { isRoot } = useCredentialsDisplayItem();

  if (isRoot) {
    return <DataFieldPaper {...props} />;
  }
  return <Box {...props} width='100%' />;
}

/**
 * Render DataFieldPaper to root level only components, and bind the credential display item context to it.
 * @param providerProps
 * @param props
 * @constructor
 */
export function CredentialsDisplayItem({
  providerProps,
  ...props
}: CredentialsDisplayItemProps): ReactElement {
  return (
    <CredentialsDisplayItemProvider {...providerProps}>
      <CredentialsDisplayItemBody {...props} />
    </CredentialsDisplayItemProvider>
  );
}
