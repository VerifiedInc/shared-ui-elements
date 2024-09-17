import _ from 'lodash';

export function omitProperties<T>(obj: T, propertiesToOmit: string[]): T {
  if (_.isArray(obj)) {
    // If obj is an array, apply the function to each element
    return obj.map((item) => omitProperties(item, propertiesToOmit)) as T;
  } else if (_.isObject(obj)) {
    // If obj is an object, omit the specified properties
    let omittedObject: any = _.omit(obj, propertiesToOmit);
    // Recursively apply the function to each property in the object
    omittedObject = _.mapValues(omittedObject, (value) =>
      omitProperties(value, propertiesToOmit),
    );
    return omittedObject as T;
  } else {
    // If obj is neither an array nor an object, return it as is
    return obj;
  }
}
