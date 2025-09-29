/**
 * Generates a 32-bit unsigned integer hash from a string.
 *
 * @param input The string to generate a hash from.
 * @returns A 32-bit unsigned integer hash.
 */
export function generateKeyFromString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash += input.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >> 6;
  }
  hash += hash << 3;
  hash ^= hash >> 11;
  hash += hash << 15;
  // Convert to unsigned 32-bit
  return String(hash >>> 0);
}
