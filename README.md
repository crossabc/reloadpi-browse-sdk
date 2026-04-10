# @crossabc/reloadpi-browse-sdk

Official read-only SDK for browsing Shoppi catalog data, including:

* 🎟️ Vouchers (gift cards)
* 📱 Mobile top-ups
* 📶 eSIM plans

This SDK is designed for partners integrating Shoppi catalog browsing and referral flows.

---

## Installation

```bash
npm install @crossabc/reloadpi-browse-sdk
```

---

## Quick Start

```ts
import { ShoppiBrowseSDK } from "@crossabc/reloadpi-browse-sdk";

const sdk = new ShoppiBrowseSDK({
  baseUrl: "https://api.shoppi.com/api/", // ⚠️ trailing slash required
  apiKey: "YOUR_API_KEY",
  referralCode: "PARTNER_ABC",
});

// Search vouchers
const vouchers = await sdk.vouchers.searchOffers({
  country: "NG",
  brand: "Amazon",
  limit: 20,
});

console.log(vouchers.items);

// Generate referral link
const buyUrl = sdk.getBuyUrl("vouchers", "AMAZON_NG_001");
console.log(buyUrl);
```

---

## Configuration

```ts
const sdk = new ShoppiBrowseSDK({
  baseUrl: string,        // required (must end with `/`)
  apiKey?: string,        // recommended
  accessToken?: string,   // optional alternative auth
  shopUrl?: string,       // default: https://reloadpi.com
  referralCode?: string   // partner tracking
});
```

---

## Modules

### Vouchers

```ts
const res = await sdk.vouchers.searchOffers({
  country: "NG",
  brand: "Amazon",
  limit: 20
});
```

### Top-ups

```ts
const res = await sdk.topups.searchOffers({
  country: "GH",
  limit: 10
});
```

### eSIMs

```ts
const res = await sdk.esims.searchPlans({
  country: "US",
  limit: 5
});
```

---

## Referral Links

### Product page

```ts
sdk.getBuyUrl("vouchers", "AMAZON_NG_001");
```

Example output:

```
https://reloadpi.com/vouchers/offer/AMAZON_NG_001?ref=PARTNER_ABC
```

### Catalog page

```ts
sdk.getCatalogUrl("vouchers", { country: "NG" });
```

---

## Error Handling

```ts
import { ShoppiError } from "@crossabc/reloadpi-browse-sdk";

try {
  await sdk.vouchers.searchOffers({ country: "NG" });
} catch (err) {
  if (err instanceof ShoppiError) {
    console.error(err.status, err.code, err.message);
  }
}
```

---

## API Access & Permissions

This SDK is publicly installable, but API access is restricted.

* All requests require valid credentials
* Access is controlled via API keys or tokens
* Rate limits and permissions are enforced server-side
* Keys may be revoked or limited at any time

To request access, contact Shoppi.

---

## Versioning

This package is currently in early release (0.x).

* Breaking changes may occur between minor versions
* Stable API will be introduced at 1.0.0
