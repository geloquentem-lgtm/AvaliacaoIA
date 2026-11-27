import express from 'express'
import ControllerCategoria from '../controller/Categoria.js'

const router = express.Router()

router.get('/', ControllerCategoria.Buscar)

export default router
