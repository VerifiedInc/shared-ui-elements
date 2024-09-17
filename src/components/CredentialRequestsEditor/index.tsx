import type {
  CredentialRequests,
  CredentialRequestsWithNew,
} from './types/form';
import { CredentialRequestsEditorProvider } from './CredentialRequestsEditor.context';
import { CredentialRequestsField } from './components/CredentialRequestsField';

interface CredentialRequestsEditorProps {
  credentialRequests: CredentialRequestsWithNew[];
  schemas: Record<string, any>;
  onChange: (credentialRequests: CredentialRequests[]) => void;
}

export function CredentialRequestsEditor(
  props: CredentialRequestsEditorProps,
): React.JSX.Element {
  return (
    <CredentialRequestsEditorProvider
      credentialRequests={props.credentialRequests}
      schemas={props.schemas}
      onChange={props.onChange}
    >
      <CredentialRequestsField />
    </CredentialRequestsEditorProvider>
  );
}
