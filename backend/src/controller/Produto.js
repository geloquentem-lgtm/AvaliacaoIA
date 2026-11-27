import ApiError from '../utils/ApiError.js'
import ServicoProduto from '../service/Produto.js'

const allowedQueryKeys = new Set(['categoryId', 'search'])

function readFilters(query) {
    const invalidKey = Object.keys(query).some((key) => !allowedQueryKeys.has(key))
    const invalidValue = ['categoryId', 'search'].some((key) => {
        const value = query[key]
        return value !== undefined && typeof value !== 'string'
    })
    const invalidCategory = typeof query.categoryId === 'string' && !query.categoryId.trim()

    if (invalidKey || invalidValue || invalidCategory) {
        throw new ApiError(400, 'INVALID_QUERY', 'Parâmetro de consulta inválido ou malformado.')
    }

    return {
        categoryId: query.categoryId ?? '',
        search: query.search ?? ''
    }
}

class ControllerProduto {
    async Buscar(req, res) {
        const filters = readFilters(req.query)
        const products = await ServicoProduto.Buscar(filters)
        res.json(products)
    }

    async BuscarUm(req, res) {
        const product = await ServicoProduto.BuscarUm(req.params.id)
        res.json(product)
    }
}

export default new ControllerProduto()
