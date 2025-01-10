import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const todo = pgTable('todo', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'), // una descripción más detallada
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
	isCompleted: boolean('is_completed').default(false)
});

export type Todo = typeof todo.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
