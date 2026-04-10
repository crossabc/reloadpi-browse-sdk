export type VoucherMoneyLike =
  | {
      type?: string;
      currency?: string;
      currencyDivisor?: number;
      min?: number;
      max?: number;
      step?: number;
      values?: number[];
      fixed?: number;
    }
  | number
  | null
  | undefined;

export type VoucherOffer = {
  id: string;
  offerId: string;
  brand: string;
  brandName?: string;
  country: string;
  regions: string[];
  subTypes: string[];
  description?: string;
  notes?: string;
  shortNotes?: string;
  productType?: string;
  requiredFields?: unknown[];
  price?: VoucherMoneyLike;
  send?: unknown;
  image?: string | null;
  raw?: unknown;
};

export type VoucherOfferDetail = VoucherOffer & {
  redemptionInstructions?: string[] | unknown[];
  brandInfoPdf?: string;
};

export type VoucherSearchInput = {
  brand?: string;
  country?: string;
  regions?: string | string[];
  subType?: string;
  search?: string;
  limit?: number;
  offset?: number;
};

export type VoucherSearchResult = {
  items: VoucherOffer[];
  total: number;
  limit: number;
  offset: number;
};

export type VoucherFilters = {
  countries: string[];
  subTypes: string[];
  regions: string[];
  brands: string[];
};

export type VoucherBrandMeta = {
  brand?: string;
  brandName?: string;
  image?: string;
  logo?: string;
  brandLogo?: string;
  [key: string]: unknown;
};

export type VoucherBrandsMap = Record<string, VoucherBrandMeta>;