import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/v1', routes());

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Started at PORT: ${PORT}`);
})