import { z } from 'zod';

import { US_STATE_CODES } from '../../shared/us-states';

/**
 * Validation schema for US state
 * Validates against US state codes
 */
export const stateSchema = z.enum(US_STATE_CODES as [string, ...string[]]);
