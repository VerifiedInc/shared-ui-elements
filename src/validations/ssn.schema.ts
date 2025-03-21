import { z } from 'zod';

// SSN schema, validation regex were gathered from: https://uibakery.io/regex-library/ssn
// The 000 allows for SSN testing. Ref: https://secure.ssa.gov/poms.nsf/lnx/0110201020
const ssnRegex = /^(?!666|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/;

export const SSNSchema = z.string().regex(ssnRegex);

/**
 * It accepts SSN in the format '•••-••-1900' or '123-45-6789'.
 * When dealing with masked SSN, in the backend you will need to call 1-Click API GET to get the unmasked version of SSN again.
 * If this is the user input SSN there will be no need to call the 1-Click API GET.
 */
// SSN schema, unmasked validation regex were gathered from: https://uibakery.io/regex-library/ssn
export const MaskedAndUnmaskedSSNSchema = z.string().refine(
  (val) => {
    const maskedRegex = /^•••-••-(\d{4})$/;
    return maskedRegex.test(val) || ssnRegex.test(val);
  },
  {
    message: 'Invalid SSN',
  },
);
