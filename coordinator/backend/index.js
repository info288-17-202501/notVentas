import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import nodeRoutes from './routes/nodeRoutes.js';
import logger from './middlewares/logger.js';


config();
connectDB();

const app = express();

app.use(logger);
app.use(cors());
app.use(json());

app.use('/api', nodeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Coordinador corriendo en puerto ${PORT}`);
});
