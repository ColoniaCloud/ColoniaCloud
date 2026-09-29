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