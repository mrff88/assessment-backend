import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { userRouter, authRouter } from './api/routes/index.js';

// config dotenv environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

/**
 * Mongoose
 */

// Connect to db
const dbConnection = process.env.DB_STRING_CONNECTION;
await mongoose.connect(dbConnection);

// Listen to connection errors
mongoose.connection.on('error', function (e) {
  console.error('ERROR: ', e);
});

/**
 * Express
 */
const app = express();

// Middlewares
app.use(express.json());

// routes
app.use('/api', userRouter);
app.use('/auth', authRouter);

// Port env conf
const PORT = process.env.PORT;

// launch server
app.listen(PORT, () => {
  console.log('- Initialized server -');
});
