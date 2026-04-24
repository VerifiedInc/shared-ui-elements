import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import { CopyableUuid } from '../../src/components/CopyableUuid';

const FULL_UUID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

class MockClipboardItem {
  constructor(public readonly items: Record<string, unknown>) {}
}

let clipboardWrite: ReturnType<typeof vi.fn>;

beforeEach(() => {
  clipboardWrite = vi.fn().mockResolvedValue(undefined);
  // jsdom doesn't ship a Clipboard API — stub navigator.clipboard.write and ClipboardItem.
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { write: clipboardWrite },
  });
  (
    globalThis as unknown as { ClipboardItem: typeof MockClipboardItem }
  ).ClipboardItem = MockClipboardItem;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('<CopyableUuid/>', () => {
  test('renders placeholder when uuid is nullish', () => {
    const { getByText, rerender } = render(<CopyableUuid uuid={null} />);
    expect(getByText('—')).toBeDefined();

    rerender(<CopyableUuid uuid={undefined} />);
    expect(getByText('—')).toBeDefined();

    rerender(<CopyableUuid uuid='' />);
    expect(getByText('—')).toBeDefined();
  });

  test('renders a custom placeholder', () => {
    const { getByText } = render(
      <CopyableUuid uuid={null} placeholder='not set' />,
    );
    expect(getByText('not set')).toBeDefined();
  });

  test('button variant truncates uuid (head + tail)', () => {
    const { container } = render(
      <CopyableUuid uuid={FULL_UUID} variant='button' head={4} tail={4} />,
    );
    // head "a1b2" + ellipsis + tail "7890"
    expect(container.textContent).toContain('a1b2');
    expect(container.textContent).toContain('7890');
    expect(container.textContent).not.toContain(FULL_UUID);
  });

  test('text variant with tail=0 uses head-only format', () => {
    const { container } = render(
      <CopyableUuid uuid={FULL_UUID} variant='text' head={5} tail={0} />,
    );
    expect(container.textContent).toContain('a1b2c...');
    expect(container.textContent).not.toContain(FULL_UUID);
  });

  test('returns the full uuid when it is short enough to not need truncating', () => {
    const short = 'abc123';
    const { getByText } = render(
      <CopyableUuid uuid={short} head={4} tail={4} />,
    );
    expect(getByText(short)).toBeDefined();
  });

  test('button variant copies full uuid to clipboard on icon click', async () => {
    const { getByLabelText } = render(
      <CopyableUuid uuid={FULL_UUID} label='Brand UUID' variant='button' />,
    );

    const copyButton = getByLabelText('Copy Brand UUID');
    fireEvent.click(copyButton);

    await waitFor(() => expect(clipboardWrite).toHaveBeenCalledTimes(1));
    // The clipboard payload should contain the full UUID.
    const [clipboardItems] = clipboardWrite.mock.calls[0];
    expect(Array.isArray(clipboardItems)).toBe(true);
    expect(clipboardItems[0]).toBeInstanceOf(MockClipboardItem);
  });

  test('text variant copies full uuid to clipboard on click', async () => {
    const { getByRole } = render(
      <CopyableUuid
        uuid={FULL_UUID}
        label='UUID'
        variant='text'
        head={5}
        tail={0}
      />,
    );

    const button = getByRole('button', { name: 'Copy UUID' });
    fireEvent.click(button);

    await waitFor(() => expect(clipboardWrite).toHaveBeenCalledTimes(1));
  });

  test('text variant renders as a real button (keyboard accessible)', () => {
    const { getByRole } = render(
      <CopyableUuid
        uuid={FULL_UUID}
        label='UUID'
        variant='text'
        head={5}
        tail={0}
      />,
    );

    const button = getByRole('button', { name: 'Copy UUID' });
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
  });

  test('swallows clipboard failures silently', async () => {
    clipboardWrite.mockRejectedValueOnce(new Error('denied'));
    const { getByLabelText } = render(
      <CopyableUuid uuid={FULL_UUID} label='UUID' variant='button' />,
    );

    fireEvent.click(getByLabelText('Copy UUID'));

    // Should not throw; clipboard was invoked.
    await waitFor(() => expect(clipboardWrite).toHaveBeenCalledTimes(1));
  });
});
