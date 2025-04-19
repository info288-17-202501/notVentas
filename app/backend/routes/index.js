import express from 'express';
import userRoutes from './users.js';
import productRoutes from './products.js'
import categoryRoutes  from './categories.js';
import colorRoutes from './colors.js'
import companyRoutes from './company.js'
const routes = express.Router();

routes.use('/', colorRoutes)
routes.use('/', categoryRoutes);
routes.use('/', userRoutes);
routes.use('/', productRoutes);
routes.use('/', companyRoutes);


export default routes;