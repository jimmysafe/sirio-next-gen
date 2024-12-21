import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.run(sql`ALTER TABLE \`courses\` ADD \`brochure_id\` integer REFERENCES media(id);`)
	await db.run(sql`CREATE INDEX \`courses_brochure_idx\` ON \`courses\` (\`brochure_id\`);`)
	await db.run(sql`ALTER TABLE \`_courses_v\` ADD \`version_brochure_id\` integer REFERENCES media(id);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_version_brochure_idx\` ON \`_courses_v\` (\`version_brochure_id\`);`)
	await db.run(sql`ALTER TABLE \`course_subscriptions\` ADD \`payment_status\` text DEFAULT 'saldato';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.run(sql`PRAGMA foreign_keys=OFF;`)
	await db.run(sql`CREATE TABLE \`__new_courses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`hero_image_id\` integer,
  	\`price\` numeric,
  	\`start_date\` text,
  	\`modules\` numeric,
  	\`days\` numeric,
  	\`goals\` text,
  	\`programme\` text,
  	\`callout\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`teacher_id\` integer,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
	await db.run(sql`INSERT INTO \`__new_courses\`("id", "title", "description", "hero_image_id", "price", "start_date", "modules", "days", "goals", "programme", "callout", "meta_title", "meta_image_id", "meta_description", "teacher_id", "slug", "slug_lock", "published_at", "updated_at", "created_at", "_status") SELECT "id", "title", "description", "hero_image_id", "price", "start_date", "modules", "days", "goals", "programme", "callout", "meta_title", "meta_image_id", "meta_description", "teacher_id", "slug", "slug_lock", "published_at", "updated_at", "created_at", "_status" FROM \`courses\`;`)
	await db.run(sql`DROP TABLE \`courses\`;`)
	await db.run(sql`ALTER TABLE \`__new_courses\` RENAME TO \`courses\`;`)
	await db.run(sql`PRAGMA foreign_keys=ON;`)
	await db.run(sql`CREATE INDEX \`courses_hero_image_idx\` ON \`courses\` (\`hero_image_id\`);`)
	await db.run(sql`CREATE INDEX \`courses_meta_meta_image_idx\` ON \`courses\` (\`meta_image_id\`);`)
	await db.run(sql`CREATE INDEX \`courses_teacher_idx\` ON \`courses\` (\`teacher_id\`);`)
	await db.run(sql`CREATE INDEX \`courses_slug_idx\` ON \`courses\` (\`slug\`);`)
	await db.run(sql`CREATE INDEX \`courses_updated_at_idx\` ON \`courses\` (\`updated_at\`);`)
	await db.run(sql`CREATE INDEX \`courses_created_at_idx\` ON \`courses\` (\`created_at\`);`)
	await db.run(sql`CREATE INDEX \`courses__status_idx\` ON \`courses\` (\`_status\`);`)
	await db.run(sql`CREATE TABLE \`__new__courses_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_description\` text,
  	\`version_hero_image_id\` integer,
  	\`version_price\` numeric,
  	\`version_start_date\` text,
  	\`version_modules\` numeric,
  	\`version_days\` numeric,
  	\`version_goals\` text,
  	\`version_programme\` text,
  	\`version_callout\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_teacher_id\` integer,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_published_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
	await db.run(sql`INSERT INTO \`__new__courses_v\`("id", "parent_id", "version_title", "version_description", "version_hero_image_id", "version_price", "version_start_date", "version_modules", "version_days", "version_goals", "version_programme", "version_callout", "version_meta_title", "version_meta_image_id", "version_meta_description", "version_teacher_id", "version_slug", "version_slug_lock", "version_published_at", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave") SELECT "id", "parent_id", "version_title", "version_description", "version_hero_image_id", "version_price", "version_start_date", "version_modules", "version_days", "version_goals", "version_programme", "version_callout", "version_meta_title", "version_meta_image_id", "version_meta_description", "version_teacher_id", "version_slug", "version_slug_lock", "version_published_at", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "latest", "autosave" FROM \`_courses_v\`;`)
	await db.run(sql`DROP TABLE \`_courses_v\`;`)
	await db.run(sql`ALTER TABLE \`__new__courses_v\` RENAME TO \`_courses_v\`;`)
	await db.run(sql`CREATE INDEX \`_courses_v_parent_idx\` ON \`_courses_v\` (\`parent_id\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_version_hero_image_idx\` ON \`_courses_v\` (\`version_hero_image_id\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_meta_version_meta_image_idx\` ON \`_courses_v\` (\`version_meta_image_id\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_version_teacher_idx\` ON \`_courses_v\` (\`version_teacher_id\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_version_slug_idx\` ON \`_courses_v\` (\`version_slug\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_version_updated_at_idx\` ON \`_courses_v\` (\`version_updated_at\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_version_created_at_idx\` ON \`_courses_v\` (\`version_created_at\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_version_version__status_idx\` ON \`_courses_v\` (\`version__status\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_created_at_idx\` ON \`_courses_v\` (\`created_at\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_updated_at_idx\` ON \`_courses_v\` (\`updated_at\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_latest_idx\` ON \`_courses_v\` (\`latest\`);`)
	await db.run(sql`CREATE INDEX \`_courses_v_autosave_idx\` ON \`_courses_v\` (\`autosave\`);`)
	await db.run(sql`ALTER TABLE \`course_subscriptions\` DROP COLUMN \`payment_status\`;`)
}
