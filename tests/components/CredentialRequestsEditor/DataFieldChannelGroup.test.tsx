import { expect, test, describe, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { CredentialRequestsEditor } from '../../../src/components/CredentialRequestsEditor';
import { MandatoryEnum } from '../../../src/components/CredentialRequestsEditor/types/mandatoryEnum';
import type { CredentialRequestsWithNew } from '../../../src/components/CredentialRequestsEditor/types/form';

const SDK_GROUP_TITLE = 'Applies to the SDK channel';

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

const renderEditor = (
  credentialRequests: CredentialRequestsWithNew[],
): ReturnType<typeof render> =>
  render(
    <CredentialRequestsEditor
      credentialRequests={credentialRequests}
      riskSignals='on'
      onChange={vi.fn()}
    />,
  );

const expand = (utils: ReturnType<typeof render>, title: string): void => {
  fireEvent.click(utils.getByText(title));
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('<CredentialRequestsEditor/> channel grouping', () => {
  test('groups Field Description and Allow User Input under the SDK heading', () => {
    const utils = renderEditor([makeCredentialRequest('AddressCredential')]);
    expand(utils, 'Address');

    const heading = utils.getByText(SDK_GROUP_TITLE);
    const group = heading.closest('div')?.parentElement?.parentElement;
    expect(group).not.toBeNull();

    const groupText = group?.textContent ?? '';
    expect(groupText).toContain('Field Description');
    expect(groupText).toContain('Allow User Input');
    // The always-applies settings stay outside the group.
    expect(groupText).not.toContain('Multiple Values');
    expect(groupText).not.toContain('Optional or Required');
  });

  test('Multiple Values keeps its API-channel admonition outside the SDK group', () => {
    const utils = renderEditor([makeCredentialRequest('AddressCredential')]);
    expand(utils, 'Address');

    expect(utils.getByText(/only returned on the API channel/i)).toBeDefined();
  });

  test('renders every setting regardless of the brand, since core gates per request', () => {
    const utils = renderEditor([makeCredentialRequest('AddressCredential')]);
    expand(utils, 'Address');

    expect(utils.getByText('Multiple Values')).toBeDefined();
    expect(utils.getByText('Field Description')).toBeDefined();
    // Also rendered as a summary badge on the collapsed accordion header.
    expect(utils.getAllByText('Allow User Input').length).toBeGreaterThan(0);
  });
});
