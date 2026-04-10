//src/packages/shoppi-browse-sdk/src/modules/topup.ts
import { HttpClient } from "../client/http.js";
import type {
  TopupOffer,
  TopupSearchInput,
  TopupSearchResult,
} from "../types/topups.js";

const BASE = "topups";

export class TopupsModule {
  constructor(private http: HttpClient) {}

  async searchOffers(input: TopupSearchInput = {}): Promise<TopupSearchResult> {
    const res = await this.http.get<any>(`${BASE}/offers`, input);

    return {
      items: Array.isArray(res?.list) ? res.list.map(normalizeTopupOffer) : [],
      total: Number(res?.total ?? 0),
      limit: Number(res?.limit ?? input.limit ?? 20),
      offset: Number(res?.offset ?? input.offset ?? 0),
      facets: {
        countries: Array.isArray(res?.facets?.countries) ? res.facets.countries : [],
        regions: Array.isArray(res?.facets?.regions) ? res.facets.regions : [],
        brands: Array.isArray(res?.facets?.brands) ? res.facets.brands : [],
        subTypes: Array.isArray(res?.facets?.subTypes) ? res.facets.subTypes : [],
      },
    };
  }

  async getOfferById(offerId: string): Promise<TopupOffer> {
    const res = await this.http.get<any>(`${BASE}/offers/${offerId}`);
    return normalizeTopupOffer(res);
  }

  async listCountries(): Promise<string[]> {
    const res = await this.http.get<any>(`${BASE}/countries`);
    return Array.isArray(res) ? res.filter(Boolean) : [];
  }

  async listRegions(): Promise<string[]> {
    const res = await this.http.get<any>(`${BASE}/regions`);
    return Array.isArray(res) ? res.filter(Boolean) : [];
  }
}

function normalizeTopupOffer(raw: any): TopupOffer {
  return {
    id: String(raw?._id ?? raw?.offerId ?? raw?.id ?? ""),
    offerId: String(raw?.offerId ?? raw?.id ?? ""),
    brand: raw?.brand ?? "",
    brandName: raw?.brandName,
    country: raw?.country ?? "",
    regions: Array.isArray(raw?.regions) ? raw.regions : [],
    subTypes: Array.isArray(raw?.subTypes) ? raw.subTypes : [],
    productType: raw?.productType,
    priceType: raw?.priceType,
    requiredFields: Array.isArray(raw?.requiredFields) ? raw.requiredFields : [],
    enabled: raw?.enabled,
    notes: raw?.notes,
    shortNotes: raw?.shortNotes,
    durationDays: raw?.durationDays,
    dataGb: raw?.dataGB,
    dataUnlimited: raw?.dataUnlimited,
    smsNumber: raw?.smsNumber,
    smsUnlimited: raw?.smsUnlimited,
    voiceMinutes: raw?.voiceMinutes,
    voiceUnlimited: raw?.voiceUnlimited,
    price: raw?.price,
    cost: raw?.cost,
    send: raw?.send,
    raw,
  };
}