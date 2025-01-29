import { createObservable } from '../../utils/observers';

export const changeValue = createObservable<{ type: string; value: any }>();
