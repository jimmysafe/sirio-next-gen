import { slugField } from '@/fields/slug'
import {
    BoldFeature,
    InlineToolbarFeature,
    ItalicFeature,
    lexicalEditor,
    ParagraphFeature,
    UnderlineFeature,
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload'
import { revalidateCourse } from './hooks/revalidateCourse'
import { generatePreviewPath } from '@/lib/generate-preview-paths';
import { populatePublishedAt } from './hooks/populatePublishedAt';
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Courses: CollectionConfig = {
    slug: 'courses',
    labels: {
        singular: 'Corso',
        plural: 'Corsi'
    },
    access: {
        read: () => true,
    },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        useAsTitle: 'title', // campo da usare come titolo
        defaultColumns: ['title', 'slug', '_status', 'updatedAt'], // colonne da mostrare in tabella
        livePreview: {
            url: ({ data }) => {
                const path = generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'courses',
                })

                return path
            },
        },
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100, // We set this interval for optimal live preview
            },
        },
        maxPerDoc: 50,
    },
    hooks: {
        afterChange: [revalidateCourse],
        beforeChange: [populatePublishedAt],
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Hero',
                    fields: [
                        {
                            label: "Titolo",
                            name: 'title',
                            type: 'text',
                            required: true,
                        },
                        {
                            label: "Descrizione",
                            name: 'description',
                            type: 'richText',
                            required: true,
                            editor: lexicalEditor({
                                features: () => {
                                    return [
                                        ParagraphFeature(),
                                        BoldFeature(),
                                        ItalicFeature(),
                                        UnderlineFeature(),
                                        InlineToolbarFeature()
                                    ]
                                },
                            }),
                        },
                        {
                            label: "Immagine di copertina",
                            name: 'hero_image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            filterOptions: {
                                mimeType: { contains: 'image' }
                            }
                        },
                    ]
                },
                {
                    label: "Informazioni",
                    fields: [
                        {
                            label: "Prezzo",
                            name: 'price',
                            type: 'number',
                            required: true,
                        },
                        {
                            label: "Data di inizio",
                            name: 'start_date',
                            type: 'date',
                            required: true,
                        },
                        {
                            label: "Moduli",
                            name: 'modules',
                            type: 'number',
                            required: true,
                        },
                        {
                            label: "Giornate",
                            name: 'days',
                            type: 'number',
                            required: true,
                        },
                    ]
                },
                {
                    label: 'Galleria Immagini',
                    fields: [
                        {
                            label: 'Gallery',
                            name: 'gallery',
                            type: 'array',
                            fields: [
                                {
                                    label: "Foto",
                                    name: 'photo',
                                    type: 'upload',
                                    relationTo: 'media',
                                    filterOptions: {
                                        mimeType: { contains: 'image' }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Obbiettivi',
                    fields: [
                        {
                            label: "Obbiettivi",
                            name: 'goals',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: () => {
                                    return [
                                        ParagraphFeature(),
                                        BoldFeature(),
                                        ItalicFeature(),
                                        UnderlineFeature(),
                                        InlineToolbarFeature()
                                    ]
                                },
                            }),
                            required: true,
                        }
                    ]
                },
                {
                    label: 'Programma',
                    fields: [
                        {
                            label: "Programma",
                            name: 'programme',
                            type: 'richText',
                            required: true,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        InlineToolbarFeature()
                                    ]
                                },
                            }),
                        }
                    ]
                },
                {
                    label: "Sezione Pagamento",
                    fields: [
                        {
                            label: "Titolo",
                            name: 'callout',
                            type: 'text',
                            required: true,
                        },
                        {
                            label: "Benefici",
                            name: 'benefits',
                            type: 'array',
                            maxRows: 6,
                            minRows: 3,
                            required: true,
                            fields: [
                                {
                                    label: 'Testo',
                                    name: 'text',
                                    type: 'text',
                                    required: true,
                                }
                            ]
                        },
                    ]
                },
                {
                    label: 'Studenti',
                    fields: [
                        {
                            name: '_participations',
                            type: 'relationship',
                            admin: {
                                disabled: true,
                            },
                            hasMany: true,
                            hidden: true,
                            relationTo: 'course-subscriptions',
                        },
                        {
                            name: 'students',
                            type: 'join',
                            hasMany: true,
                            admin: {
                                allowCreate: false,
                            },
                            collection: 'course-subscriptions',
                            on: 'course',
                        },
                    ]
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
            ]
        },
        {
            label: 'Insegnante',
            name: 'teacher',
            type: 'relationship',
            admin: {
                position: 'sidebar',
            },
            relationTo: 'teachers',
            required: true,
        },
        {
            label: 'Tutors',
            name: 'tutors',
            type: 'relationship',
            admin: {
                position: 'sidebar',
            },
            hasMany: true,
            relationTo: 'tutors',
        },
        {
            label: 'Brochure',
            name: 'brochure',
            type: 'upload',
            relationTo: 'media',
            admin: {
                position: 'sidebar',
            },
            filterOptions: {
                mimeType: { contains: 'pdf' }
            }
        },
        ...slugField(),
        {
            label: "Pubblicato il",
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
                readOnly: true,
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
    ],
}
