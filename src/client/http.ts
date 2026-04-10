export type QueryValue =
  | string
  | number
  | boolean
  | string[]
  | undefined
  | null;

type ErrorPayload = {
  code?: string;
  message?: string;
  [key: string]: unknown;
};

export class ShoppiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ShoppiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly headersFactory: () => Record<string, string>;

  constructor(
    baseUrl: string,
    headersFactory: () => Record<string, string> = () => ({})
  ) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    this.headersFactory = headersFactory;
  }

  async get<T>(path: string, query?: Record<string, QueryValue>): Promise<T> {
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(normalizedPath, this.baseUrl);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null || value === "") continue;

        if (Array.isArray(value)) {
          for (const item of value) {
            url.searchParams.append(key, item);
          }
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...this.headersFactory(),
      },
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data: unknown = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const errorData = this.asErrorPayload(data);

      throw new ShoppiError(
        res.status,
        errorData?.code ?? "HTTP_ERROR",
        errorData?.message ?? `Request failed with status ${res.status}`,
        data
      );
    }

    return data as T;
  }

  private asErrorPayload(data: unknown): ErrorPayload | null {
    if (!data || typeof data !== "object") return null;
    return data as ErrorPayload;
  }
}