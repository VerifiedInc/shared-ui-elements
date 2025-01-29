// Infer a schema as composite one.
export const isCompositeBySchema = (schema: any | undefined): boolean =>
  Object.prototype.hasOwnProperty.call(schema || {}, 'anyOf') ||
  Object.prototype.hasOwnProperty.call(schema || {}, 'allOf');
