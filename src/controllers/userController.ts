import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../config/database";
import { users } from "../models/user";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const userController = {
    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email and password are required." });
        }

        try {
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.email, email));

            if (existingUser.length > 0) {
                return res.status(400).json({ error: "Email already exists." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await db.insert(users).values({
                name,
                email,
                password: hashedPassword,
            });

            return res.status(201).json({ message: "User registered successfully." });
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({ error: "Internal server error." });
        }
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        try {
            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, email));

            if (user.length === 0) {
                return res.status(404).json({ error: "User not found." });
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET as string, {
                expiresIn: "7d",
            });

            res.json({ message: "Login successful.", token });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
};

export default userController;