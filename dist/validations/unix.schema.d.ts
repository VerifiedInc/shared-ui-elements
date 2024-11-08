import { z as zod } from 'zod';
export declare const getUnixSchema: (message?: string) => zod.ZodEffects<zod.ZodString, string, string>;
