import { Router } from 'express';
import companyRoutes from './companyRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/company', companyRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes)

export default router;
