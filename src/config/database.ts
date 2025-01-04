import { Sequelize } from 'sequelize-typescript'

import config from './config'
import logger from '../util/logger'

const sequelize = new Sequelize({
    dialect: config.database.development.dialect,
    host: config.database.development.host,
    username: config.database.development.username, // your PostgreSQL username
    password: config.database.development.password, // your PostgreSQL password
    database: config.database.development.database, // your database name
    port: Number(config.database.development.port) // add the port here
})

const createDatabase = async () => {
    try {
        logger.info('Connected to PostgreSQL server')

        // Check if the database exists
        // const [results] = await sequelize.query(`
        //     SELECT 1 FROM pg_database WHERE datname = '${config.database.development.database}'
        // `)

        // If the database doesn't exist, create it
        // if (results.length === 0) {
        //     await sequelize.query(`CREATE DATABASE "${config.database.development.database}"`)
        //     logger.info('Database created successfully')
        // }

    } catch (error) {
        logger.error('Unable to connect or create database:', error)
    }
}

createDatabase()

export default sequelize
