import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users_table", {
    username: text().notNull().unique(),
    password: text().notNull()
})

export const postsTable = sqliteTable("posts_table", {
    username: text().notNull(),
    message: text().notNull(),
    location: text().notNull()
})