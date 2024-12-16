import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'
import { revalidatePage } from './hooks/revalidatePage'
import { generatePreviewPath } from '@/lib/generate-preview-paths'
import { hero } from '@/heros/config'
import { LatestCourses } from '@/blocks/latest-courses/config';
import { OurMission } from '@/blocks/our-mission/config';
import { ForProfessionalsAndStudents } from '@/blocks/professionals-students/config';
import { Team } from '@/blocks/team/config'
import { Contact } from '@/blocks/contact/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Pagina',
    plural: 'Pagine'
  },
  access: {
    read: () => true,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: (args) => {
        const path = generatePreviewPath({
          slug: typeof args.data?.slug === 'string' ? args.data.slug : '',
          collection: 'pages',
        })

        return path
      },
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Contenuto',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [LatestCourses, OurMission, ForProfessionalsAndStudents, Team, Contact],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    // beforeChange: [populatePublishedAt],
    // beforeDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
