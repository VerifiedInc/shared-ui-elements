import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { Button } from '../../src/components/Button';

describe('<Button/> Component', () => {
  test('fires click event', () => {
    const onClick = vi.fn();
    const utils = render(<Button onClick={onClick}>Click Me</Button>);
    const button = utils.getByText('Click Me');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
