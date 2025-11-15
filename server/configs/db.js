import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set!');
  throw new Error('DATABASE_URL is required but not found in environment variables');
}


const sql = neon(process.env.DATABASE_URL);

export default sql;