import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { LogoChip } from '../../src/components/UI/LogoChip';

afterEach(() => {
  cleanup();
});

describe('<LogoChip/>', () => {
  test('renders the label and the avatar initial', () => {
    const { getByText } = render(<LogoChip name='Aetna' label='Aetna' />);
    expect(getByText('Aetna')).toBeDefined();
    expect(getByText('A')).toBeDefined();
  });

  test('passes chip props through (delete)', () => {
    const onDelete = vi.fn();
    const { getByTestId } = render(
      <LogoChip name='Aetna' label='Aetna' onDelete={onDelete} />,
    );
    fireEvent.click(getByTestId('CancelIcon'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
