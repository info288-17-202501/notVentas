import express from 'express';
const routes = express.Router();

import userRoutes from './users.js';
import productRoutes from './products.js'
import categoryRoutes  from './categories.js';
import colorRoutes from './colors.js'
import companyRoutes from './company.js'
import authRoutes from './auth.js';

routes.use('/', colorRoutes)
routes.use('/', categoryRoutes);
routes.use('/', userRoutes);
routes.use('/', productRoutes);
routes.use('/', companyRoutes);
routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);

export default routes;