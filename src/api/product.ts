import type { Product, ApiResponse } from "../types/api";
import { requestJson } from "./client";
import { assertProductsResponse } from "./validator";
import { getCurrentLanguage, languageToLocale } from "../utils/translation";

const BASE_URL = "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com";
const FAVORITES_PATH = "/products/favorites";
const MENU_PATH = "/products";
const LIMITATION : number = 3;

function buildHeaders() {
  const lang = getCurrentLanguage();
  const locale = languageToLocale[lang] ?? languageToLocale.EN;
  return {
    "Accept-Language": locale,
  };
}

export async function getFavoriteProducts(limit = LIMITATION): Promise<Product[]> {
  const url = `${BASE_URL}${FAVORITES_PATH}`;
  const json = await requestJson<ApiResponse<unknown>>(url, {
    method: "GET",
    headers: buildHeaders(),
  });

  assertProductsResponse(json);

  return json.data.filter(p => p.category === "coffee").slice(0, limit);
}
export async function getMenuProducts(): Promise<Product[]> {
  const url = `${BASE_URL}${MENU_PATH}`;
  const json = await requestJson<ApiResponse<unknown>>(url, {
    method: "GET",
    headers: buildHeaders(),
  });

  assertProductsResponse(json); 

  return (json as ApiResponse<Product[]>).data.sort((a, b) => a.id - b.id);
}
