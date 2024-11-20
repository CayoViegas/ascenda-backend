import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../config/database";
import { users } from "../models/user";
import { and, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { friends } from "../models/friend";

const userController = {
    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({
                error: "Name, email and password are required.",
            });
            return;
        }

        try {
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.email, email));

            if (existingUser.length > 0) {
                res.status(400).json({ error: "Email already exists." });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await db.insert(users).values({
                name,
                email,
                password: hashedPassword,
            });
            res.status(201).json({ message: "User registered successfully." });
            return;
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ error: "Internal server error." });
            return;
        }
    },

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required." });
            return;
        }

        try {
            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, email));

            if (user.length === 0) {
                res.status(404).json({ error: "User not found." });
                return;
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user[0].password
            );
            if (!isPasswordValid) {
                res.status(401).json({ error: "Invalid credentials." });
                return;
            }

            const token = jwt.sign(
                { id: user[0].id },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "7d",
                }
            );

            res.json({ message: "Login successful.", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
            return;
        }
    },

    async addFriend(req: Request, res: Response) {
        const { friendId } = req.body;
        const userId = req.user?.id;

        if (!friendId) {
            return res.status(400).json({ error: "Friend ID is required." });
        }

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized." });
        }

        try {
            const friend = await db
                .select()
                .from(users)
                .where(eq(users.id, friendId));

            if (friend.length === 0) {
                return res.status(404).json({ error: "Friend not found." });
            }

            const existingFriendship = await db
                .select()
                .from(friends)
                .where(
                    and(
                        eq(friends.userId, userId),
                        eq(friends.friendId, friendId)
                    )
                );

            if (existingFriendship.length > 0) {
                return res.status(400).json({ error: "Friend already added." });
            }

            await db.insert(friends).values({
                userId,
                friendId,
            });

            res.json({ message: "Friend added successfully." });
        } catch (error) {
            console.error("Error adding friend:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    },

    async getProfile(req: Request, res: Response) {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized." });
        }

        try {
            const user = await db
                .select({
                    id: users.id,
                    name: users.name,
                    email: users.email,
                })
                .from(users)
                .where(eq(users.id, userId));

            if (user.length === 0) {
                return res.status(404).json({ error: "User not found." });
            }

            res.json(user[0]);
        } catch (error) {
            console.error("Error fetching profile:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    },
};

export default userController;
