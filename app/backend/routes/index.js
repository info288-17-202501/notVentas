import express from 'express';
import userRoutes from './users.js';
import productRoutes from './products.js'
import categoryRoutes  from './category.js';

const routes = express.Router();

routes.use('/', categoryRoutes);
routes.use('/', userRoutes);
routes.use('/', productRoutes);


export default routes;