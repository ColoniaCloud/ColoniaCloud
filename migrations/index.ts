import * as migration_20260929_173452_blog_initial from './20260929_173452_blog_initial';
import * as migration_20260930_182309_seo_fields from './20260930_182309_seo_fields';

export const migrations = [
  {
    up: migration_20260929_173452_blog_initial.up,
    down: migration_20260929_173452_blog_initial.down,
    name: '20260929_173452_blog_initial',
  },
  {
    up: migration_20260930_182309_seo_fields.up,
    down: migration_20260930_182309_seo_fields.down,
    name: '20260930_182309_seo_fields'
  },
];
