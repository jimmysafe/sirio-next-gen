import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users\` (
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
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
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
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`courses_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_gallery_order_idx\` ON \`courses_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_gallery_parent_id_idx\` ON \`courses_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_gallery_photo_idx\` ON \`courses_gallery\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_benefits_order_idx\` ON \`courses_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_benefits_parent_id_idx\` ON \`courses_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses\` (
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
  await db.run(sql`CREATE INDEX \`courses_hero_image_idx\` ON \`courses\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_meta_meta_image_idx\` ON \`courses\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_teacher_idx\` ON \`courses\` (\`teacher_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_slug_idx\` ON \`courses\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`courses_updated_at_idx\` ON \`courses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`courses_created_at_idx\` ON \`courses\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`courses__status_idx\` ON \`courses\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`courses_rels\` (
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
  await db.run(sql`CREATE INDEX \`courses_rels_order_idx\` ON \`courses_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`courses_rels_parent_idx\` ON \`courses_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_rels_path_idx\` ON \`courses_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`courses_rels_course_subscriptions_id_idx\` ON \`courses_rels\` (\`course_subscriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_rels_tutors_id_idx\` ON \`courses_rels\` (\`tutors_id\`);`)
  await db.run(sql`CREATE TABLE \`_courses_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`photo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_courses_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_courses_v_version_gallery_order_idx\` ON \`_courses_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_version_gallery_parent_id_idx\` ON \`_courses_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_version_gallery_photo_idx\` ON \`_courses_v_version_gallery\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`_courses_v_version_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_courses_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_courses_v_version_benefits_order_idx\` ON \`_courses_v_version_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_version_benefits_parent_id_idx\` ON \`_courses_v_version_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_courses_v\` (
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
  await db.run(sql`CREATE TABLE \`_courses_v_rels\` (
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
  await db.run(sql`CREATE INDEX \`_courses_v_rels_order_idx\` ON \`_courses_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_rels_parent_idx\` ON \`_courses_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_rels_path_idx\` ON \`_courses_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_rels_course_subscriptions_id_idx\` ON \`_courses_v_rels\` (\`course_subscriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`_courses_v_rels_tutors_id_idx\` ON \`_courses_v_rels\` (\`tutors_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_medias\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_medias_order_idx\` ON \`pages_hero_medias\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_medias_parent_id_idx\` ON \`pages_hero_medias\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_medias_image_idx\` ON \`pages_hero_medias\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_latest_courses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'I Nostri Corsi',
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_courses_order_idx\` ON \`pages_blocks_latest_courses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_courses_parent_id_idx\` ON \`pages_blocks_latest_courses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_courses_path_idx\` ON \`pages_blocks_latest_courses\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_our_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`mission_text\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_our_mission_order_idx\` ON \`pages_blocks_our_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_our_mission_parent_id_idx\` ON \`pages_blocks_our_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_our_mission_path_idx\` ON \`pages_blocks_our_mission\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_our_mission_image_idx\` ON \`pages_blocks_our_mission\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_professionals_students_info\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_professionals_students\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_professionals_students_info_order_idx\` ON \`pages_blocks_professionals_students_info\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_professionals_students_info_parent_id_idx\` ON \`pages_blocks_professionals_students_info\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_professionals_students_info_image_idx\` ON \`pages_blocks_professionals_students_info\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_professionals_students\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_professionals_students_order_idx\` ON \`pages_blocks_professionals_students\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_professionals_students_parent_id_idx\` ON \`pages_blocks_professionals_students\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_professionals_students_path_idx\` ON \`pages_blocks_professionals_students\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`bio\` text,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_team\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_members_order_idx\` ON \`pages_blocks_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_members_parent_id_idx\` ON \`pages_blocks_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_members_photo_idx\` ON \`pages_blocks_team_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Il Nostro Team',
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_order_idx\` ON \`pages_blocks_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_parent_id_idx\` ON \`pages_blocks_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_path_idx\` ON \`pages_blocks_team\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Hai Domande?',
  	\`subtitle\` text,
  	\`phone\` text,
  	\`email\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_order_idx\` ON \`pages_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_parent_id_idx\` ON \`pages_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_path_idx\` ON \`pages_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_type\` text DEFAULT 'small',
  	\`hero_title\` text,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_media_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_medias\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_medias_order_idx\` ON \`_pages_v_version_hero_medias\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_medias_parent_id_idx\` ON \`_pages_v_version_hero_medias\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_medias_image_idx\` ON \`_pages_v_version_hero_medias\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_latest_courses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'I Nostri Corsi',
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_courses_order_idx\` ON \`_pages_v_blocks_latest_courses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_courses_parent_id_idx\` ON \`_pages_v_blocks_latest_courses\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_courses_path_idx\` ON \`_pages_v_blocks_latest_courses\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_our_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`mission_text\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_our_mission_order_idx\` ON \`_pages_v_blocks_our_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_our_mission_parent_id_idx\` ON \`_pages_v_blocks_our_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_our_mission_path_idx\` ON \`_pages_v_blocks_our_mission\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_our_mission_image_idx\` ON \`_pages_v_blocks_our_mission\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_professionals_students_info\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`text\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_professionals_students\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_professionals_students_info_order_idx\` ON \`_pages_v_blocks_professionals_students_info\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_professionals_students_info_parent_id_idx\` ON \`_pages_v_blocks_professionals_students_info\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_professionals_students_info_image_idx\` ON \`_pages_v_blocks_professionals_students_info\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_professionals_students\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_professionals_students_order_idx\` ON \`_pages_v_blocks_professionals_students\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_professionals_students_parent_id_idx\` ON \`_pages_v_blocks_professionals_students\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_professionals_students_path_idx\` ON \`_pages_v_blocks_professionals_students\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`bio\` text,
  	\`photo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_team\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_members_order_idx\` ON \`_pages_v_blocks_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_members_parent_id_idx\` ON \`_pages_v_blocks_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_members_photo_idx\` ON \`_pages_v_blocks_team_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Il Nostro Team',
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_order_idx\` ON \`_pages_v_blocks_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_parent_id_idx\` ON \`_pages_v_blocks_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_path_idx\` ON \`_pages_v_blocks_team\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Hai Domande?',
  	\`subtitle\` text,
  	\`phone\` text,
  	\`email\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_order_idx\` ON \`_pages_v_blocks_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_parent_id_idx\` ON \`_pages_v_blocks_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_path_idx\` ON \`_pages_v_blocks_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_type\` text DEFAULT 'small',
  	\`version_hero_title\` text,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_media_id\` integer,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v\` (\`version_hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`teachers\` (
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
  await db.run(sql`CREATE INDEX \`teachers_photo_idx\` ON \`teachers\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`teachers_updated_at_idx\` ON \`teachers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`teachers_created_at_idx\` ON \`teachers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tutors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`cognome\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`tutors_updated_at_idx\` ON \`tutors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tutors_created_at_idx\` ON \`tutors\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`course_subscriptions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nome\` text NOT NULL,
  	\`cognome\` text NOT NULL,
  	\`email\` text,
  	\`codice_fiscale\` text,
  	\`partita_iva\` text,
  	\`codice_univoco\` text,
  	\`payment_id\` text,
  	\`course_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`course_subscriptions_course_idx\` ON \`course_subscriptions\` (\`course_id\`);`)
  await db.run(sql`CREATE INDEX \`course_subscriptions_updated_at_idx\` ON \`course_subscriptions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`course_subscriptions_created_at_idx\` ON \`course_subscriptions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_courses_id_idx\` ON \`payload_locked_documents_rels\` (\`courses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_teachers_id_idx\` ON \`payload_locked_documents_rels\` (\`teachers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tutors_id_idx\` ON \`payload_locked_documents_rels\` (\`tutors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_course_subscriptions_id_idx\` ON \`payload_locked_documents_rels\` (\`course_subscriptions_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`courses_gallery\`;`)
  await db.run(sql`DROP TABLE \`courses_benefits\`;`)
  await db.run(sql`DROP TABLE \`courses\`;`)
  await db.run(sql`DROP TABLE \`courses_rels\`;`)
  await db.run(sql`DROP TABLE \`_courses_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_courses_v_version_benefits\`;`)
  await db.run(sql`DROP TABLE \`_courses_v\`;`)
  await db.run(sql`DROP TABLE \`_courses_v_rels\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_medias\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_latest_courses\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_our_mission\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_professionals_students_info\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_professionals_students\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_team_members\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_medias\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_latest_courses\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_our_mission\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_professionals_students_info\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_professionals_students\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_team_members\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`teachers\`;`)
  await db.run(sql`DROP TABLE \`tutors\`;`)
  await db.run(sql`DROP TABLE \`course_subscriptions\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
}
