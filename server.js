import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// config dotenv environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

/**
 * Express
 */
import express from 'express';

const app = express();

// Port env conf
const PORT = process.env.PORT;

// launch server
app.listen(PORT, () => {
  console.log('- Initialized server -');
});
