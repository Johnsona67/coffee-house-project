import type { Product, ApiResponse } from "../types/api";

export function isProduct(u: unknown): u is Product {
  if (typeof u !== "object" || u === null) return false;
  const o = u as Record<string, unknown>;
  
  const priceOk = typeof o.price === "string" || typeof o.price === "number";
  const discountOk =
    o.discountPrice === undefined ||
    o.discountPrice === null ||
    typeof o.discountPrice === "string" ||
    typeof o.discountPrice === "number";
  
  const categoryOk = o.category === undefined || o.category === null || typeof o.category === "string";
  const descriptionOk = o.description === undefined || o.description === null || typeof o.description === "string";

  return (
    typeof o.id === "number" &&
    typeof o.name === "string" &&
    descriptionOk &&
    priceOk &&
    discountOk &&
    categoryOk
  );
}

export function assertProductsResponse(u: unknown): asserts u is ApiResponse<Product[]> {
  if (typeof u !== "object" || u === null) {
    throw new Error("Malformed response: not an object");
  }

  const o = u as Record<string, unknown>;
  const dataUnknown = (o as { data?: unknown }).data;

  if (!Array.isArray(dataUnknown)) {
    throw new Error("Malformed response: data is not an array");
  }

  const filtered = (dataUnknown as unknown[]).filter(isProduct) as Product[];
  (o as { data: Product[] }).data = filtered;

  if (filtered.length === 0) {
    throw new Error("No valid products found in the response.");
  }
}

