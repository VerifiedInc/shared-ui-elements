import * as zod from 'zod';

export const UUIDFragmentSchema = zod.string().uuid();
