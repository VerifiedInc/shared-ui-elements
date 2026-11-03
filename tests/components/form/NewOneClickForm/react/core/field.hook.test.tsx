import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

import { FormBuilder } from '../../../../../../src/components/form/NewOneClickForm/core/form';
import { useField } from '../../../../../../src/components/form/NewOneClickForm/react/core/field.hook';
import { FormProvider } from '../../../../../../src/components/form/NewOneClickForm/react/core/form.context';

import { makeCredential, makeCredentialRequest } from '../../utils/form';

const setup = () => {
  const form = new FormBuilder().createFromCredentialAndRequests(
    [makeCredential({ type: 'ssn', value: { ssn: '123456789' } })],
    [makeCredentialRequest({ type: 'SsnCredential', mandatory: 'yes' })],
  );
  const wrapper = ({ children }: { children: ReactNode }) => (
    <FormProvider form={form} onSubmit={vi.fn()}>
      {children}
    </FormProvider>
  );
  return renderHook(() => useField<'ssn'>({ key: 'ssn' }), { wrapper });
};

describe('useField', () => {
  test('has no error while the value is valid', () => {
    const { result } = setup();

    expect(result.current.error).toBeNull();
  });

  test('shows the schema message for an invalid value', () => {
    const { result } = setup();

    act(() => {
      result.current.setValue('123');
    });

    expect(result.current.error).toBe('Invalid SSN');
  });

  test('shows the first message when a required value is cleared', () => {
    const { result } = setup();

    act(() => {
      result.current.setValue('');
    });

    expect(result.current.error).toBe('Invalid SSN');
  });
});
