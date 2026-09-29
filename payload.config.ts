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

// SQLite y las imágenes viven en disco, así que el directorio tiene que
// sobrevivir al despliegue. Hostinger reemplaza el directorio de la app en
// cada push: si `PAYLOAD_DATA_DIR` queda relativo (o sin definir), la base se
// resuelve dentro de esa copia y cada deploy borra usuarios y artículos sin
// decir nada. El aviso deja la ruta efectiva en los logs de ejecución, que es
// la única forma de verificarla: hPanel enmascara el valor de la variable.
const dataDir = path.resolve(process.env.PAYLOAD_DATA_DIR || path.join(process.cwd(), 'data'));
mkdirSync(path.join(dataDir, 'media'), { recursive: true });

if (process.env.NODE_ENV === 'production') {
  const relativeToApp = path.relative(process.cwd(), dataDir);
  console.log(`[payload] PAYLOAD_DATA_DIR -> ${dataDir}`);
  if (!relativeToApp.startsWith('..') && !path.isAbsolute(relativeToApp)) {
    console.warn(
      '[payload] El directorio de datos está dentro del directorio de la aplicación. ' +
        'El próximo despliegue va a borrar la base y las imágenes. ' +
        'Apuntá PAYLOAD_DATA_DIR a una ruta absoluta fuera de la app.',
    );
  }
}

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