'use client';

import { ComponentType, useMemo } from 'react';
import { QueryClient } from '@tanstack/react-query';

import type { Credential, CredentialRequest } from '../../types';
import { Form, FormBuilder } from '../../core/form';

import { type FormContextValue, FormProvider } from '../core/form.context';

import { OneClickFormOptions, OneClickFormProvider } from './form.context';
import { OneClickFormContent } from './form-content';

export type NewOneClickFormProps = {
  credentialRequests: CredentialRequest[];
  credentials: Credential[];
  options: OneClickFormOptions;
  queryClient?: QueryClient;
  onSubmit: (form: Form) => Promise<void> | void;
  FooterComponent?: ComponentType<{ form: FormContextValue }>;
};

export function NewOneClickForm({
  credentialRequests,
  credentials,
  options,
  onSubmit,
  FooterComponent,
}: NewOneClickFormProps) {
  const form = useMemo(() => {
    const formBuilder = new FormBuilder();
    return formBuilder.createFromCredentialAndRequests(
      credentials,
      credentialRequests,
    );
  }, [credentials, credentialRequests]);

  return (
    <FormProvider form={form} onSubmit={onSubmit}>
      <OneClickFormProvider options={options}>
        <OneClickFormContent FooterComponent={FooterComponent} />
      </OneClickFormProvider>
    </FormProvider>
  );
}
