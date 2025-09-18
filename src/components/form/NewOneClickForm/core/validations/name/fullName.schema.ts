import { z } from 'zod';

import { firstSchema } from './first.schema';
import { lastSchema } from './last.schema';
import { middleSchema } from './middle.schema';

export const fullNameSchema = z.object({
  firstName: firstSchema,
  lastName: lastSchema,
  middleName: middleSchema,
});
