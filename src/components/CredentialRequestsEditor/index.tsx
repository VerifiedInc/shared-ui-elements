import {
  type CredentialRequestsEditorProps,
  CredentialRequestsEditorProvider,
} from './CredentialRequestsEditor.context';
import { CredentialRequestsField } from './components/CredentialRequestsField';

export function CredentialRequestsEditor(
  props: Omit<CredentialRequestsEditorProps, 'children'>,
): React.JSX.Element {
  return (
    <CredentialRequestsEditorProvider {...props}>
      <CredentialRequestsField />
    </CredentialRequestsEditorProvider>
  );
}
