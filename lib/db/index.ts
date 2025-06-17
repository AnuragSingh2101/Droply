/*
 * Database Connection for Droply
 */
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";


import * as dotenv from "dotenv";
dotenv.config({ path : ".env.local"})

if(!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is missing in .env.local file");
}


const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

export { sql };