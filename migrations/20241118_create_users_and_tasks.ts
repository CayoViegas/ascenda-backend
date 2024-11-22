import { db } from "../src/config/database";

export default async function () {
    // Criação da tabela users
    await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `);

    // Criação da tabela tasks
    await db.execute(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            priority VARCHAR(10) NOT NULL,
            status BOOLEAN DEFAULT false,
            points INTEGER DEFAULT 0,
            user_id INTEGER REFERENCES users(id),
            date VARCHAR(10) NOT NULL
        );
    `);
}
