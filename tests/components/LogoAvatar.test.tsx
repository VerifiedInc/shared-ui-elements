import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { LogoAvatar } from '../../src/components/UI/LogoAvatar';

afterEach(() => {
  cleanup();
});

describe('<LogoAvatar/>', () => {
  test('shows the initial when there is no logo', () => {
    const { getByText } = render(<LogoAvatar name='aetna' />);
    expect(getByText('A')).toBeDefined();
  });

  test('renders the logo image when a url is given', () => {
    const { getByRole } = render(
      <LogoAvatar name='Aetna' logoUrl='https://example.test/logo.png' />,
    );
    expect(getByRole('img', { name: 'Aetna logo' })).toBeDefined();
  });

  test('falls back to the initial when the logo fails to load', () => {
    const { getByRole, getByText } = render(
      <LogoAvatar name='Aetna' logoUrl='https://example.test/broken.png' />,
    );
    fireEvent.error(getByRole('img', { name: 'Aetna logo' }));
    expect(getByText('A')).toBeDefined();
  });

  test('tries again when the url changes after a failure', () => {
    const { getByRole, getByText, rerender } = render(
      <LogoAvatar name='Aetna' logoUrl='https://example.test/broken.png' />,
    );
    fireEvent.error(getByRole('img', { name: 'Aetna logo' }));
    expect(getByText('A')).toBeDefined();

    rerender(<LogoAvatar name='Aetna' logoUrl='https://example.test/ok.png' />);
    expect(getByRole('img', { name: 'Aetna logo' })).toBeDefined();
  });
});
