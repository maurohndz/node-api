import { ControlleCore } from '../shared/core/ControlleCore.js'

/**
 * API health status and statistics
 */
class HealthController extends ControlleCore {
    constructor() {
        super();
    }

    /**
     * API health status
     */
    status = this.mount(async (_req) => {
        return {
            payload: true,
        }
    });
}

export default HealthController;
