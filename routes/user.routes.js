import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/user.controller.js';
import { newUserValidator } from '../validator/user.validator.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/register', newUserValidator, registerUser);
router.post('/login', loginUser);
router.get('/getAllUsers', isAdmin, getAllUsers)

export default router;