import { Router } from 'express';
import UserController from '../controllers/UserController.js';

export function UserRouter(main) {
    const router = Router();
    const controller = new UserController();

    router.post('/', controller.create);

    // Set up main route
    main.use('/api/user', router);
}
