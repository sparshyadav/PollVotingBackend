import express from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createPoll,getPollById } from '../controllers/poll.controller.js';

const router = express.Router();

router.post('/', isAuthenticated, createPoll);
router.get('/:code', isAuthenticated, getPollById);

export default router;