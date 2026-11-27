import Database from '../config/Database.js'

const Categoria = Database.db.define('Categoria', {
    id: {
        type: Database.db.Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Database.db.Sequelize.STRING,
        allowNull: false
    },
    displayOrder: {
        type: Database.db.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'categories',
    timestamps: false
})

export default Categoria
