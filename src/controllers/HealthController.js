import { ControlleCore } from '../shared/core/ControlleCore.js'
import HealthService from '../services/HealthService.js';

/**
 * API health status and statistics
 */
class HealthController extends ControlleCore {
    constructor() {
        super();

        this.service = new HealthService();
    }

    /**
     * API health status
     */
    status = this.mount(async (_req) => {
        const response = await this.service.apiStatus();

        return {
            payload: response,
        }
    });
}

export default HealthController;
