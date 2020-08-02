import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 5000,
  SERVER: process.env.SERVER || '127.0.0.1',
  DATABASE: process.env.DATABASE || 'nova-db',
  USER: process.env.USER || 'sa',
  PASSWORD: process.env.PASSWORD || '1234'
}