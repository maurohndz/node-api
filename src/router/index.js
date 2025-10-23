import { HealthRouter } from './HealthRouter.js';
import { MetricsRouter } from './MetricsRouter.js';

export function mountRouter(main) {
    HealthRouter(main);
    MetricsRouter(main);
}