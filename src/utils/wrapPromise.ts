type WrappedPromiseEitherResponse<D, Error> =
  | [Awaited<D>, null]
  | [null, Error];

/**
 * Wrap a promise to return an array with the data and the error.
 * @param promise The promise to wrap
 * @returns
 */
export async function wrapPromise<D, Error = any>(
  promise: PromiseLike<D>,
): Promise<WrappedPromiseEitherResponse<D, Error>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}
