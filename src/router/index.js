import { HealthRouter } from './HealthRouter.js';
import { MetricsRouter } from './MetricsRouter.js';
import { UserRouter } from './UserRouter.js';

export function mountRouter(main) {
    HealthRouter(main);
    UserRouter(main);
    MetricsRouter(main);
}