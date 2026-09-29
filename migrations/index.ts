import * as migration_20260929_173452_blog_initial from './20260929_173452_blog_initial';

export const migrations = [
  {
    up: migration_20260929_173452_blog_initial.up,
    down: migration_20260929_173452_blog_initial.down,
    name: '20260929_173452_blog_initial'
  },
];
