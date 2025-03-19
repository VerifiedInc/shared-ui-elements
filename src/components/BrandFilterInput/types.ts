export interface Brands {
  brandUuid: string;
  brandName: string;
  customerUuid: string;
  integrationType: string;
  oneClickCreated?: number;
  oneClickSuccess?: number;
  isLiveBrand?: boolean;
  isApproved?: boolean;
  additionalData?: any;
}

export type BrandFilter = {
  name: string;
  value: string;
  _raw: Brands;
};
