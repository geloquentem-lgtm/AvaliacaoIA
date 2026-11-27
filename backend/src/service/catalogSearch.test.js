import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { filterProducts } from './catalogSearch.js'

const products = [
    { id: 'classic', categoryId: 'hamburgueres', name: 'Clássico', description: 'Queijo da casa' },
    { id: 'soda', categoryId: 'bebidas', name: 'Refrigerante', description: 'Bebida gelada' }
]

describe('filtros do catálogo', () => {
    it('combina categoria e busca sem diferenciar caixa ou acentos', () => {
        assert.deepEqual(
            filterProducts(products, { categoryId: 'hamburgueres', search: '  CLASSICO ' })
                .map((product) => product.id),
            ['classic']
        )
    })

    it('retorna lista vazia quando não há correspondências', () => {
        assert.deepEqual(
            filterProducts(products, { categoryId: 'porcoes', search: 'batata' }),
            []
        )
    })
})
