import { Sequelize } from 'sequelize';
import initModels from './models/init-models.js';

/**
 * Connection to the db
 */
const DataBase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        useUTC: false,
    },
    timezone: '-04:00',
});

export const models = initModels(DataBase);

export default DataBase;