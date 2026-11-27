# Contrato da API — Brasa Burger

## 1. Objetivo e escopo

Este contrato descreve a API de leitura do catálogo consumido pelo cardápio
digital. Ele reflete a interface atual: listagem de produtos, filtro por
categoria e busca por texto. O front-end não possui telas de administração,
autenticação ou envio de pedidos.

O carrinho, os cálculos de quantidade e preço, a confirmação e o resumo do
pedido permanecem exclusivamente no estado React. A finalização é uma
simulação: **não existe endpoint de pedidos neste escopo**, nem gravação,
pagamento ou transmissão de dados do cliente.

## 2. Convenções

- Base URL: `/api/v1`
- Transporte: HTTPS em produção.
- Formato: `application/json; charset=utf-8`.
- Nomes dos campos: `camelCase`.
- Valores monetários: inteiros em centavos de real (por exemplo, `2590`
  representa `R$ 25,90`); nunca usar ponto flutuante.
- A API não exige autenticação para os endpoints públicos descritos aqui.
- Listagens retornam todos os resultados, sem paginação, pois o front-end
  apresenta o catálogo completo.

## 3. Modelo de dados

### Categoria

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | string | sim | Identificador estável usado nos filtros. |
| `name` | string | sim | Nome exibido no cardápio. |

Categorias atuais: `Hambúrgueres`, `Porções` e `Bebidas`. A opção `Todos` é
um filtro da interface, não uma categoria armazenada.

### Produto

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | string | sim | Identificador estável do produto. |
| `name` | string | sim | Nome exibido no cardápio. |
| `description` | string | sim | Descrição exibida no card do produto. |
| `price` | integer | sim | Preço unitário em centavos de real. Deve ser maior que zero. |
| `category` | Categoria | sim | Categoria associada ao produto. |
| `imageUrl` | string (URI) ou null | sim | URL da imagem; pode ser `null` quando não houver imagem remota. |
| `tag` | string ou null | sim | Destaque opcional, como `O favorito` ou `Mais pedido`. |

O front-end atual resolve as imagens a partir de arquivos locais indexados pelo
`id` do produto. Para usar `imageUrl`, essa resolução deverá ser substituída ou
ter um fallback local.

## 4. Endpoints

### `GET /api/v1/categories`

Lista as categorias disponíveis para os filtros.

**Resposta `200 OK`**

```json
[
  { "id": "hamburgueres", "name": "Hambúrgueres" },
  { "id": "porcoes", "name": "Porções" },
  { "id": "bebidas", "name": "Bebidas" }
]
```

### `GET /api/v1/products`

Lista os produtos. Os filtros podem ser usados juntos.

| Parâmetro | Local | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `categoryId` | query | não | Filtra pelo identificador da categoria. |
| `search` | query | não | Busca sem distinção entre maiúsculas/minúsculas ou acentos no nome e na descrição. Espaços nas extremidades são ignorados. |

**Exemplos**

```http
GET /api/v1/products
GET /api/v1/products?categoryId=hamburgueres
GET /api/v1/products?search=bacon
GET /api/v1/products?categoryId=hamburgueres&search=bacon
```

**Resposta `200 OK`**

```json
[
  {
    "id": "classic",
    "name": "Classic Burger",
    "description": "Pão brioche, hambúrguer artesanal, queijo, alface, tomate e molho da casa.",
    "price": 2590,
    "category": { "id": "hamburgueres", "name": "Hambúrgueres" },
    "imageUrl": null,
    "tag": "O favorito"
  },
  {
    "id": "bacon",
    "name": "Bacon Burger",
    "description": "Hambúrguer artesanal, cheddar cremoso, bacon crocante e molho especial.",
    "price": 2990,
    "category": { "id": "hamburgueres", "name": "Hambúrgueres" },
    "imageUrl": null,
    "tag": "Mais pedido"
  }
]
```

Uma busca sem correspondências retorna `200 OK` com `[]`, permitindo à
interface exibir o estado “Nenhum produto encontrado”. Os sete produtos
definidos atualmente no front-end devem ser disponibilizados pela API com seus
preços em centavos.

### `GET /api/v1/products/{id}`

Busca os detalhes de um produto.

**Resposta `200 OK`**: objeto `Produto` conforme o modelo acima.

**Resposta `404 Not Found`**: produto inexistente.

## 5. Erros

Erros são retornados como JSON, com mensagem compreensível e código estável:

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Produto não encontrado."
  }
}
```

| HTTP | Código | Quando usar |
| --- | --- | --- |
| `400 Bad Request` | `INVALID_QUERY` | Parâmetro de consulta inválido ou malformado. |
| `404 Not Found` | `PRODUCT_NOT_FOUND` | O `id` solicitado em `GET /products/{id}` não existe. |
| `500 Internal Server Error` | `INTERNAL_ERROR` | Falha inesperada do servidor, sem expor detalhes internos. |

Para filtros válidos sem resultados, retornar lista vazia em vez de erro.

## 6. Pedidos e regras do carrinho

Não definir `POST /orders` nem operações de leitura, alteração ou remoção de
pedidos neste MVP. A interface confirma o pedido localmente e mostra seu
resumo; não deve persistir pedidos no servidor. A validação de carrinho vazio,
as quantidades, os subtotais e o total continuam sendo responsabilidade do
front-end.

## 7. Integração necessária no front-end

O front-end atual ainda usa o array estático de `src/lib/menu.ts`; não há
consumo HTTP do catálogo. Para implementar este contrato:

1. Carregar categorias de `GET /api/v1/categories`.
2. Carregar e filtrar produtos usando `GET /api/v1/products`, enviando
   `categoryId` e/ou `search` quando aplicável.
3. Adaptar o modelo local: hoje `category` é uma string, enquanto o contrato
   retorna `{ id, name }`; usar `category.name` para exibição e `category.id`
   para filtrar.
4. Continuar tratando `price` como centavos nas operações puras do carrinho e
   formatar o valor apenas na apresentação.
5. Tratar falhas de rede/servidor com mensagem visível, sem substituir
   silenciosamente o catálogo remoto por dados fictícios.
6. Manter carrinho e confirmação exclusivamente no estado React; não enviar
   pedidos à API.
