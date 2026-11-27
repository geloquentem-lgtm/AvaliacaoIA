import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProducts } from "./api";

afterEach(() => vi.unstubAllGlobals());

describe("API do cardápio", () => {
  it("apresenta uma mensagem clara quando não consegue conectar", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(fetchProducts()).rejects.toThrow(
      "Não foi possível conectar à API. Verifique a conexão e tente novamente.",
    );
  });

  it("envia filtros no contrato da API", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } }),
    );
    vi.stubGlobal("fetch", fetchMock);
    await fetchProducts({ categoryId: "hamburgueres", search: "bacon" });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(
        /^http:\/\/localhost:3000\/api\/v1\/products\?categoryId=hamburgueres&search=bacon$/,
      ),
      expect.objectContaining({ headers: { Accept: "application/json" } }),
    );
  });
});
