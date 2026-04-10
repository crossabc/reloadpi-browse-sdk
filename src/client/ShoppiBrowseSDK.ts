// src/client/ShoppiBrowseSDK.ts
import { HttpClient } from "./http.js";
import { VouchersModule } from "../modules/vouchers.js";
import { TopupsModule } from "../modules/topup.js";
import { EsimsModule } from "../modules/esim.js";

export interface ShoppiBrowseSDKOptions {
  baseUrl: string;
  apiKey?: string;
  accessToken?: string;

  /**
   * Your storefront base URL.
   * Used to build referral deep-links for partner "Buy" buttons.
   * Defaults to https://reloadpi.com
   */
  shopUrl?: string;

  /**
   * Partner referral code.
   * When set, getBuyUrl() appends ?ref=<referralCode> to all deep-links.
   */
  referralCode?: string;
}

export class ShoppiBrowseSDK {
  public vouchers: VouchersModule;
  public topups: TopupsModule;
  public esims: EsimsModule;

  private http: HttpClient;
  private shopUrl: string;
 private referralCode: string | undefined;

  constructor(options: ShoppiBrowseSDKOptions) {
    this.http = new HttpClient(options.baseUrl, () => {
      const headers: Record<string, string> = {};
      if (options.apiKey) headers["x-api-key"] = options.apiKey;
      if (options.accessToken) headers["authorization"] = `Bearer ${options.accessToken}`;
      return headers;
    });

    this.shopUrl = (options.shopUrl ?? "https://reloadpi.com").replace(/\/$/, "");
    this.referralCode = options.referralCode;

    this.vouchers = new VouchersModule(this.http);
    this.topups = new TopupsModule(this.http);
    this.esims = new EsimsModule(this.http);
  }

  /**
   * Build a referral deep-link to a product page on the storefront.
   *
   * @param catalog  - "vouchers" | "topups" | "esims"
   * @param offerId  - the offer ID
   * @returns        - full URL string, e.g. https://reloadpi.com/vouchers/offer/AMAZON_NG_001?ref=PARTNER_ABC
   *
   * @example
   * sdk.getBuyUrl("vouchers", "AMAZON_NG_001")
   * // → "https://reloadpi.com/vouchers/offer/AMAZON_NG_001?ref=PARTNER_ABC"
   */
  getBuyUrl(catalog: "vouchers" | "topups" | "esims", offerId: string): string {
    const path = `${this.shopUrl}/${catalog}/offer/${encodeURIComponent(offerId)}`;
    if (!this.referralCode) return path;
    return `${path}?ref=${encodeURIComponent(this.referralCode)}`;
  }

  /**
   * Build a referral link to a catalog listing page (no specific offer).
   *
   * @example
   * sdk.getCatalogUrl("vouchers", { country: "NG" })
   * // → "https://reloadpi.com/vouchers?country=NG&ref=PARTNER_ABC"
   */
  getCatalogUrl(
    catalog: "vouchers" | "topups" | "esims",
    filters?: Record<string, string>
  ): string {
    const url = new URL(`${this.shopUrl}/${catalog}`);
    if (filters) {
      for (const [k, v] of Object.entries(filters)) {
        if (v) url.searchParams.set(k, v);
      }
    }
    if (this.referralCode) url.searchParams.set("ref", this.referralCode);
    return url.toString();
  }
}