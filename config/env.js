import dotenv from "dotenv";
dotenv.config();
import {z} from 'zod';

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string()
  })
  .parse(process.env);
 