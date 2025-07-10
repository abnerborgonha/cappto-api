import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { companies } from './companies.ts';

export const contacts = pgTable('contacts', {
  id: uuid().primaryKey().defaultRandom(),

  companyId: uuid('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),

  fullName: varchar('full_name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }),
  phoneNumber: varchar('phone_number', { length: 50 }),

  capturedAt: timestamp('captured_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
