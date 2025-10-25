import { ControlleCore } from '../shared/core/ControlleCore.js'
import LotteryService from '../services/LotteryService.js';
import DataBase from '../database/connection.js';

/**
 * API health status and statistics
 */
class LotteryController extends ControlleCore {
    constructor() {
        super();

        this.service = new LotteryService();
    }

    /**
     * API health status
     */
    lottery = this.mount(async (req) => {
        const transaction = await DataBase.transaction()

        try {
            const response = await this.service.run(transaction, req.body);

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

export default LotteryController;
