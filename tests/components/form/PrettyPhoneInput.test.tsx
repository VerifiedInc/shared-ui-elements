import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { PrettyPhoneInput } from '../../../src/components/form/PrettyPhoneInput';
import { PhoneInput } from '../../../src/components/form/PhoneInput';

afterEach(() => {
  cleanup();
});

const busySelector = '[aria-busy="true"]';

describe('<PrettyPhoneInput/> Component', () => {
  test('renders a tel input', () => {
    const utils = render(
      <PrettyPhoneInput label='Phone' shouldHaveSelectCountryButton={false} />,
    );
    expect(utils.getByLabelText('Phone')).toHaveProperty('type', 'tel');
  });

  test('is not marked busy by default', () => {
    const utils = render(
      <PrettyPhoneInput label='Phone' shouldHaveSelectCountryButton={false} />,
    );
    expect(utils.container.querySelector(busySelector)).toBeNull();
  });

  test('is marked busy while loading', () => {
    const utils = render(
      <PrettyPhoneInput
        label='Phone'
        loading
        shouldHaveSelectCountryButton={false}
      />,
    );
    expect(utils.container.querySelector(busySelector)).not.toBeNull();
  });
});

describe('<PhoneInput/> Component', () => {
  test('forwards loading to the pretty variant', () => {
    const utils = render(
      <PhoneInput
        pretty
        loading
        label='Phone'
        shouldHaveSelectCountryButton={false}
      />,
    );
    expect(utils.container.querySelector(busySelector)).not.toBeNull();
  });

  test('ignores loading for the base variant', () => {
    const utils = render(
      <PhoneInput
        loading
        label='Phone'
        shouldHaveSelectCountryButton={false}
      />,
    );
    expect(utils.container.querySelector(busySelector)).toBeNull();
  });
});
