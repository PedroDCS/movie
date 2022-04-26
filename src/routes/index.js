import { Router } from 'express';
import Movierouter from './MovieRouter.js';
import Sessionrouter from './SessionRouter.js';
import Ticketrouter from './TicketRouter.js';
import UserRouter from './UserRouter.js';

const router = Router();
router.use(Movierouter);
router.use(UserRouter);
router.use(Sessionrouter);
router.use(Ticketrouter);

export default router;
