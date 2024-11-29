import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'sirio-next-gen',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`courses_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_gallery_order_idx\` ON \`courses_gallery\` (\`_order\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_gallery_parent_id_idx\` ON \`courses_gallery\` (\`_parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_gallery_photo_idx\` ON \`courses_gallery\` (\`photo_id\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`courses\` (
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
  	\`teacher_id\` integer,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`published_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_hero_image_idx\` ON \`courses\` (\`hero_image_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_teacher_idx\` ON \`courses\` (\`teacher_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_slug_idx\` ON \`courses\` (\`slug\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_updated_at_idx\` ON \`courses\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_created_at_idx\` ON \`courses\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses__status_idx\` ON \`courses\` (\`_status\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`courses_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`course_subscriptions_id\` integer,
  	\`tutors_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`course_subscriptions_id\`) REFERENCES \`course_subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tutors_id\`) REFERENCES \`tutors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_rels_order_idx\` ON \`courses_rels\` (\`order\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_rels_parent_idx\` ON \`courses_rels\` (\`parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_rels_path_idx\` ON \`courses_rels\` (\`path\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_rels_course_subscriptions_id_idx\` ON \`courses_rels\` (\`course_subscriptions_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`courses_rels_tutors_id_idx\` ON \`courses_rels\` (\`tutors_id\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`_courses_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`photo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_courses_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_gallery_order_idx\` ON \`_courses_v_version_gallery\` (\`_order\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_gallery_parent_id_idx\` ON \`_courses_v_version_gallery\` (\`_parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_gallery_photo_idx\` ON \`_courses_v_version_gallery\` (\`photo_id\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`_courses_v\` (
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
  	FOREIGN KEY (\`version_teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_parent_idx\` ON \`_courses_v\` (\`parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_version_hero_image_idx\` ON \`_courses_v\` (\`version_hero_image_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_version_teacher_idx\` ON \`_courses_v\` (\`version_teacher_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_version_slug_idx\` ON \`_courses_v\` (\`version_slug\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_version_updated_at_idx\` ON \`_courses_v\` (\`version_updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_version_created_at_idx\` ON \`_courses_v\` (\`version_created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_version_version__status_idx\` ON \`_courses_v\` (\`version__status\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_created_at_idx\` ON \`_courses_v\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_updated_at_idx\` ON \`_courses_v\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_latest_idx\` ON \`_courses_v\` (\`latest\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_autosave_idx\` ON \`_courses_v\` (\`autosave\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`_courses_v_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`course_subscriptions_id\` integer,
  	\`tutors_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_courses_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`course_subscriptions_id\`) REFERENCES \`course_subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tutors_id\`) REFERENCES \`tutors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_rels_order_idx\` ON \`_courses_v_rels\` (\`order\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_rels_parent_idx\` ON \`_courses_v_rels\` (\`parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_rels_path_idx\` ON \`_courses_v_rels\` (\`path\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_rels_course_subscriptions_id_idx\` ON \`_courses_v_rels\` (\`course_subscriptions_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`_courses_v_rels_tutors_id_idx\` ON \`_courses_v_rels\` (\`tutors_id\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_image_text_order_idx\` ON \`pages_blocks_image_text\` (\`_order\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_image_text_parent_id_idx\` ON \`pages_blocks_image_text\` (\`_parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_image_text_path_idx\` ON \`pages_blocks_image_text\` (\`_path\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_image_text_image_idx\` ON \`pages_blocks_image_text\` (\`image_id\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`hero_type\` text DEFAULT 'piccolo' NOT NULL,
  	\`hero_media_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`teachers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`cognome\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`photo_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`teachers_photo_idx\` ON \`teachers\` (\`photo_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`teachers_updated_at_idx\` ON \`teachers\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`teachers_created_at_idx\` ON \`teachers\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`tutors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`cognome\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`tutors_updated_at_idx\` ON \`tutors\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`tutors_created_at_idx\` ON \`tutors\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`course_subscriptions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`cognome\` text NOT NULL,
  	\`payment_link\` text,
  	\`course_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`course_subscriptions_course_idx\` ON \`course_subscriptions\` (\`course_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`course_subscriptions_updated_at_idx\` ON \`course_subscriptions\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`course_subscriptions_created_at_idx\` ON \`course_subscriptions\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`courses_id\` integer,
  	\`pages_id\` integer,
  	\`teachers_id\` integer,
  	\`tutors_id\` integer,
  	\`course_subscriptions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`courses_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`teachers_id\`) REFERENCES \`teachers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tutors_id\`) REFERENCES \`tutors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`course_subscriptions_id\`) REFERENCES \`course_subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_courses_id_idx\` ON \`payload_locked_documents_rels\` (\`courses_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_teachers_id_idx\` ON \`payload_locked_documents_rels\` (\`teachers_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_tutors_id_idx\` ON \`payload_locked_documents_rels\` (\`tutors_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_course_subscriptions_id_idx\` ON \`payload_locked_documents_rels\` (\`course_subscriptions_id\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
	await payload.db.drizzle.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
	await payload.db.drizzle.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.run(sql`DROP TABLE \`users\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`media\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`courses_gallery\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`courses\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`courses_rels\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`_courses_v_version_gallery\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`_courses_v\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`_courses_v_rels\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_image_text\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`pages\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`teachers\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`tutors\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`course_subscriptions\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
	await payload.db.drizzle.run(sql`DROP TABLE \`payload_migrations\`;`)
}
