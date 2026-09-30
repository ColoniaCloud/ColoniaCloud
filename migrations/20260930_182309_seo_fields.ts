import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`author_id\` integer REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_noindex\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_filename\` text;`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`cover_image_id\` integer NOT NULL,
  	\`content\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`published_at\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "slug", "excerpt", "cover_image_id", "content", "status", "published_at", "updated_at", "created_at") SELECT "id", "title", "slug", "excerpt", "cover_image_id", "content", "status", "published_at", "updated_at", "created_at" FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_cover_image_idx\` ON \`posts\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`DROP INDEX \`media_sizes_og_sizes_og_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_filename\`;`)
}
