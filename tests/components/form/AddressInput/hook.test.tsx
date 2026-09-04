import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

import { AddressInputProvider } from '../../../../src/components/form/AddressInput/context';
import { useDataFieldAddressInput } from '../../../../src/components/form/AddressInput/hook';

const setup = () => {
  const onChange = vi.fn();
  const googlePlacesAutocompletePlaces = vi.fn().mockResolvedValue([]);
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AddressInputProvider
      googlePlacesAutocompletePlaces={googlePlacesAutocompletePlaces}
    >
      {children}
    </AddressInputProvider>
  );
  const { result } = renderHook(
    () => useDataFieldAddressInput({ defaultValue: null, onChange }),
    { wrapper },
  );
  const type = async (text: string) => {
    await act(async () => {
      result.current.handleInputChange(text);
    });
    await act(async () => {
      vi.advanceTimersByTime(250);
    });
  };
  return { onChange, googlePlacesAutocompletePlaces, type };
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('useDataFieldAddressInput', () => {
  test('propagates a single character without requesting suggestions', async () => {
    const { onChange, googlePlacesAutocompletePlaces, type } = setup();

    await type('d');

    expect(onChange).toHaveBeenCalledWith(
      { line1: 'd', country: 'US' },
      undefined,
    );
    expect(googlePlacesAutocompletePlaces).not.toHaveBeenCalled();
  });

  test('requests suggestions once the input is longer than three characters', async () => {
    const { onChange, googlePlacesAutocompletePlaces, type } = setup();

    await type('702 SW 8th St');

    expect(onChange).toHaveBeenCalledWith(
      { line1: '702 SW 8th St', country: 'US' },
      undefined,
    );
    expect(googlePlacesAutocompletePlaces).toHaveBeenCalledWith(
      '702 SW 8th St',
      expect.any(AbortSignal),
    );
  });
});
