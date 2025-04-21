import express from 'express';
import { loginUserController } from '../controllers/user.function.js';

const router = express.Router();

router.post('/login', loginUserController);

export default router;