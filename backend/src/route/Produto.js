import express from 'express'
import ControllerProduto from '../controller/Produto.js'

const router = express.Router()

router.get('/', ControllerProduto.Buscar)
router.get('/:id', ControllerProduto.BuscarUm)

export default router
