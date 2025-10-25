// External
import SequelizeAuto from "sequelize-auto";
// Own
import '../src/config/loadEnv.js';

const auto = new SequelizeAuto(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    directory: './src/database/models',
    port: process.env.DB_PORT,
    caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: 'p',
    singularize: true, // convert plural table names to singular model names
    lang: 'esm',
    additional: {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    },
});

auto.run().then(data => {
    console.log(data.tables);
    console.log(data.foreignKeys);
    console.log(data.indexes);
    console.log(data.hasTriggerTables);
    console.log(data.relations);
});