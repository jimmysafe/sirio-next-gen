import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` RENAME COLUMN "payment_link" TO "payment_id";`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` ADD \`email\` text;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` ADD \`codice_fiscale\` text;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` ADD \`partita_iva\` text;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` ADD \`codice_univoco\` text;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` RENAME COLUMN "payment_id" TO "payment_link";`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` DROP COLUMN \`email\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` DROP COLUMN \`codice_fiscale\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` DROP COLUMN \`partita_iva\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`course_subscriptions\` DROP COLUMN \`codice_univoco\`;`)
}
