import express from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createPoll } from '../controllers/poll.controller.js';

const router = express.Router();

router.post('/', isAuthenticated, createPoll);
// router.post('/login', loginUser);
// router.get('/getAllUsers', isAdmin, getAllUsers)

export default router;