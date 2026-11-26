import { describe, expect, it } from "vitest";
import {
  canCheckout,
  cartCount,
  cartItems,
  cartTotal,
  changeQuantity,
  filterProducts,
  money,
  products,
} from "./menu";
describe("Cardápio e pedido", () => {
  it("inclui os sete produtos e seus preços em centavos", () => {
    expect(products.map((p) => p.price)).toEqual([2590, 2990, 2490, 1500, 1800, 700, 900]);
  });
  it("incrementa um produto existente e conta todas as unidades", () => {
    expect(changeQuantity({ classic: 1 }, "classic", 1)).toEqual({ classic: 2 });
    expect(cartCount({ classic: 2, soda: 1 })).toBe(3);
  });
  it("remove automaticamente um produto ao chegar a zero", () => {
    expect(changeQuantity({ classic: 1 }, "classic", -1)).toEqual({});
  });
  it("calcula subtotal como preço vezes quantidade", () => {
    expect(cartItems({ classic: 2 })[0]?.subtotal).toBe(5180);
  });
  it("soma os subtotais e recalcula após remoção", () => {
    expect(cartTotal({ classic: 2, soda: 1 })).toBe(5880);
    expect(cartTotal(changeQuantity({ classic: 2, soda: 1 }, "soda", -1))).toBe(5180);
  });
  it("bloqueia finalização vazia e permite pedido com produto", () => {
    expect(canCheckout({})).toBe(false);
    expect(canCheckout({ soda: 1 })).toBe(true);
  });
  it("combina pesquisa e categoria", () => {
    expect(filterProducts("Hambúrgueres", "bacon").map((p) => p.id)).toEqual(["bacon"]);
    expect(filterProducts("Bebidas", "bacon")).toEqual([]);
    expect(filterProducts("Todos", "").length).toBe(7);
  });
  it("formata moeda brasileira", () => {
    expect(money(2590).replace(/\s/g, " ")).toBe("R$ 25,90");
  });
});
