import type { Category, Product } from "./menu";

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1"
).replace(/\/$/, "");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCategory(value: unknown): value is Category {
  return isRecord(value) && typeof value.id === "string" && typeof value.name === "string";
}

function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    Number.isInteger(value.price) &&
    typeof value.category === "object" &&
    value.category !== null &&
    isCategory(value.category) &&
    (typeof value.imageUrl === "string" || value.imageUrl === null) &&
    (typeof value.tag === "string" || value.tag === null)
  );
}

async function getJson(path: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Não foi possível conectar à API. Verifique a conexão e tente novamente.");
    }
    throw error;
  }

  const body: unknown = await response.json();
  if (!response.ok) {
    const error = isRecord(body) && isRecord(body.error) ? body.error : null;
    const message = error && typeof error.message === "string" ? error.message : null;
    throw new Error(message ?? `A API respondeu com status ${response.status}.`);
  }
  return body;
}

export async function fetchCategories(): Promise<Category[]> {
  const body = await getJson("/categories");
  if (!Array.isArray(body) || !body.every(isCategory)) {
    throw new Error("A API retornou uma lista de categorias inválida.");
  }
  return body;
}

export async function fetchProducts(
  filters: { categoryId?: string; search?: string } = {},
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.search?.trim()) params.set("search", filters.search.trim());
  const query = params.size > 0 ? `?${params.toString()}` : "";
  const body = await getJson(`/products${query}`);
  if (!Array.isArray(body) || !body.every(isProduct)) {
    throw new Error("A API retornou uma lista de produtos inválida.");
  }
  return body;
}
