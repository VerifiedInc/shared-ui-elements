// Infer a schema as atomic one.
export const isAtomicBySchema = (schema: any | undefined): boolean =>
  Object.prototype.hasOwnProperty.call(schema || {}, 'properties');
