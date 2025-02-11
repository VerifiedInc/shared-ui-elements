export interface Brands {
  brandUuid: string;
  customerUuid: string;
  brandName: string;
  integrationType: string;
  oneClickCreated: number;
  oneClickSuccess: number;
  isLiveBrand: boolean;
  additionalData: any;
}

export type BrandFilter = {
  name: string;
  value: string;
  _raw: Brands;
};
