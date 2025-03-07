import { ReactElement, ReactNode } from 'react';

import CredentialsDisplayItemProvider from '../CredentialsDisplay/CredentialsDisplayItemContext';

type CredentialsDisplayItemProps = {
  providerProps: any;
  children?: ReactNode;
};

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
      {props.children}
    </CredentialsDisplayItemProvider>
  );
}
