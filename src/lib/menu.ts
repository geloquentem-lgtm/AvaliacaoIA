export type Category = "Todos" | "Hambúrgueres" | "Porções" | "Bebidas";
export type Product = {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  tag?: string;
};
export const products: Product[] = [
  {
    id: "classic",
    name: "Classic Burger",
    description: "Pão brioche, hambúrguer artesanal, queijo, alface, tomate e molho da casa.",
    category: "Hambúrgueres",
    price: 2590,
    tag: "O favorito",
  },
  {
    id: "bacon",
    name: "Bacon Burger",
    description: "Hambúrguer artesanal, cheddar cremoso, bacon crocante e molho especial.",
    category: "Hambúrgueres",
    price: 2990,
    tag: "Mais pedido",
  },
  {
    id: "chicken",
    name: "Chicken Burger",
    description: "Frango empanado crocante, alface fresquinha e maionese da casa.",
    category: "Hambúrgueres",
    price: 2490,
  },
  {
    id: "fries",
    name: "Batata Frita",
    description: "Douradas por fora, macias por dentro. Uma porção feita para compartilhar.",
    category: "Porções",
    price: 1500,
  },
  {
    id: "onion",
    name: "Onion Rings",
    description: "Anéis de cebola empanados e crocantes, acompanhados de molho da casa.",
    category: "Porções",
    price: 1800,
  },
  {
    id: "soda",
    name: "Refrigerante",
    description: "Refrigerante em lata de 350 ml, servido bem gelado.",
    category: "Bebidas",
    price: 700,
  },
  {
    id: "juice",
    name: "Suco Natural",
    description: "Suco de laranja natural, fresquinho e preparado na hora.",
    category: "Bebidas",
    price: 900,
  },
];
export type Cart = Record<string, number>;
export const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export function changeQuantity(cart: Cart, id: string, change: number): Cart {
  const next = { ...cart };
  const quantity = (next[id] ?? 0) + change;
  if (quantity <= 0) delete next[id];
  else next[id] = quantity;
  return next;
}
export const cartItems = (cart: Cart) =>
  products
    .filter((p) => (cart[p.id] ?? 0) > 0)
    .map((product) => ({
      product,
      quantity: cart[product.id] ?? 0,
      subtotal: product.price * (cart[product.id] ?? 0),
    }));
export const cartTotal = (cart: Cart) =>
  cartItems(cart).reduce((total, item) => total + item.subtotal, 0);
export const cartCount = (cart: Cart) =>
  Object.values(cart).reduce((total, quantity) => total + quantity, 0);
export const canCheckout = (cart: Cart) => cartItems(cart).length > 0;
export function filterProducts(category: Category, search: string) {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return products.filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      normalize(`${p.name} ${p.description}`).includes(normalize(search.trim())),
  );
}
