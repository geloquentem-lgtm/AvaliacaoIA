Prompt para Lovable — MVP de Cardápio Digital Interativo
1. Objetivo

Desenvolver um MVP de cardápio digital interativo, com interface moderna, intuitiva e responsiva, permitindo que os clientes visualizem produtos disponíveis, filtrem por categorias, selecionem itens, montem seus pedidos em um carrinho de compras e finalizem o pedido.

O projeto deve contemplar exclusivamente o front-end, utilizando dados fictícios e locais para simular o funcionamento completo da aplicação.

O sistema deve proporcionar uma experiência simples e agradável, semelhante à de um cardápio digital de restaurante ou lanchonete.

2. Páginas
2.1. Página inicial — Cardápio

Criar uma página principal contendo:

Nome fictício do estabelecimento.
Logotipo ou identidade visual.
Título de apresentação, como "Nosso Cardápio".
Campo de pesquisa de produtos.
Lista de categorias disponíveis.
Catálogo de produtos organizado visualmente.
Ícone de carrinho de compras com indicador da quantidade de itens selecionados.
2.2. Catálogo de produtos

Criar um catálogo com pelo menos 6 produtos fictícios.

Cada produto deverá apresentar:

Imagem ilustrativa.
Nome do produto.
Descrição.
Preço em reais (R$).
Categoria.
Botão "Adicionar ao pedido".

Utilizar, no mínimo, as seguintes categorias:

Hambúrgueres.
Bebidas.
Porções.

Exemplo de produtos fictícios:

Produto	Descrição	Categoria	Preço
Classic Burger	Hambúrguer artesanal com queijo e salada.	Hambúrgueres	R$ 25,90
Bacon Burger	Hambúrguer com bacon crocante e cheddar.	Hambúrgueres	R$ 29,90
Chicken Burger	Hambúrguer de frango empanado.	Hambúrgueres	R$ 24,90
Batata Frita	Porção de batatas fritas crocantes.	Porções	R$ 15,00
Onion Rings	Porção de anéis de cebola empanados.	Porções	R$ 18,00
Refrigerante	Refrigerante em lata de 350 ml.	Bebidas	R$ 7,00
Suco Natural	Suco natural de laranja.	Bebidas	R$ 9,00
2.3. Carrinho de compras

Criar uma área ou painel de carrinho que permita:

Consultar todos os produtos selecionados.
Visualizar nome, preço unitário e quantidade de cada produto.
Aumentar a quantidade de um produto.
Diminuir a quantidade de um produto.
Remover um produto individualmente.
Visualizar o subtotal de cada item.
Visualizar o valor total do pedido.
Continuar comprando e retornar ao catálogo.
Finalizar o pedido.
2.4. Tela de confirmação do pedido

Após a confirmação, apresentar uma tela ou modal com:

Mensagem de sucesso: "Pedido realizado com sucesso!"
Resumo dos produtos selecionados.
Quantidade de cada produto.
Preço unitário.
Subtotal de cada produto.
Valor total do pedido.
Botão "Voltar ao cardápio" para iniciar um novo pedido.
3. Comportamentos
3.1. Produtos disponíveis
Exibir todos os produtos cadastrados no catálogo fictício.
Cada produto deve possuir informações próprias.
Permitir selecionar produtos individualmente.
Atualizar o carrinho automaticamente após a seleção.
3.2. Filtro por categorias
Permitir filtrar produtos por categoria.
Disponibilizar uma opção "Todos" para visualizar o catálogo completo.
Atualizar os produtos exibidos conforme a categoria selecionada.
Permitir utilizar a pesquisa de produtos em conjunto com os filtros.
3.3. Seleção de produtos
Ao clicar em "Adicionar ao pedido", adicionar o produto ao carrinho.
Caso o produto já esteja no carrinho, incrementar sua quantidade.
Atualizar automaticamente a quantidade de itens indicada no ícone do carrinho.
3.4. Gerenciamento do carrinho

Implementar as funcionalidades:

Adicionar produtos.
Aumentar quantidades.
Diminuir quantidades.
Remover produtos.
Consultar produtos selecionados.

Quando a quantidade de um produto chegar a zero, removê-lo automaticamente do carrinho.

3.5. Cálculo automático

Implementar cálculos automáticos utilizando os preços e as quantidades dos produtos.

Fórmulas:

Subtotal do item:

Subtotal = Preço unitário × Quantidade.

Valor total:

Total = Soma dos subtotais de todos os produtos.

Os valores devem ser atualizados imediatamente sempre que houver alteração na quantidade ou remoção de algum produto.

Formatar todos os valores monetários no padrão brasileiro (R$ 0,00).

3.6. Finalização do pedido
Ao clicar em "Finalizar pedido", verificar se o carrinho possui pelo menos um produto.
Se estiver preenchido, permitir a confirmação do pedido.
Após a confirmação, exibir a mensagem de sucesso e o resumo completo do pedido.
Limpar o carrinho após a confirmação.
Permitir iniciar um novo pedido.

Tratamento de carrinho vazio:

Caso o usuário tente finalizar um pedido sem produtos selecionados, apresentar uma mensagem de erro clara e compreensível:

"Não foi possível finalizar seu pedido. Seu carrinho está vazio. Adicione pelo menos um produto antes de continuar."

Não permitir a confirmação enquanto o carrinho estiver vazio.

3.7. Responsividade

A aplicação deverá funcionar corretamente em:

Computadores (desktop).
Notebooks.
Tablets.
Smartphones.

Adaptar automaticamente os elementos da interface conforme o tamanho da tela.

Em dispositivos móveis, priorizar:

Produtos em cards organizados em uma ou duas colunas.
Botões de fácil interação.
Carrinho acessível e intuitivo.
Textos legíveis.
Navegação simples e confortável.
4. Limites

O desenvolvimento deverá respeitar as seguintes restrições:

Desenvolver somente o front-end.
Não implementar autenticação ou cadastro de usuários.
Não implementar integração com banco de dados.
Não implementar pagamento real.
Não integrar gateways de pagamento.
Não implementar sistemas administrativos ou painéis de gerenciamento.
Não implementar integração com serviços externos.
Utilizar produtos, preços, categorias e imagens fictícias.
Utilizar dados locais e estado da aplicação para simular as operações.
Não exigir informações pessoais do cliente para finalizar o pedido.

A finalização do pedido deverá ser apenas uma simulação visual e funcional no front-end, sem envio real para restaurantes ou estabelecimentos.

5. Critérios de aceitação visual

5.1. Identidade visual
Interface moderna e profissional.
Aparência de cardápio digital de restaurante.
Design limpo e organizado.
Paleta de cores harmoniosa.
Tipografia legível.
Boa hierarquia visual.
Ícones intuitivos.
5.2. Produtos
Exibir os produtos em cards individuais.
Utilizar imagens ilustrativas.
Destacar os preços.
Apresentar descrições objetivas.
Disponibilizar botões de adicionar facilmente identificáveis.
5.3. Categorias
Apresentar categorias em botões ou abas.
Destacar visualmente a categoria selecionada.
Garantir que os filtros funcionem corretamente.
5.4. Carrinho
Apresentar os produtos de maneira organizada.
Facilitar a alteração das quantidades.
Destacar subtotais e valor total.
Utilizar botões claros para adicionar, diminuir e remover produtos.
Indicar visualmente quando o carrinho estiver vazio.
5.5. Confirmação
Exibir mensagem de sucesso em destaque.
Apresentar resumo organizado dos produtos.
Destacar o valor total.
Utilizar feedback visual para sucesso e erro.
5.6. Experiência do usuário
Navegação simples e intuitiva.
Layout responsivo.
Boa distribuição dos elementos.
Botões com tamanhos adequados.
Não apresentar barras de rolagem horizontais.
Manter consistência visual entre as páginas.
Garantir funcionamento em diferentes resoluções.
5.7. Critérios funcionais para aprovação do MVP
O projeto será considerado concluído quando:

O catálogo apresentar pelo menos 6 produtos fictícios.
Cada produto possuir nome, preço, descrição e categoria.
Existirem pelo menos 2 categorias funcionais.
O usuário conseguir filtrar os produtos.
O usuário conseguir selecionar produtos.
O usuário conseguir montar um pedido.
O carrinho permitir adicionar, diminuir, remover e consultar produtos.
Os subtotais forem calculados corretamente.
O valor total for atualizado automaticamente.
O usuário conseguir confirmar o pedido.
A confirmação apresentar o resumo completo do pedido.
O carrinho vazio impedir a finalização e apresentar mensagem de erro.
A aplicação funcionar em computadores e dispositivos móveis.
INSTRUÇÃO FINAL:

Desenvolva a aplicação completa, não apenas um protótipo de telas estáticas.

Todos os botões, filtros, seleções, cálculos e operações do carrinho deverão funcionar.

Utilize React, TypeScript e Tailwind CSS, com componentes reutilizáveis e gerenciamento de estado local.

Priorize a experiência do usuário, a organização do código e a responsividade.

Respeite os limites estabelecidos e não implemente funcionalidades que dependam de back-end, autenticação ou pagamento.

O resultado deverá ser um MVP de cardápio digital interativo, funcional e pronto para demonstração e testes de navegação.
