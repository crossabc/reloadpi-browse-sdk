import { ShoppiBrowseSDK } from "../client/ShoppiBrowseSDK.js";

export function createBrowseTools(sdk: ShoppiBrowseSDK) {
  return {
    search_topup_offers: {
      description: "Search mobile topup offers by country, brand, subtype, or region.",
      execute: (input: any) => sdk.topups.searchOffers(input),
    },
    get_topup_offer: {
      description: "Get a topup offer by offer ID.",
      execute: ({ offerId }: { offerId: string }) => sdk.topups.getOfferById(offerId),
    },
    list_topup_countries: {
      description: "List available countries for topup offers.",
      execute: () => sdk.topups.listCountries(),
    },
    list_topup_regions: {
      description: "List available regions for topup offers.",
      execute: () => sdk.topups.listRegions(),
    },

    search_voucher_offers: {
      description: "Search voucher offers by brand, country, subtype, region, or text query.",
      execute: (input: any) => sdk.vouchers.searchOffers(input),
    },
    get_voucher_offer: {
      description: "Get a voucher offer by offer ID.",
      execute: ({ offerId }: { offerId: string }) => sdk.vouchers.getOfferById(offerId),
    },
    list_voucher_countries: {
      description: "List available voucher countries.",
      execute: () => sdk.vouchers.listCountries(),
    },
    get_voucher_filters: {
      description: "Get voucher browse filters such as countries, subtypes, regions, and brands.",
      execute: (input: any) => sdk.vouchers.getFilters(input),
    },
    get_voucher_brands_map: {
      description: "Get voucher brand metadata map.",
      execute: () => sdk.vouchers.getBrandsMap(),
    },

    search_esim_plans: {
      description: "Search eSIM plans by brand, country, region, subtype, or text query.",
      execute: (input: any) => sdk.esims.searchPlans(input),
    },
    get_esim_plan: {
      description: "Get an eSIM plan by offer ID.",
      execute: ({ offerId }: { offerId: string }) => sdk.esims.getPlanById(offerId),
    },
  };
}