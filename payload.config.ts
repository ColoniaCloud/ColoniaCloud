import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { Users } from './collections/Users';
import { migrations } from './migrations';

const dataDir = process.env.PAYLOAD_DATA_DIR || path.join(process.cwd(), 'data');
mkdirSync(path.join(dataDir, 'media'), { recursive: true });

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Users, Posts, Media],
  db: sqliteAdapter({
    client: {
      url: pathToFileURL(path.join(dataDir, 'payload.sqlite')).href,
    },
    migrationDir: path.join(process.cwd(), 'migrations'),
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve('payload-types.ts'),
  },
});