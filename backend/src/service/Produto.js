import Categoria from '../model/Categoria.js'
import Produto from '../model/Produto.js'
import ApiError from '../utils/ApiError.js'
import { filterProducts } from './catalogSearch.js'

const categoryInclude = {
    model: Categoria,
    as: 'category',
    attributes: ['id', 'name'],
    required: true
}

function toResponse(product) {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: {
            id: product.category.id,
            name: product.category.name
        },
        imageUrl: product.imageUrl,
        tag: product.tag
    }
}

class ServicoProduto {
    async Buscar({ categoryId = '', search = '' } = {}) {
        const products = await Produto.findAll({
            include: [categoryInclude],
            order: [['displayOrder', 'ASC']]
        })
        const response = products.map(toResponse)
        return filterProducts(
            response.map((product) => ({
                ...product,
                categoryId: product.category.id
            })),
            { categoryId, search }
        ).map(({ categoryId: _categoryId, ...product }) => product)
    }

    async BuscarUm(id) {
        if (!id) {
            throw new ApiError(404, 'PRODUCT_NOT_FOUND', 'Produto não encontrado.')
        }
        const product = await Produto.findByPk(id, { include: [categoryInclude] })
        if (!product) {
            throw new ApiError(404, 'PRODUCT_NOT_FOUND', 'Produto não encontrado.')
        }
        return toResponse(product)
    }
}

export default new ServicoProduto()
