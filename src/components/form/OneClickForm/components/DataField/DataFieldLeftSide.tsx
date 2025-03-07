import { ReactElement } from 'react';

import { DataFieldCheckbox } from './DataFieldCheckbox';

/**
 * This component will render the left side of a data field,
 * rendering checkbox or nothing depending on the isSelectable field.
 * @constructor
 */
export function DataFieldLeftSide(): ReactElement {
  return <DataFieldCheckbox />;
}
