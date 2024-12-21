import { BoldFeature, InlineToolbarFeature, ItalicFeature, lexicalEditor, ParagraphFeature, UnderlineFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Iscrizioni: CollectionConfig = {
    labels: {
        singular: 'Iscrizione',
        plural: 'Iscrizioni'
    },
    slug: 'course-subscriptions',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'cognome',
        defaultColumns: ['nome', 'cognome', 'paymentLink', 'updatedAt'], // colonne da mostrare in tabella
    },
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
            label: "Email",
            name: 'email',
            type: 'text',
        },
        {
            label: "Codice Fiscale",
            name: 'codiceFiscale',
            type: 'text',
        },
        {
            label: "Partita IVA",
            name: 'partitaIva',
            type: 'text',
        },
        {
            label: "Codice Univoco",
            name: 'codiceUnivoco',
            type: 'text',
        },
        {
            name: 'course',
            label: 'Corso',
            type: 'relationship',
            relationTo: 'courses',
        },
        {
            label: "Stato Pagamento",
            name: 'paymentStatus',
            type: 'select',
            defaultValue: 'saldato',
            options: [
                { label: 'Acconto', value: 'acconto' },
                { label: 'Saldato', value: 'saldato' },
            ],
            admin: {
                position: 'sidebar',
            }
        },
        {
            label: "ID Pagamento",
            name: 'paymentId',
            type: 'text',
            admin: {
                position: 'sidebar',
            }
        },
        {
            label: "Note",
            name: 'notes',
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
            admin: {
                position: 'sidebar',
            }
        },
    ],
}
