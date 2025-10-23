import { Router } from 'express';
import HealthController from '../controllers/HealthController.js';

export function HealthRouter(main) {
    const router = Router();
    const controller = new HealthController();

    // Find stores
    router.get('/', controller.status);

    // Set up main route
    main.use('/health', router);
}
