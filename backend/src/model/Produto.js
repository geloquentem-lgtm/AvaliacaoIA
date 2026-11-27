import Database from '../config/Database.js'

const Produto = Database.db.define('Produto', {
    id: {
        type: Database.db.Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Database.db.Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Database.db.Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Database.db.Sequelize.INTEGER,
        allowNull: false,
        validate: { min: 1 }
    },
    imageUrl: {
        type: Database.db.Sequelize.STRING,
        allowNull: true
    },
    tag: {
        type: Database.db.Sequelize.STRING,
        allowNull: true
    },
    categoryId: {
        type: Database.db.Sequelize.STRING,
        allowNull: false,
        references: { model: 'categories', key: 'id' }
    },
    displayOrder: {
        type: Database.db.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'products',
    timestamps: false
})

export default Produto
