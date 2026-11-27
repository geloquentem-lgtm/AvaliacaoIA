import Categoria from './Categoria.js'
import Produto from './Produto.js'

Categoria.hasMany(Produto, { foreignKey: 'categoryId', as: 'products' })
Produto.belongsTo(Categoria, { foreignKey: 'categoryId', as: 'category' })
