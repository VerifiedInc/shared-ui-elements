import { z } from 'zod';

import { line1Schema } from './line1.schema';
import { line2Schema } from './line2.schema';
import { citySchema } from './city.schema';
import { stateSchema } from './state.schema';
import { countrySchema } from './country.schema';
import { zipCodeSchema } from './zipcode.schema';

export const addressSchema = z.object({
  line1: line1Schema.min(1, 'Line 1 is required'),
  line2: line2Schema,
  city: citySchema.min(1, 'City is required'),
  state: stateSchema,
  country: countrySchema,
  zipCode: zipCodeSchema,
});
