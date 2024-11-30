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

export const Courses: CollectionConfig = {
    slug: 'courses',
    labels: {
        singular: 'Corso',
        plural: 'Corsi'
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title', // campo da usare come titolo
        defaultColumns: ['title', 'slug', '_status', 'updatedAt'], // colonne da mostrare in tabella
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
                }
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
