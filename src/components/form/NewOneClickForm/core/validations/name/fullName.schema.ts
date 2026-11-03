import { firstSchema } from './first.schema';
import { lastSchema } from './last.schema';
import { middleSchema } from './middle.schema';
import { zod3Object } from '../../../../../../utils/zod';

export const fullNameSchema = zod3Object({
  firstName: firstSchema,
  lastName: lastSchema,
  middleName: middleSchema,
});
