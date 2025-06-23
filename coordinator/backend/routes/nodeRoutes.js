import { Router } from 'express';
import companyRoutes from './companyRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import storeRoutes from './storeRoutes.js';

const router = Router();

router.use('/company', companyRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes)
router.use('/store', storeRoutes);

export default router;
