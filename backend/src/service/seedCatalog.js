import Categoria from '../model/Categoria.js'
import Produto from '../model/Produto.js'

const categories = [
    { id: 'hamburgueres', name: 'Hambúrgueres', displayOrder: 1 },
    { id: 'porcoes', name: 'Porções', displayOrder: 2 },
    { id: 'bebidas', name: 'Bebidas', displayOrder: 3 }
]

const products = [
    {
        id: 'classic',
        name: 'Classic Burger',
        description: 'Pão brioche, hambúrguer artesanal, queijo, alface, tomate e molho da casa.',
        price: 2590,
        categoryId: 'hamburgueres',
        imageUrl: null,
        tag: 'O favorito',
        displayOrder: 1
    },
    {
        id: 'bacon',
        name: 'Bacon Burger',
        description: 'Hambúrguer artesanal, cheddar cremoso, bacon crocante e molho especial.',
        price: 2990,
        categoryId: 'hamburgueres',
        imageUrl: null,
        tag: 'Mais pedido',
        displayOrder: 2
    },
    {
        id: 'chicken',
        name: 'Chicken Burger',
        description: 'Frango empanado crocante, alface fresquinha e maionese da casa.',
        price: 2490,
        categoryId: 'hamburgueres',
        imageUrl: null,
        tag: null,
        displayOrder: 3
    },
    {
        id: 'fries',
        name: 'Batata Frita',
        description: 'Douradas por fora, macias por dentro. Uma porção feita para compartilhar.',
        price: 1500,
        categoryId: 'porcoes',
        imageUrl: null,
        tag: null,
        displayOrder: 4
    },
    {
        id: 'onion',
        name: 'Onion Rings',
        description: 'Anéis de cebola empanados e crocantes, acompanhados de molho da casa.',
        price: 1800,
        categoryId: 'porcoes',
        imageUrl: null,
        tag: null,
        displayOrder: 5
    },
    {
        id: 'soda',
        name: 'Refrigerante',
        description: 'Refrigerante em lata de 350 ml, servido bem gelado.',
        price: 700,
        categoryId: 'bebidas',
        imageUrl: null,
        tag: null,
        displayOrder: 6
    },
    {
        id: 'juice',
        name: 'Suco Natural',
        description: 'Suco de laranja natural, fresquinho e preparado na hora.',
        price: 900,
        categoryId: 'bebidas',
        imageUrl: null,
        tag: null,
        displayOrder: 7
    }
]

export default async function seedCatalog() {
    for (const category of categories) {
        await Categoria.findOrCreate({ where: { id: category.id }, defaults: category })
    }
    for (const product of products) {
        await Produto.findOrCreate({ where: { id: product.id }, defaults: product })
    }
}
