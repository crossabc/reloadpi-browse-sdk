import { HttpClient } from "../client/http.js";
import type {
  VoucherOffer,
  VoucherOfferDetail,
  VoucherSearchInput,
  VoucherSearchResult,
  VoucherFilters,
  VoucherBrandsMap,
} from "../types/vouchers.js";

const BASE = "vouchers";

export class VouchersModule {
  constructor(private http: HttpClient) {}

  async searchOffers(input: VoucherSearchInput = {}): Promise<VoucherSearchResult> {
    const query = {
      brand: input.brand,
      country: input.country,
      regions: input.regions,
      subType: input.subType,
      search: input.search,
      _limit: input.limit,
      _offset: input.offset,
    };

    const res = await this.http.get<any>(`${BASE}/offers`, query);

    return {
      items: Array.isArray(res?.list) ? res.list.map(normalizeVoucherOffer) : [],
      total: Number(res?.total ?? 0),
      limit: Number(res?.limit ?? input.limit ?? 20),
      offset: Number(res?.offset ?? input.offset ?? 0),
    };
  }

  async getOfferById(offerId: string): Promise<VoucherOfferDetail> {
    const res = await this.http.get<any>(`${BASE}/offers/${offerId}`);
    return normalizeVoucherOfferDetail(res);
  }

  async listCountries(): Promise<string[]> {
    const res = await this.http.get<any>(`${BASE}/countries`);
    return Array.isArray(res) ? res.filter(Boolean) : [];
  }

  async getFilters(input?: {
    brand?: string;
    country?: string;
    subType?: string;
    regions?: string | string[];
  }): Promise<VoucherFilters> {
    const res = await this.http.get<any>(`${BASE}/filters`, input);

    return {
      countries: Array.isArray(res?.countries) ? res.countries.filter(Boolean) : [],
      subTypes: Array.isArray(res?.subTypes) ? res.subTypes.filter(Boolean) : [],
      regions: Array.isArray(res?.regions) ? res.regions.filter(Boolean) : [],
      brands: Array.isArray(res?.brands) ? res.brands.filter(Boolean) : [],
    };
  }

  async getBrandsMap(): Promise<VoucherBrandsMap> {
    const res = await this.http.get<any>(`${BASE}/brands`);
    return isPlainObject(res) ? (res as VoucherBrandsMap) : {};
  }

  async listBrandNames(): Promise<string[]> {
    const map = await this.getBrandsMap();
    const names = Object.values(map)
      .map((x) => x.brandName || x.brand)
      .filter(Boolean) as string[];

    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  }
}

function normalizeVoucherOffer(raw: any): VoucherOffer {
  return {
    id: String(raw?._id ?? raw?.offerId ?? raw?.id ?? ""),
    offerId: String(raw?.offerId ?? raw?.id ?? ""),
    brand: raw?.brand ?? "",
    brandName: raw?.brandName,
    country: raw?.country ?? "",
    regions: Array.isArray(raw?.regions) ? raw.regions : [],
    subTypes: Array.isArray(raw?.subTypes) ? raw.subTypes : [],
    description: raw?.description,
    notes: raw?.notes,
    shortNotes: raw?.shortNotes,
    productType: raw?.productType,
    requiredFields: Array.isArray(raw?.requiredFields) ? raw.requiredFields : [],
    price: raw?.price,
    send: raw?.send,
    image: raw?.image ?? null,
    raw,
  };
}

function normalizeVoucherOfferDetail(raw: any): VoucherOfferDetail {
  const base = normalizeVoucherOffer(raw);

  return {
    ...base,
    description: raw?.description ?? raw?.longDescription ?? base.description,
    redemptionInstructions: Array.isArray(raw?.redemptionInstructions)
      ? raw.redemptionInstructions
      : [],
    brandInfoPdf: raw?.brandInfoPdf ?? "",
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}