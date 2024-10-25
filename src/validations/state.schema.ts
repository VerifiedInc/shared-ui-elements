import { z } from 'zod';

export const stateSchema = z.string().min(2).max(2);
