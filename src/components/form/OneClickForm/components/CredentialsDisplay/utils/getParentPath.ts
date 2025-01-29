/**
 * Returns the parent path of a given path.
 * @param path The path for which to get the parent path.
 * @returns The parent path.
 */
export const getParentPath = (path: string): string => {
  const lastDotIndex = path.lastIndexOf('.');
  return lastDotIndex === -1 ? path : path.substring(0, lastDotIndex);
};
