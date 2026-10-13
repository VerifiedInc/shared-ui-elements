import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';

import type { OneClickFormOptions } from '../../../../../../src/components/form/NewOneClickForm/react/ui/form.context';

import { NewOneClickForm } from '../../../../../../src/components/form/NewOneClickForm/react/ui';
import { theme } from '../../../../../../src/styles/theme';

const appTheme = theme({ primaryFontFace: { style: { fontFamily: 'Lato' } } });

const renderForm = (editMode: OneClickFormOptions['features']['editMode']) =>
  render(
    <ThemeProvider theme={appTheme}>
      <NewOneClickForm
        credentials={[
          { uuid: crypto.randomUUID(), type: 'sex', value: { sex: 'Male' } },
        ]}
        credentialRequests={[
          {
            type: 'SexCredential',
            allowUserInput: true,
            mandatory: 'no',
            multi: false,
          },
        ]}
        options={{ features: { editMode }, servicePaths: {} }}
        onSubmit={() => {}}
      />
    </ThemeProvider>,
  );

afterEach(() => {
  cleanup();
});

describe('<OneClickFormContent/> edit button', () => {
  test('reads "Edit" when no label is set', () => {
    const { getByRole } = renderForm(undefined);
    expect(getByRole('button', { name: 'Edit' })).toBeDefined();
  });

  test('reads the label when one is set', () => {
    const { getByRole } = renderForm({ label: 'Edit Health Insurance' });
    expect(
      getByRole('button', { name: 'Edit Health Insurance' }),
    ).toBeDefined();
  });

  test('is not rendered when hidden', () => {
    const { queryByRole } = renderForm({
      hide: true,
      label: 'Edit Health Insurance',
    });
    expect(queryByRole('button', { name: /Edit/ })).toBeNull();
  });
});
