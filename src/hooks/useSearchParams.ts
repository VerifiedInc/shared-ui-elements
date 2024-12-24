/**
 * Returns a URLSearchParams object for the current URL search params.
 * @param search
 */
export function useSearchParams(search?: string | URLSearchParams) {
  return new URLSearchParams(search ?? window.location.search);
}
