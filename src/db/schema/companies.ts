import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const branchTypeEnum = pgEnum('branch_type_enum', ['head', 'branch']);

export const companies = pgTable('companies', {
  id: uuid().primaryKey().defaultRandom(),
  cnpj: varchar('cnpj', { length: 14 }).notNull().unique(),
  branchType: branchTypeEnum(),

  legalName: varchar('legal_name', { length: 256 }).notNull(),
  tradeName: varchar('trade_name', { length: 256 }),

  mainCnae: varchar('main_cnae', { length: 10 }),

  zipCode: varchar('zip_code', { length: 8 }),
  streetAddress: varchar('street_address', { length: 256 }),
  addressNumber: varchar('address_number', { length: 20 }),
  addressComplement: varchar('address_complement', { length: 100 }),
  neighborhood: varchar('neighborhood', { length: 100 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 2 }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
