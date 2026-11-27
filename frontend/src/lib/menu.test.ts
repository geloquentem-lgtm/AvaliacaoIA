import { describe, expect, it } from "vitest";
import {
  canCheckout,
  cartCount,
  cartItems,
  cartTotal,
  changeQuantity,
  money,
  type Product,
} from "./menu";

const products: Product[] = [
  {
    id: "classic",
    name: "Classic Burger",
    description: "Pão brioche e queijo.",
    price: 2590,
    category: { id: "hamburgueres", name: "Hambúrgueres" },
    imageUrl: null,
    tag: "O favorito",
  },
  {
    id: "soda",
    name: "Refrigerante",
    description: "Lata gelada.",
    price: 700,
    category: { id: "bebidas", name: "Bebidas" },
    imageUrl: null,
    tag: null,
  },
];

describe("Cardápio e pedido", () => {
  it("incrementa um produto existente e conta todas as unidades", () => {
    expect(changeQuantity({ classic: 1 }, "classic", 1)).toEqual({ classic: 2 });
    expect(cartCount({ classic: 2, soda: 1 }, products)).toBe(3);
  });
  it("remove automaticamente um produto ao chegar a zero", () => {
    expect(changeQuantity({ classic: 1 }, "classic", -1)).toEqual({});
  });
  it("calcula subtotal como preço vezes quantidade", () => {
    expect(cartItems({ classic: 2 }, products)[0]?.subtotal).toBe(5180);
  });
  it("soma os subtotais e recalcula após remoção", () => {
    expect(cartTotal({ classic: 2, soda: 1 }, products)).toBe(5880);
    expect(cartTotal(changeQuantity({ classic: 2, soda: 1 }, "soda", -1), products)).toBe(5180);
  });
  it("bloqueia finalização vazia e permite pedido com produto", () => {
    expect(canCheckout({}, products)).toBe(false);
    expect(canCheckout({ soda: 1 }, products)).toBe(true);
  });
  it("formata moeda brasileira", () => {
    expect(money(2590).replace(/\s/g, " ")).toBe("R$ 25,90");
  });
});
