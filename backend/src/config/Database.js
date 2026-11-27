import { Sequelize } from 'sequelize'

function required(name) {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

class Database {
    constructor() {
        this.db = new Sequelize({
            dialect: 'postgres',
            database: required('DB_NAME'),
            username: required('DB_USER'),
            password: required('DB_PASSWORD'),
            host: required('DB_HOST'),
            port: Number(process.env.DB_PORT || 5432),
            logging: false,
            dialectOptions: process.env.DB_SSL === 'true'
                ? { ssl: { require: true, rejectUnauthorized: true } }
                : {}
        })
    }
}

export default new Database()
