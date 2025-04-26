import 'dotenv/config';
import express, { json } from 'express';

import routes from './routes/index.js';

import LoggerMiddleware from './middleware/logger.js';
import ErrorHandler from './middleware/errorHandler.js';
import {authenticateToken} from './middleware/auth.js';

import cors from 'cors';

const corsOptions = {
    origin: '*', // Permitir todas las solicitudes de cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'body'], // Encabezados permitidos
};


const app = express();
app.use(json()); // Middleware para parsear JSON

app.use(cors(corsOptions));

app.use(LoggerMiddleware);

// Ruta protegida ejemplo
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
