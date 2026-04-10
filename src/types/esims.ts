export type EsimPrice =
  | {
      currency?: string;
      currencyDivisor?: number;
      fixed?: number;
    }
  | number
  | null
  | undefined;

export type EsimPlan = {
  id: string;
  offerId: string;
  brand?: string;
  country?: string;
  regions: string[];
  dataGb?: number;
  dataUnlimited?: boolean;
  durationDays?: number;
  price?: EsimPrice;
  priceCurrency?: string;
  priceCurrencyDivisor?: number;
  cost?: number;
  costCurrency?: string;
  costCurrencyDivisor?: number;
  priceType?: string;
  productType?: string;
  subTypes: string[];
  notes?: string;
  shortNotes?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  raw?: unknown;
};

export type EsimSearchInput = {
  brand?: string;
  country?: string;
  regions?: string;
  subType?: string;
  q?: string;
  limit?: number;
  offset?: number;
  all?: boolean;
};

export type EsimSearchResult = {
  items: EsimPlan[];
  total: number;
  limit: number;
  offset: number;
  debug?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    noPage?: boolean;
  };
};