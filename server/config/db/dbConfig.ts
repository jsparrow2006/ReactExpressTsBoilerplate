import { Dialect, Sequelize } from 'sequelize'
import env from 'dotenv';
import path from 'path';
env.config()

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    // storage: dbDriver === 'sqlite' ? `${path.join(__dirname, '../..', 'db/').replace('dist/', '')}/db.sqlite` : null,
    storage: dbDriver === 'sqlite' ? `${path.join(__dirname, '../..', 'db/')}/db.sqlite` : null,
    logging: (sql, timing) => {
        console.log(`${sql}`)
    }
})

export default sequelizeConnection