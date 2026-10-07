import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import type { GenerateTitle, GenerateDescription, GenerateURL } from '@payloadcms/plugin-seo/types';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { Users } from './collections/Users';
import { migrations } from './migrations';
import type { Post } from './payload-types';

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

const SITE_URL = 'https://colonia.cloud';

// Valores por defecto de la pestaña SEO. El editor los puede pisar; sirven
// para que un artículo sin trabajo de SEO igual salga con algo razonable.
// El title suma la marca (queda ~60 caracteres con un título normal) y la
// description arranca del excerpt, que es lo único que ya está escrito.
const generateTitle: GenerateTitle<Post> = ({ doc }) =>
  doc?.title ? `${doc.title} · Colonia Cloud` : 'Colonia Cloud';

const generateDescription: GenerateDescription<Post> = ({ doc }) => doc?.excerpt || '';

const generateURL: GenerateURL<Post> = ({ doc }) =>
  doc?.slug ? `${SITE_URL}/blog/${doc.slug}` : SITE_URL;

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
  plugins: [
    seoPlugin({
      collections: ['posts'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle,
      generateDescription,
      generateURL,
      // `noindex` vive con el resto del SEO en vez de en la barra lateral:
      // es una decisión de indexación, no de publicación. Un artículo puede
      // estar publicado y visible pero fuera de Google (una landing de
      // campaña, un texto legal, una versión vieja que todavía se linkea).
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'noindex',
          type: 'checkbox',
          label: 'Excluir de los buscadores (noindex)',
          defaultValue: false,
          admin: {
            description:
              'El artículo sigue visible en el sitio, pero sale del sitemap y pide a Google que no lo indexe.',
          },
        },
      ],
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve('payload-types.ts'),
  },
});