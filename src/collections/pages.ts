import { ImageText } from '@/blocks/image-text.ts/config'
import { hero } from '@/fields/hero'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    labels: {
        singular: 'Pagina',
        plural: 'Pagine'
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title', // campo da usare come titolo
        defaultColumns: ['title', 'slug', 'updatedAt'], // colonne da mostrare in tabella
    },
    fields: [
        {
            label: "Titolo",
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            label: "Slug",
            name: 'slug',
            type: 'text',
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [hero],
                    label: 'Hero',
                },
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [ImageText],
                            required: true,
                        },
                    ],
                    label: 'Content',
                },
            ]
        }
    ],
}
