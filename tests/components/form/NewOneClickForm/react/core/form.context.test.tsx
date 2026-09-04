import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

import { FormBuilder } from '../../../../../../src/components/form/NewOneClickForm/core/form';
import {
  FormProvider,
  useForm,
} from '../../../../../../src/components/form/NewOneClickForm/react/core/form.context';

import { makeCredential, makeCredentialRequest } from '../../utils/form';

const setup = () => {
  const form = new FormBuilder().createFromCredentialAndRequests(
    [
      makeCredential({
        type: 'fullName',
        value: { firstName: 'John', lastName: 'Doe' },
      }),
    ],
    [
      makeCredentialRequest({
        type: 'FullNameCredential',
        children: [
          makeCredentialRequest({ type: 'FirstNameCredential' }),
          makeCredentialRequest({ type: 'LastNameCredential' }),
        ],
      }),
    ],
  );
  const wrapper = ({ children }: { children: ReactNode }) => (
    <FormProvider form={form} onSubmit={vi.fn()}>
      {children}
    </FormProvider>
  );
  return renderHook(() => useForm(), { wrapper });
};

describe('FormProvider', () => {
  test('resetForm keeps the submit state', async () => {
    const { result } = setup();

    await act(async () => {
      await result.current.submitForm();
    });

    expect(result.current.state.isSubmitSuccess).toBe(true);

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.state.isSubmitSuccess).toBe(true);
    expect(result.current.state.isSubmitting).toBe(false);
  });
});
