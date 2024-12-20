import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_social_order_idx\` ON \`pages_blocks_contact_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_social_parent_id_idx\` ON \`pages_blocks_contact_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_social_order_idx\` ON \`_pages_v_blocks_contact_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_social_parent_id_idx\` ON \`_pages_v_blocks_contact_social\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` ADD \`type\` text DEFAULT 'small';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` ADD \`address\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` ADD \`type\` text DEFAULT 'small';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` ADD \`address\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_contact_social\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_social\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` DROP COLUMN \`type\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact\` DROP COLUMN \`address\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` DROP COLUMN \`type\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact\` DROP COLUMN \`address\`;`)
}
