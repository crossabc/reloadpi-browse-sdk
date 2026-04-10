export type ListResult<T> = {
  items: T[];
  total?: number;
  nextCursor?: string | null;
};

export type BrowseItem = {
  id: string;
  type: "voucher" | "topup" | "esim";
  title: string;
  subtitle?: string;
  country?: string;
  region?: string;
  provider?: string;
  price?: number;
  currency?: string;
  available?: boolean;
  raw?: unknown;
};