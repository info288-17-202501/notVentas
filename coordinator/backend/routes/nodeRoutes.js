import { Router } from 'express';
import companyRoutes from './companyRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use('/company', companyRoutes);
router.use('/auth', authRoutes);

export default router;
