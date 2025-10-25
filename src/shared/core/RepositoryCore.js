import { ErrorCore } from './ErrorCore.js';

export class RepositoryCore {
    constructor(model) {
        this.model = model;
    }

    /**
     * Search for many records
     * @param {*} params
     * @param {*} params.where - Filtering conditions
     * @param {*} params.order - Order for results
     * @param {*} params.attributes - Attributes to consult
     * @param {*} params.include - Relationships
     */
    async findAll({ where, order, attributes, include } = {}) {
        return await this.model.findAll({
            ...(where && { where }),
            ...(order && { order }),
            ...(attributes && { attributes }),
            ...(include && { include })
        }).catch((error) => {
            throw new ErrorCore('server', {
                level: 'error',
                table: error.original.table,
                type: error.name,
                error_message: error.original.message
            });
        });
    }

    /**
     * Search one record
     * @param {*} params.where - Filtering conditions
     * @param {*} params.order - Order for results
     * @param {*} params.attributes - Attributes to consult
     * @param {*} params.include - Relationships
     */
    async findOne({ where, order, attributes, include } = {}) {
        return await this.model.findOne({
            ...(where && { where }),
            ...(order && { order }),
            ...(attributes && { attributes }),
            ...(include && { include })
        }).catch((error) => {
            throw new ErrorCore('server', {
                level: 'error',
                table: error.original.table,
                type: error.name,
                error_message: error.original.message
            });
        });
    }

    /**
     * Create a record
     * @param {*} params.validation - pre-action validation
     * @param {*} params.payload - data to insert
     * @param {*} params.fields - fields to return
     * @param {*} transaction  - Sequelize transaction
     */
    async create({ validation, payload, fields } = {}, transaction = null) {
        if (validation) {
            const exist = await this.findOne({ where: validation });
            if (exist) throw ERROR_DATA_PREV_EXIST;
        }

        return await this.model.create(payload, {
            transaction,
            ...(fields && { fields })
        }).catch((error) => {
            throw new ErrorCore('server', {
                level: 'error',
                table: error.original.table,
                type: error.name,
                error_message: error.original.message
            });
        });
    }

    /**
     * Update a record
     * @param {*} params.where - Filtering conditions
     * @param {*} params.validation - pre-action validation
     * @param {*} params.payload - data to update
     * @param {*} transaction  - Sequelize transaction
     */
    async update({ validation, where, payload } = {}, transaction = null) {
        if (!where) throw new ErrorCore('server');

        if (validation) {
            const exist = await this.findOne({ where: validation });
            if (exist) throw ERROR_DATA_PREV_EXIST;
        }

        return await this.model.update(payload, {
            transaction,
            where,
            returning: true
        }).catch((error) => {
            throw new ErrorCore('server', {
                level: 'error',
                table: error.original.table,
                type: error.name,
                error_message: error.original.message
            });
        });

    }

    /**
     * Delete a record
     * @param {*} params.where - Filtering conditions
     * @param {*} transaction  - Sequelize transaction
     */
    async delete({ where } = {}, transaction = null) {
        if (!where) throw new ErrorCore('server');

        return await this.model.destroy({
            transaction,
            where,
            returning: true
        }).catch((error) => {
            throw new ErrorCore('server', {
                level: 'error',
                table: error.original.table,
                type: error.name,
                error_message: error.original.message
            });
        });
    }
}