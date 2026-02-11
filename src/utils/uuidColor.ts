const numbersToColor = (numbers: number[]): string => {
  // Get RGB values using modulo to ensure they're in 0-255 range
  const r = numbers.reduce((acc, val) => (acc + val) % 256, 0);
  const g = numbers.slice(1).reduce((acc, val) => (acc + val) % 256, 0);
  const b = numbers.slice(2).reduce((acc, val) => (acc + val) % 256, 0);

  // Convert to hex and pad with zeros if needed
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Converts a UUID to a HEX color using a more distributed hash approach
 * @param uuid - UUID string
 * @returns HEX color string (e.g., #ff0000)
 */
export const uuidToHashedColor = (uuid: string): string => {
  // Remove dashes and convert to number segments
  const numbers =
    uuid
      .replace(/-/g, '')
      .match(/.{1,2}/g)
      ?.map((hex) => parseInt(hex, 16)) ?? [];
  return numbersToColor(numbers);
};

/**
 * Converts a string to a HEX color using a more distributed hash approach
 * @param string - String to convert
 * @returns HEX color string (e.g., #ff0000)
 */
export const stringToHashedColor = (string: string): string => {
  const numbers = string
    .padEnd(3, 'abc')
    .split('')
    .map((char) => char.charCodeAt(0));
  return numbersToColor(numbers);
};
