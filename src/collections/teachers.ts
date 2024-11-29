import { lexicalEditor, ParagraphFeature, BoldFeature, ItalicFeature, UnderlineFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Teachers: CollectionConfig = {
    slug: 'teachers',
    labels: {
        singular: 'Insegnante',
        plural: 'Insegnanti'
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'cognome',
        defaultColumns: ['nome', 'cognome', 'updatedAt'], // colonne da mostrare in tabella
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: 'Informazioni',
                    fields: [
                        {
                            label: "Nome",
                            name: 'nome',
                            type: 'text',
                            required: true,
                        },
                        {
                            label: "Cognome",
                            name: 'cognome',
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
                            label: "Foto",
                            name: 'photo',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                    ]
                },
                {
                    label: 'Corsi',
                    fields: [
                        {
                            name: 'courses',
                            type: 'join',
                            collection: 'courses',
                            on: 'teacher',
                        },
                    ]
                }
            ]
        }
    ],
}
