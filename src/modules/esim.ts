import { HttpClient } from "../client/http.js";
import type {
  EsimPlan,
  EsimSearchInput,
  EsimSearchResult,
} from "../types/esims.js";

const BASE = "esim";

export class EsimsModule {
  constructor(private readonly http: HttpClient) {}

  async searchPlans(input: EsimSearchInput = {}): Promise<EsimSearchResult> {
    const query = {
      brand: input.brand,
      country: input.country,
      regions: input.regions,
      subType: input.subType,
      q: input.q,
      _limit: input.limit,
      _offset: input.offset,
      _all: input.all ? "1" : undefined,
    };

    const res = await this.http.get<any>(`${BASE}/offers`, query);

    const result: EsimSearchResult = {
      items: Array.isArray(res?.list) ? res.list.map(normalizeEsimPlan) : [],
      total: Number(res?.total ?? 0),
      limit: Number(res?.limit ?? input.limit ?? 20),
      offset: Number(res?.offset ?? input.offset ?? 0),
    };

    if (res?.debug) {
      result.debug = {
        minPrice: res.debug.minPrice ?? null,
        maxPrice: res.debug.maxPrice ?? null,
        noPage: !!res.debug.noPage,
      };
    }

    return result;
  }

  async getPlanById(offerId: string): Promise<EsimPlan> {
    const res = await this.http.get<any>(`${BASE}/offers/${offerId}`);
    return normalizeEsimPlan(res);
  }
}

function normalizeEsimPlan(raw: any): EsimPlan {
  return {
    id: String(raw?.offerId ?? raw?.id ?? ""),
    offerId: String(raw?.offerId ?? raw?.id ?? ""),
    brand: raw?.brand,
    country: raw?.country,
    regions: Array.isArray(raw?.regions) ? raw.regions : [],
    dataGb: raw?.dataGB,
    dataUnlimited: raw?.dataUnlimited,
    durationDays: raw?.durationDays,
    price: raw?.price,
    priceCurrency: raw?.priceCurrency,
    priceCurrencyDivisor: raw?.priceCurrencyDivisor,
    cost: raw?.cost,
    costCurrency: raw?.costCurrency,
    costCurrencyDivisor: raw?.costCurrencyDivisor,
    priceType: raw?.priceType,
    productType: raw?.productType,
    subTypes: Array.isArray(raw?.subTypes) ? raw.subTypes : [],
    notes: raw?.notes,
    shortNotes: raw?.shortNotes,
    enabled: raw?.enabled,
    createdAt: raw?.createdAt,
    updatedAt: raw?.updatedAt,
    raw,
  };
}