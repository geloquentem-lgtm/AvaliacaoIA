import Categoria from '../model/Categoria.js'

class ServicoCategoria {
    async Buscar() {
        const categories = await Categoria.findAll({ order: [['displayOrder', 'ASC']] })
        return categories.map(({ id, name }) => ({ id, name }))
    }
}

export default new ServicoCategoria()
