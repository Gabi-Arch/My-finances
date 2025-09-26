// db.js
import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";
dotenv.config();

// Preferência: use connectionString (DATABASE_URL) se definida, senão use campos separados
const connectionString = process.env.DATABASE_URL || null;

const pool = connectionString
    ? new Pool({ connectionString })
    : new Pool({
        user: process.env.DB_USER,        // ex: postgres
        host: process.env.DB_HOST,        // ex: localhost
        database: process.env.DB_DATABASE,    // ex: finance_app
        password: process.env.DB_PASS,    // NOTE: sua .env usa DB_PASS
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    });

export default pool;
