import { CredentialRequestsField } from './components/CredentialRequestsField';
import { CredentialRequestsEditorProvider } from './CredentialRequestsEditor.context';

export function CredentialRequestsEditor(): React.JSX.Element {
  return (
    <CredentialRequestsEditorProvider>
      <CredentialRequestsField />
    </CredentialRequestsEditorProvider>
  );
}
