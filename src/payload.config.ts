import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/users'
import { Media } from './collections/media'
import { Courses } from './collections/courses'
import { Pages } from './collections/pages'
import { it, itTranslations } from '@payloadcms/translations/languages/it'
import { Teachers } from './collections/teachers'
import { Tutors } from './collections/tutors'
import { Iscrizioni } from './collections/course-subscriptions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo: {
          path: "./payload-graphics",
          exportName: "Logo",
        },
        Icon: {
          path: "./payload-graphics",
          exportName: "Logo",
        },
      }
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  telemetry: false,
  collections: [Users, Media, Courses, Pages, Teachers, Tutors, Iscrizioni],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_AUTH_TOKEN || ''
    },
  }),
  i18n: {
    fallbackLanguage: 'it',
    supportedLanguages: { it },
    translations: {
      it: itTranslations
    }
  },
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      // Specify which collections should use Vercel Blob
      collections: {
        media: {
          prefix: 'sirio-next-gen'
        },
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    }),
  ],
})
