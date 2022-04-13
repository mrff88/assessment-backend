import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// config dotenv environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

console.log('hello world');
