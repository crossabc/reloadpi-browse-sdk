export type MoneyLike = {
  fixed?: number;
  min?: number;
  max?: number;
  currency?: string;
} | number | null | undefined;

export type TopupOffer = {
  id: string;
  offerId: string;
  brand: string;
  brandName?: string;
  country: string;
  regions?: string[];
  subTypes?: string[];
  productType?: string;
  priceType?: string;
  requiredFields?: string[];
  enabled?: boolean;
  notes?: string;
  shortNotes?: string;
  durationDays?: number;
  dataGb?: number;
  dataUnlimited?: boolean;
  smsNumber?: number;
  smsUnlimited?: boolean;
  voiceMinutes?: number;
  voiceUnlimited?: boolean;
  price?: MoneyLike;
  cost?: MoneyLike;
  send?: MoneyLike;
  raw?: unknown;
};

export type TopupSearchInput = {
  country?: string;
  brand?: string;
  subType?: string;
  region?: string;
  limit?: number;
  offset?: number;
};

export type TopupSearchFacets = {
  countries: string[];
  regions: string[];
  brands: string[];
  subTypes: string[];
};

export type TopupSearchResult = {
  items: TopupOffer[];
  total: number;
  limit: number;
  offset: number;
  facets: TopupSearchFacets;
};