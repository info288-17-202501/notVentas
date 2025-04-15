import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express, { json } from 'express';

import routes from './routes/index.js';

import LoggerMiddleware from './middleware/logger.js';
import ErrorHandler from './middleware/errorHandler.js';
import authenticateToken from './middleware/auth.js';


const app = express();
app.use(json()); // Middleware para parsear JSON

app.use(LoggerMiddleware);

// Ruta protegida
app.get('/protected-route', authenticateToken, (req, res) =>{
    res.send('Esta es una ruta protegida');
});

// Usar todas las rutas definidas en /routes
app.use('/api', routes);

// Ruta de prueba de error
app.get('/error', (req, res, next) => {
    next(new Error('Error intencional'));
});

// Ruta base
app.get('/',(req, res) => {
    res.send(`
        <h1>Developing NotVentas API</h1>    
        <h3>Hola</h3>
    `);
});

// Manejo de errores al final
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
