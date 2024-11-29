import type { CollectionConfig } from 'payload'

export const Tutors: CollectionConfig = {
    slug: 'tutors',
    labels: {
        singular: 'Tutore',
        plural: 'Tutori'
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
    ],
}
