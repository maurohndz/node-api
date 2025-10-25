import { ControlleCore } from '../shared/core/ControlleCore.js'
import UserService from '../services/UserService.js';
import DataBase from '../database/connection.js';

/**
 * API health status and statistics
 */
class UserController extends ControlleCore {
    constructor() {
        super();

        this.service = new UserService();
    }

    /**
     * API health status
     */
    create = this.mount(async (req) => {
        const transaction = await DataBase.transaction()
        try {
            const response = await this.service.create(transaction, req.body);

            await transaction.commit();

            return {
                payload: response,
            }
        } catch (error) {
            await transaction.rollback();

            throw error;
        }
    });
}

export default UserController;
