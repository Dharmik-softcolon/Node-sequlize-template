import sequelize from './database'
import logger from '../util/logger'

export const startApp = async (): Promise<void> => {
    try {
        sequelize.sync({ force: false }) // Sync models with the database (this will drop the tables first)
        logger.info('Database connected and models synced.')
    } catch (error) {
        logger.error('Error connecting to the database:', error)
    }
}
