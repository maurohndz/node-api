import { Router } from 'express';
import LotteryController from '../controllers/LotteryController.js';

export function LotteryRouter(main) {
    const router = Router();
    const controller = new LotteryController();

    router.post('/', controller.lottery);

    // Set up main route
    main.use('/api/lottery', router);
}
