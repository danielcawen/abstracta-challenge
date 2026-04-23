import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// determine the current environment. Default to 'local' if not specified.
const env = process.env.NODE_ENV || 'local';

// load the environment file from the config directory
const envPath = path.resolve(__dirname, `../../config/.env.${env}`);
dotenv.config({ path: envPath });
