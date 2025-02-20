type WrappedPromiseEitherResponse<D, E> = [Awaited<D>, null] | [null, E];

/**
 * Wrap a promise to return an array with the data and the error.
 * @param promise The promise to wrap
 * @returns
 */
export async function wrapPromise<D, E = object>(
  promise: PromiseLike<D>,
): Promise<WrappedPromiseEitherResponse<D, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}
