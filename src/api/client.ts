export class ApiError extends Error {
  public readonly status: number;
  public readonly body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function requestJson<T>(
  url: string,
  { timeoutMs = 8000, headers, ...init }: RequestOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(headers ?? {}),
      },
      signal: controller.signal,
    });

    let parsed: unknown = undefined;
    try {
      parsed = await res.json();
    } catch {
    }

    if (!res.ok) {
      const msg =
        (parsed as { error?: string } | undefined)?.error ??
        `HTTP ${res.status}`;
      throw new ApiError(msg, res.status, parsed);
    }

    return parsed as T;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("Request timed out", 0);
    }
    if (err instanceof ApiError) throw err;
    throw new ApiError((err as Error).message || "Network error", 0);
  } finally {
    clearTimeout(t);
  }
}
