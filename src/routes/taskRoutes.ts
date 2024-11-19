import express from 'express';
import taskController from '../controllers/taskController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, taskController.addTask);
router.get('/', authMiddleware, taskController.getTasks);

export default router;