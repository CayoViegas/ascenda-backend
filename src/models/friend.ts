import { pgTable, integer, serial } from 'drizzle-orm/pg-core';
import { users } from './user';

export const friends = pgTable('friends', {
    id: serial().primaryKey(),
    userId: integer('user_id').references(() => users.id),
    friendId: integer('friend_id').references(() => users.id),
});