import path from 'node:path';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  upload: {
    staticDir: path.join(
      process.env.PAYLOAD_DATA_DIR || path.join(process.cwd(), 'data'),
      'media',
    ),
    mimeTypes: ['image/*'],
    imageSizes: [
      // 1200x630 es el tamaño que esperan Open Graph y Twitter Cards. Sin
      // este recorte se comparte el original, que pesa de más y queda
      // recortado a criterio de cada red.
      // JPEG y no el formato original: un PNG de portada sale arriba de 1 MB y
      // los scrapers de Facebook, LinkedIn y X lo descargan en cada preview.
      // WebP no sirve acá — varios de esos scrapers todavía no lo leen.
      {
        name: 'og',
        width: 1200,
        height: 630,
        fit: 'cover',
        formatOptions: { format: 'jpeg', options: { quality: 82 } },
      },
      { name: 'card', width: 960, height: 640, fit: 'cover' },
      { name: 'thumbnail', width: 480, height: 320, fit: 'cover' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};