import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: int('id').autoincrement().primaryKey(),
  url: varchar('url', { length: 255 }).notNull(),
  shortCode: varchar('shortCode', { length: 20 }).notNull().unique(),
});
