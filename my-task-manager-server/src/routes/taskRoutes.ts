import { Router } from 'express';
import { getTasks, getTaskById, addTask } from '../controllers/taskController';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router: Router = Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  validateRequest,
  addTask
);

export default router;
