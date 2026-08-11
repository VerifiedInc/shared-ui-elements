import { expect, test, describe, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import { CredentialRequestsEditor } from '../../../src/components/CredentialRequestsEditor';
import { MandatoryEnum } from '../../../src/components/CredentialRequestsEditor/types/mandatoryEnum';
import { SdkIntegrationType } from '../../../src/components/CredentialRequestsEditor/types/sdk';
import type { CredentialRequestsWithNew } from '../../../src/components/CredentialRequestsEditor/types/form';

const YES_RADIO = 'custom-demo-dialog-autofill-legal-first-name-yes-radio';
const NO_RADIO = 'custom-demo-dialog-autofill-legal-first-name-no-radio';

const makeCredentialRequest = (
  type: string,
  override: Partial<CredentialRequestsWithNew> = {},
): CredentialRequestsWithNew => ({
  type,
  mandatory: MandatoryEnum.NO,
  description: '',
  allowUserInput: true,
  multi: false,
  ...override,
});

// FirstNameCredential is a child of FullNameCredential, which is where the setting lives.
const makeFullName = (
  firstNameOverride: Partial<CredentialRequestsWithNew> = {},
): CredentialRequestsWithNew[] => [
  makeCredentialRequest('FullNameCredential', {
    children: [
      makeCredentialRequest('FirstNameCredential', firstNameOverride),
      makeCredentialRequest('LastNameCredential'),
    ],
  }),
];

const renderEditor = (
  credentialRequests: CredentialRequestsWithNew[],
  integrationType: SdkIntegrationType = SdkIntegrationType.Hosted,
): { onChange: ReturnType<typeof vi.fn> } & ReturnType<typeof render> => {
  const onChange = vi.fn();
  const utils = render(
    <CredentialRequestsEditor
      credentialRequests={credentialRequests}
      integrationType={integrationType}
      riskSignals='on'
      onChange={onChange}
    />,
  );
  return { onChange, ...utils };
};

/** The child accordions render collapsed; clicking the title expands one. */
const expand = (utils: ReturnType<typeof render>, title: string): void => {
  fireEvent.click(utils.getByText(title));
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('<CredentialRequestsEditor/> autofillLegalFirstName', () => {
  test('renders the setting only for FirstNameCredential', () => {
    const utils = renderEditor(makeFullName());

    expand(utils, 'First Name');
    expect(utils.getByTestId(YES_RADIO)).toBeDefined();

    cleanup();

    const other = renderEditor(makeFullName());
    expand(other, 'Last Name');
    expect(other.queryByTestId(YES_RADIO)).toBeNull();
  });

  test('defaults to No when the flag is absent', () => {
    const utils = renderEditor(makeFullName());
    expand(utils, 'First Name');

    expect((utils.getByTestId(NO_RADIO) as HTMLInputElement).checked).toBe(
      true,
    );
    expect((utils.getByTestId(YES_RADIO) as HTMLInputElement).checked).toBe(
      false,
    );
  });

  test('renders Yes when the brand already has the flag on', () => {
    const utils = renderEditor(makeFullName({ autofillLegalFirstName: true }));
    expand(utils, 'First Name');

    expect((utils.getByTestId(YES_RADIO) as HTMLInputElement).checked).toBe(
      true,
    );
  });

  test('emits autofillLegalFirstName on the FirstNameCredential node when toggled on', async () => {
    const utils = renderEditor(makeFullName());
    expand(utils, 'First Name');

    fireEvent.click(utils.getByTestId(YES_RADIO));

    await waitFor(() => {
      expect(utils.onChange).toHaveBeenCalled();
    });

    const emitted = utils.onChange.mock.lastCall?.[0];
    const firstName = emitted?.[0]?.children?.[0];
    const lastName = emitted?.[0]?.children?.[1];

    expect(firstName.type).toBe('FirstNameCredential');
    expect(firstName.autofillLegalFirstName).toBe(true);
    // The flag is per-credential: siblings and the parent are untouched.
    expect(lastName.autofillLegalFirstName).toBeUndefined();
    expect(emitted?.[0].autofillLegalFirstName).toBeUndefined();
  });

  test('emits false when toggled back off', async () => {
    const utils = renderEditor(makeFullName({ autofillLegalFirstName: true }));
    expand(utils, 'First Name');

    fireEvent.click(utils.getByTestId(NO_RADIO));

    await waitFor(() => {
      expect(utils.onChange).toHaveBeenCalled();
    });

    const emitted = utils.onChange.mock.lastCall?.[0];
    expect(emitted?.[0]?.children?.[0].autofillLegalFirstName).toBe(false);
  });

  test('stays reachable for non-hosted brands, unlike other children', () => {
    const utils = renderEditor(makeFullName(), SdkIntegrationType.NonHosted);

    // Last Name has no non-hosted-relevant option, so it stays collapsed.
    expand(utils, 'Last Name');
    expect(utils.queryByTestId(YES_RADIO)).toBeNull();

    expand(utils, 'First Name');
    expect(utils.getByTestId(YES_RADIO)).toBeDefined();
  });
});
