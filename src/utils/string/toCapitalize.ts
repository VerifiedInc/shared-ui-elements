/**
 * Capitalize the first letter of every word, e.g "hello world" -> "Hello World"
 * @param str
 */
export function toCapitalize(str: string): string {
  return str
    .split(' ')
    .map(
      (substr) =>
        `${substr.charAt(0).toUpperCase()}${substr.slice(1).toLowerCase()}`,
    )
    .join(' ');
}
