/**
 * Converts a kebab-case string to a pretty format with proper capitalization
 * Example: "one-click-auth" becomes "One Click Auth"
 */
export const kebabCaseToPretty = (str: string): string => {
  if (!str) return '';
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
