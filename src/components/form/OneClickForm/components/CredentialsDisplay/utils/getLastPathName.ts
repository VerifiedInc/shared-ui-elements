/**
 * Returns the last path name from a given path.
 * @param path The path for which to get the last path name.
 * @returns The last path name.
 */
export const getLastPathName = (path: string): string => {
  const lastDotIndex = path.lastIndexOf('.');
  return lastDotIndex === -1 ? path : path.substring(lastDotIndex + 1);
};
