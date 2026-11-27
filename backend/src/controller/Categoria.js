import ServicoCategoria from '../service/Categoria.js'

class ControllerCategoria {
    async Buscar(req, res) {
        const categories = await ServicoCategoria.Buscar()
        res.json(categories)
    }
}

export default new ControllerCategoria()
