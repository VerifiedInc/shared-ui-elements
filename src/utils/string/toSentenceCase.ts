/**
 * Capitalize the first letter of a string e.g "hello world" -> "Hello world"
 * @param str
 */
export function toSentenceCase(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}
