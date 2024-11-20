import { Request, Response } from "express";
import { db } from "../config/database";
import { tasks } from "../models/task";
import { and, eq } from "drizzle-orm";
import { CustomJwtPayload } from "../types/customJwtPayload";

const taskController = {
    async addTask(req: Request, res: Response): Promise<void> {
        const { title, priority } = req.body;
        const userId = (req.user as CustomJwtPayload)?.id;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }

        if (!title || !priority) {
            res.status(400).json({ message: "Title and priority are required." });
            return;
        }

        try {
            const today = new Date().toISOString().split("T")[0];

            await db.insert(tasks).values({
                title,
                priority,
                userId,
                date: today,
            });

            res.status(201).json({ message: "Task added successfully." });
        } catch (error) {
            console.error("Error adding task: ", error);
            res.status(500).json({ message: "Internal server error." });
        }
    },

    async getTasks(req: Request, res: Response): Promise<void> {
        const userId = (req.user as CustomJwtPayload)?.id;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }

        try {
            const today = new Date().toISOString().split("T")[0];

            const userTasks = await db
                .select()
                .from(tasks)
                .where(
                    and(
                        eq(tasks.userId, userId),
                        eq(tasks.date, today)
                    )
                );

            res.json(userTasks);
        } catch (error) {
            console.error("Error getting tasks: ", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
};