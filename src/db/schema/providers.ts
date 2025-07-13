import { jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export interface ProviderMetada {
  bucket_name: string,
  path_file_template: string,
  url_template: string
}

export const providerStatusEnum = pgEnum('provider_status_enum', [
  'ACTIVE',
  'INACTIVE',
  'IN_DEVELOPEMENT',
]);

export const providers = pgTable('providers', {
  id: uuid().primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 256 }).notNull(),
  acronym: varchar('acronym', { length: 20 }).notNull().unique(),

  stateCode: varchar('state_code', { length: 2 }).notNull(),
  websiteUrl: text('website_url'),
  apiBaseUrl: text('api_base_url').notNull(),

  status: providerStatusEnum(),
  metadata: jsonb('metadata').$type<ProviderMetada>(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
