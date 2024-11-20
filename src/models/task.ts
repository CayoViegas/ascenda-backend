import {
    pgTable,
    integer,
    varchar,
    boolean,
    serial,
    date,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    priority: varchar("priority", { length: 10 }).notNull(), // "high", "medium", "low"
    status: boolean("status").default(false), // false: pendente, true: feita
    points: integer("points").default(0),
    userId: integer("user_id").references(() => users.id),
    date: date("date").notNull(),
});
