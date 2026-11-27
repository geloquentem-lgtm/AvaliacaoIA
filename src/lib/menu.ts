export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string | null;
  tag: string | null;
};
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
export function cartItems(cart: Cart, products: Product[]) {
  return products
    .filter((product) => (cart[product.id] ?? 0) > 0)
    .map((product) => ({
      product,
      quantity: cart[product.id] ?? 0,
      subtotal: product.price * (cart[product.id] ?? 0),
    }));
}

export const cartTotal = (cart: Cart, products: Product[]) =>
  cartItems(cart, products).reduce((total, item) => total + item.subtotal, 0);

export const cartCount = (cart: Cart, products: Product[]) =>
  cartItems(cart, products).reduce((total, item) => total + item.quantity, 0);

export const canCheckout = (cart: Cart, products: Product[]) =>
  cartItems(cart, products).length > 0;
