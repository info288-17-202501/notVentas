// app.js
import 'dotenv/config';
import express, { json } from 'express';
import routes from './routes/index.js';
import LoggerMiddleware from './middleware/logger.js';
import ErrorHandler from './middleware/errorHandler.js';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    AccessControlAllowCredentials: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Body'],
};

const app = express();

app.use(json());
app.use(cors(corsOptions));
app.use(LoggerMiddleware);

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send(`
        <h1>Developing NotVentas API</h1>    
        <h3>Hola</h3>
    `);
});

app.use(ErrorHandler);

export default app; 
