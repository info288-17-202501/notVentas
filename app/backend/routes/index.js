import express from 'express';
import userRoutes from './users.js';
import productRoutes from './products.js';
import categoryRoutes from './categories.js';
import colorRoutes from './colors.js';
import companyRoutes from './company.js';
import authRoutes from './auth.js';
import storeRoutes from './store.js';
import saleRoutes from './sales.js';
import { authenticateToken } from '../middleware/auth.js';

const routes = express.Router();

// Rutas públicas
routes.use('/auth', authRoutes);

// Rutas protegidas
routes.use('/store', storeRoutes); 
routes.use('/sale', saleRoutes);
routes.use('/user', authenticateToken, userRoutes);
routes.use('/product', authenticateToken, productRoutes);
routes.use('/company', authenticateToken, companyRoutes);
routes.use('/color', authenticateToken, colorRoutes);
routes.use('/category', authenticateToken, categoryRoutes);

export default routes;