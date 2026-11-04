import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { BigNumber } from '../../../src/components/chart/BigNumber';

// BigNumber animates its text through framer-motion; jump straight to the end value.
vi.mock(import('framer-motion'), async (importOriginal) => ({
  ...(await importOriginal()),
  animate: ((
    _from: number,
    to: number,
    options: { onUpdate: (value: number) => void },
  ) => {
    options.onUpdate(to);
    return { stop(): void {} };
  }) as unknown as typeof import('framer-motion').animate,
}));

afterEach(() => {
  cleanup();
});

describe('<BigNumber/>', () => {
  test('shows the formatted value under the label', () => {
    render(
      <BigNumber
        label='Autofills Succeeded from Stedi Eligibility'
        initialValue={0}
        value={40599}
        map={(value) => value.toLocaleString('en-US')}
      />,
    );
    expect(screen.getByRole('heading').textContent).toBe('40,599');
    expect(
      screen.getByText('Autofills Succeeded from Stedi Eligibility'),
    ).toBeDefined();
  });

  test('centers the label text, so a label that wraps stays under the value', () => {
    render(
      <BigNumber
        label='Autofills Succeeded from Stedi Eligibility'
        initialValue={0}
        value={40599}
      />,
    );
    const label = screen.getByText(
      'Autofills Succeeded from Stedi Eligibility',
    );
    expect(getComputedStyle(label).textAlign).toBe('center');
  });

  test('centers the value', () => {
    render(<BigNumber label='Autofills Started' initialValue={0} value={1} />);
    expect(getComputedStyle(screen.getByRole('heading')).textAlign).toBe(
      'center',
    );
  });
});
