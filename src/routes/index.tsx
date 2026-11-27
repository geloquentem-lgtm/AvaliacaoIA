import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Sandwich as Burger,
  Check,
  CircleCheck,
  Flame,
  Heart,
  LayoutGrid,
  MapPin,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Utensils,
  GlassWater,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  canCheckout,
  cartCount,
  cartItems,
  cartTotal,
  changeQuantity,
  money,
  type Cart,
  type Product,
} from "@/lib/menu";
import { fetchCategories, fetchProducts } from "@/lib/api";
import cover from "@/assets/cover.webp.asset.json";

const photos: Record<string, string> = {
  classic: "/images/products/classic.jpg",
  bacon: "/images/products/bacon.jpg",
  chicken: "/images/products/chicken.jpg",
  fries: "/images/products/fries.jpg",
  onion: "/images/products/onion.jpg",
  soda: "/images/products/soda.jpg",
  juice: "/images/products/juice.jpg",
};
const categoryIcons: Record<string, typeof Burger> = {
  hamburgueres: Burger,
  porcoes: Utensils,
  bebidas: GlassWater,
};
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brasa Burger | Nosso Cardápio" },
      {
        name: "description",
        content:
          "Hambúrgueres artesanais, porções crocantes e bebidas fresquinhas. Monte seu pedido no cardápio da Brasa Burger.",
      },
      { property: "og:title", content: "Brasa Burger | Nosso Cardápio" },
      {
        property: "og:description",
        content: "Escolha seus favoritos e monte seu pedido na Brasa Burger.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: cover.url },
      { name: "twitter:image", content: cover.url },
    ],
  }),
  component: Index,
});
function Index() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [order, setOrder] = useState<Cart | null>(null);
  const [mobileCart, setMobileCart] = useState(false);
  const [error, setError] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: false,
  });
  const catalogQuery = useQuery({
    queryKey: ["products", "catalog"],
    queryFn: () => fetchProducts(),
    retry: false,
  });
  const normalizedSearch = search.trim();
  const hasFilters = categoryId !== null || normalizedSearch.length > 0;
  const filteredProductsQuery = useQuery({
    queryKey: ["products", "filtered", categoryId, normalizedSearch],
    queryFn: () =>
      fetchProducts({
        ...(categoryId ? { categoryId } : {}),
        ...(normalizedSearch ? { search: normalizedSearch } : {}),
      }),
    enabled: hasFilters,
    retry: false,
  });
  const productsQuery = hasFilters ? filteredProductsQuery : catalogQuery;
  const allProducts = catalogQuery.data ?? [];
  const visible = productsQuery.data ?? [];
  const productLoadError = catalogQuery.error ?? productsQuery.error;
  const hasProductError = catalogQuery.isError || productsQuery.isError;
  const isProductsLoading = catalogQuery.isLoading || productsQuery.isLoading;
  const count = cartCount(cart, allProducts);
  function retryProducts() {
    if (catalogQuery.isError) void catalogQuery.refetch();
    if (hasFilters && filteredProductsQuery.isError) void filteredProductsQuery.refetch();
  }
  function update(id: string, delta: number) {
    setCart((current) => changeQuantity(current, id, delta));
    setError(false);
  }
  function checkout() {
    if (!canCheckout(cart, allProducts)) {
      setError(true);
      return;
    }
    setMobileCart(false);
    setConfirming(true);
  }
  function confirm() {
    if (!canCheckout(cart, allProducts)) return;
    setOrder({ ...cart });
    setCart({});
    setConfirming(false);
    setError(false);
  }
  function openCart() {
    if (window.matchMedia("(max-width: 760px)").matches) setMobileCart(true);
    else
      document
        .getElementById("your-order")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function OrderPanel() {
    return (
      <div className="order-panel" id="your-order">
        <div className="order-heading">
          <h2>
            <ShoppingBag size={19} /> Seu pedido
          </h2>
          <span>
            {count} {count === 1 ? "item" : "itens"}
          </span>
        </div>
        {count === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">
              <ShoppingBag size={29} strokeWidth={1.3} />
            </div>
            <h3>Seu pedido começa aqui</h3>
            <p>
              Que tal um burger de respeito?
              <br />
              Adicione seus favoritos ao pedido.
            </p>
          </div>
        ) : (
          <div className="order-items">
            {cartItems(cart, allProducts).map(({ product, quantity, subtotal }) => (
              <div className="order-item" key={product.id}>
                <div className="order-item-top">
                  <img src={photos[product.id] ?? product.imageUrl ?? cover.url} alt={product.name} />
                  <div className="flex-1">
                    <h3>{product.name}</h3>
                    <p>{money(product.price)} / unidade</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                     className="h-10 w-10 shrink-0 text-muted-foreground"
                    title={`Remover ${product.name}`}
                    aria-label={`Remover ${product.name}`}
                    onClick={() => update(product.id, -quantity)}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
                <div className="order-item-bottom">
                  <div className="quantity-control">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Diminuir ${product.name}`}
                      title={`Diminuir ${product.name}`}
                      onClick={() => update(product.id, -1)}
                    >
                      <Minus size={12} />
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={`Aumentar ${product.name}`}
                      title={`Aumentar ${product.name}`}
                      onClick={() => update(product.id, 1)}
                    >
                      <Plus size={12} />
                    </Button>
                  </div>
                  <strong>{money(subtotal)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="order-footer">
          <div className="order-total">
            <span>Total do pedido</span>
            <strong>{money(cartTotal(cart, allProducts))}</strong>
          </div>
          <p className="order-note">
            {count === 0 ? "Só falta escolher seus favoritos." : "Confira os itens antes de confirmar."}
          </p>
          {error && (
            <p className="empty-error" role="alert">
              Não foi possível finalizar seu pedido. Seu carrinho está vazio. Adicione pelo menos um
              produto antes de continuar.
            </p>
          )}
          <Button onClick={checkout} className="checkout-button">
            Finalizar pedido <ArrowRight size={16} />
          </Button>
          <p className="simulation-note">
            <ShieldCheck size={11} /> Pedido demonstrativo · sem cobrança
          </p>
        </div>
      </div>
    );
  }
  function Summary({ summary }: { summary: Cart }) {
    return (
      <>
        <div className="confirmation-items">
          {cartItems(summary, allProducts).map(({ product, quantity, subtotal }) => (
            <div className="confirmation-item" key={product.id}>
              <span>
                <strong>
                  {quantity} × {product.name}
                </strong>
                <small>{money(product.price)} por unidade</small>
              </span>
              <strong>{money(subtotal)}</strong>
            </div>
          ))}
        </div>
        <div className="order-total mt-3">
          <span>Total do pedido</span>
          <strong>{money(cartTotal(summary, allProducts))}</strong>
        </div>
      </>
    );
  }
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="wordmark">
            <div className="logo-symbol">
              <Burger size={29} strokeWidth={1.6} />
            </div>
            <div className="wordmark-name">
              brasa<span className="wordmark-sub">Burger artesanal</span>
            </div>
          </div>
          <div className="header-details">
            <span className="location-label flex items-center gap-1.5">
              <MapPin size={14} /> Feito aqui. Feito com carinho.
            </span>
            <span className="open-status">
              <span className="status-dot" /> Aberto agora
            </span>
            <Button
              variant="outline"
              className="header-cart"
              onClick={openCart}
              aria-label={`Abrir carrinho com ${count} itens`}
            >
              <ShoppingBag />
              <span className="hidden sm:inline">Meu pedido</span>
              <span className="cart-badge">{count}</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="page-container">
        <section className="cover">
          <img
            className="cover-img"
            src={cover.url}
            alt="Hambúrguer artesanal com cheddar, bacon e batatas fritas"
          />
          <div className="cover-copy">
            <div className="cover-eyebrow">
              <Flame size={13} /> Na brasa, do nosso jeito
            </div>
            <h1>Brasa Burger</h1>
            <p>
              Ingredientes de verdade, sabor sem atalhos.
              <br />
              Escolha o seu e deixe o resto com a gente.
            </p>
            <div className="cover-note">
              <Heart size={12} /> Feito na hora, com muito sabor.
            </div>
          </div>
        </section>
        <div className="menu-layout">
          <section>
            <div className="menu-heading">
              <div>
                <h2>
                  Nosso cardápio<span className="text-primary">.</span>
                </h2>
                <p>Bateu a fome? Você está no lugar certo.</p>
              </div>
              <label className="search-box">
                <Search size={17} />
                <input
                  aria-label="Buscar no cardápio"
                  placeholder="O que você está com vontade?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    aria-label="Limpar pesquisa"
                    title="Limpar pesquisa"
                    onClick={() => setSearch("")}
                  >
                    <X />
                  </Button>
                )}
              </label>
            </div>
            <div className="categories" aria-label="Categorias">
              <Button
                variant="ghost"
                className={`category-button ${categoryId === null ? "active" : ""}`}
                aria-pressed={categoryId === null}
                onClick={() => setCategoryId(null)}
              >
                <LayoutGrid size={15} />
                Todos
              </Button>
              {(categoriesQuery.data ?? []).map((category) => {
                const Icon = categoryIcons[category.id] ?? Utensils;
                return (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`category-button ${categoryId === category.id ? "active" : ""}`}
                  aria-pressed={categoryId === category.id}
                  onClick={() => setCategoryId(category.id)}
                >
                  <Icon size={15} />
                  {category.name}
                </Button>
                );
              })}
            </div>
            {categoriesQuery.isError && (
              <p className="empty-error" role="alert">
                Não foi possível carregar as categorias: {categoriesQuery.error.message}{" "}
                <Button variant="ghost" onClick={() => void categoriesQuery.refetch()}>
                  Tentar novamente
                </Button>
              </p>
            )}
            <div className="product-count">
              <span>{visible.length} opções para matar sua fome</span>
            </div>
            <div className="product-grid">
              {!hasProductError &&
                visible.map((product: Product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img
                      src={photos[product.id] ?? product.imageUrl ?? cover.url}
                      alt={product.name}
                      loading="lazy"
                    />
                    {product.tag && (
                      <span className="product-tag">
                        <Flame size={10} className="text-primary" />
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category.name}</span>
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">{money(product.price)}</div>
                    <Button
                      variant="secondary"
                      className="add-button"
                      onClick={() => update(product.id, 1)}
                      aria-label={`Adicionar ${product.name} ao pedido`}
                    >
                      <Plus size={14} />
                      Adicionar
                      {(cart[product.id] ?? 0) > 0 && <span>({cart[product.id]})</span>}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
            {isProductsLoading && (
              <div className="no-results">
                <h3>Carregando produtos...</h3>
              </div>
            )}
            {hasProductError && (
              <div className="no-results" role="alert">
                <h3>Não foi possível carregar o cardápio</h3>
                <p className="mt-2 text-sm">{productLoadError?.message}</p>
                <Button className="mt-4" variant="outline" onClick={retryProducts}>
                  Tentar novamente
                </Button>
              </div>
            )}
            {!isProductsLoading && !hasProductError && visible.length === 0 && (
              <div className="no-results">
                <Search className="mx-auto mb-3" />
                <h3>Nenhum produto encontrado</h3>
                <p className="mt-2 text-sm">Tente outro nome ou categoria.</p>
              </div>
            )}
          </section>
          <aside className="desktop-order">
            <OrderPanel />
            <div className="order-tip">
              <Sparkles size={19} className="shrink-0 text-success" />
              <div>
                <strong>A combinação perfeita existe.</strong>Um burger, uma porção e sua bebida
                favorita. Vai por nós.
              </div>
            </div>
          </aside>
        </div>
        <footer className="footer">
          <span className="footer-brand">
            brasa<span className="text-primary">.</span>
          </span>
          <span>Feito com carinho. Servido com sabor.</span>
          <span>Cardápio demonstrativo · Pedidos não são enviados</span>
        </footer>
      </main>
      <div className="mobile-cart-bar">
        <Button className="mobile-cart-button" onClick={() => setMobileCart(true)}>
          <span className="flex items-center gap-2">
            <ShoppingBag size={17} />
            Ver meu pedido ({count})
          </span>
          <span>
            {money(cartTotal(cart, allProducts))} <ArrowRight className="ml-2 inline" />
          </span>
        </Button>
      </div>
      <Dialog open={mobileCart} onOpenChange={setMobileCart}>
        <DialogContent className="max-h-[90dvh] overflow-auto p-4">
          <DialogTitle className="sr-only">Seu pedido</DialogTitle>
          <DialogDescription className="sr-only">
            Confira os produtos e quantidades do seu pedido.
          </DialogDescription>
          <OrderPanel />
          <Button variant="ghost" onClick={() => setMobileCart(false)}>
            <ArrowLeft />
            Continuar comprando
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={confirming} onOpenChange={setConfirming}>
        <DialogContent>
          <DialogTitle>Confirmar seu pedido?</DialogTitle>
          <DialogDescription>
            Confira seus favoritos antes de confirmar. Este pedido é uma simulação, sem cobrança ou
            envio.
          </DialogDescription>
          <Summary summary={cart} />
          <Button className="h-11" onClick={confirm}>
            <Check />
            Confirmar pedido
          </Button>
          <Button variant="ghost" onClick={() => setConfirming(false)}>
            <ArrowLeft />
            Continuar comprando
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={order !== null}
        onOpenChange={(open) => {
          if (!open) setOrder(null);
        }}
      >
        <DialogContent>
          <div className="success-icon">
            <CircleCheck size={34} />
          </div>
          <DialogTitle className="text-center text-2xl">Pedido realizado com sucesso!</DialogTitle>
          <DialogDescription className="text-center">
            Uma ótima escolha! Confira o resumo do seu pedido simulado.
          </DialogDescription>
          {order && <Summary summary={order} />}
          <p className="text-center text-xs text-muted-foreground">
            Nenhum pedido foi enviado e não há cobrança.
          </p>
          <Button onClick={() => setOrder(null)} className="h-11">
            <ArrowLeft />
            Voltar ao cardápio
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
