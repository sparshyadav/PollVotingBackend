import express from 'express';
// import { isAdmin } from '../middlewares/isAdmin.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createPoll,getPollById, castVote, generatePollResult } from '../controllers/poll.controller.js';

const router = express.Router();

router.post('/', isAuthenticated, createPoll);
router.get('/:code', isAuthenticated, getPollById);
router.post('/vote/:code', isAuthenticated, castVote);
router.get('/generateResult/:code', isAuthenticated, generatePollResult);

export default router;