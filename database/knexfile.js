import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

const {
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const config = {
  client: 'mysql2',
  debug: true,
  connection: {
    database: DB_DATABASE,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
  },
  migrations: {
    directory: path.join(__dirname, 'migrations'),
    stub: './stub/migration.stub'
  },
};

export default config;