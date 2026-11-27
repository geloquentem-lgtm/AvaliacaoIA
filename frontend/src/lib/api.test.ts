import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProducts } from "./api";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("API do cardápio", () => {
  it("apresenta uma mensagem clara quando não consegue conectar", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    await expect(fetchProducts()).rejects.toThrow(
      "Não foi possível conectar à API. Verifique a conexão e tente novamente.",
    );
  });

  it("envia filtros de categoria e busca no contrato", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
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

  it("exibe a mensagem de erro da API sem recorrer a dados locais", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: { code: "INTERNAL_ERROR", message: "Catálogo indisponível." },
          }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );

    await expect(fetchProducts()).rejects.toThrow("Catálogo indisponível.");
  });
});
