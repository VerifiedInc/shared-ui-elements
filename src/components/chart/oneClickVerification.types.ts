/** Full interval entry as returned by the OneClickVerification API. */
export interface OneClickVerificationIntervalEntry {
  date: string | number;
  oneClickVerificationCreated: number;
  oneClickVerificationSending: number;
  oneClickVerificationDelivered: number;
  oneClickVerificationVerified: number;
  oneClickVerificationFailed: number;
  oneClickVerificationUndelivered: number;
  oneClickVerificationExpired: number;
  [key: string]: any;
}

/** Single brand entry as returned by the OneClickVerification API. */
export interface OneClickVerificationBrandData {
  brandUuid: string;
  brandName: string;
  interval?: OneClickVerificationIntervalEntry[];
}
