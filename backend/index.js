import express from 'express'
import categories from './src/route/Categoria.js'
import products from './src/route/Produto.js'
import Database from './src/config/Database.js'
import './src/model/associations.js'
import seedCatalog from './src/service/seedCatalog.js'
import ApiError from './src/utils/ApiError.js'

const app = express()
app.use(express.json())

const allowedOrigins = (process.env.FRONTEND_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
app.use((req, res, next) => {
    res.vary('Origin')
    const origin = req.get('Origin')
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    }
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }
    next()
})

app.use('/api/v1/categories', categories)
app.use('/api/v1/products', products)

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            error: { code: err.code, message: err.message }
        })
    }
    console.error(err)
    return res.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'Ocorreu um erro interno. Tente novamente mais tarde.'
        }
    })
})

const port = Number(process.env.PORT || 3000)

try {
    await Database.db.authenticate()
    await Database.db.sync({ force: false })
    await seedCatalog()
    app.listen(port, () => {
        console.log(`API disponível na porta ${port}`)
    })
} catch (error) {
    console.error('Não foi possível iniciar a API:', error)
    process.exitCode = 1
}