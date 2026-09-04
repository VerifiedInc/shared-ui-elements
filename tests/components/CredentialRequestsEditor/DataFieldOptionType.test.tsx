import { expect, test, describe, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import { CredentialRequestsEditor } from '../../../src/components/CredentialRequestsEditor';
import { MandatoryEnum } from '../../../src/components/CredentialRequestsEditor/types/mandatoryEnum';
import type { CredentialRequestsWithNew } from '../../../src/components/CredentialRequestsEditor/types/form';

const TYPE_INPUT = 'custom-demo-dialog-data-field-type-input';

const newRequest: CredentialRequestsWithNew = {
  type: '',
  mandatory: MandatoryEnum.NO,
  description: '',
  allowUserInput: true,
  multi: false,
  isNew: true,
};

const renderEditor = () => {
  const onChange = vi.fn();
  const utils = render(
    <CredentialRequestsEditor
      credentialRequests={[newRequest]}
      riskSignals='on'
      onChange={onChange}
    />,
  );
  fireEvent.keyDown(utils.getByTestId(TYPE_INPUT), { key: 'ArrowDown' });
  return { onChange, ...utils };
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('<CredentialRequestsEditor/> field type picker', () => {
  test('offers Employer', () => {
    const utils = renderEditor();

    expect(utils.getByRole('option', { name: 'Employer' })).toBeDefined();
  });

  test('picking Employer emits a single EmployerCredential request', async () => {
    const utils = renderEditor();

    fireEvent.click(utils.getByRole('option', { name: 'Employer' }));

    await waitFor(() => {
      expect(utils.onChange).toHaveBeenCalled();
    });

    expect(utils.onChange.mock.lastCall?.[0]).toEqual([
      {
        type: 'EmployerCredential',
        mandatory: MandatoryEnum.NO,
        description: '',
        allowUserInput: true,
        multi: false,
      },
    ]);
  });
});
