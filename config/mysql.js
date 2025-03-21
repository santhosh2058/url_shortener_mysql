import mysql from 'mysql2/promise'
import {env} from './env.js'
export const db = await mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE
});