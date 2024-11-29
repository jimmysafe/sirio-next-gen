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
            label: "Link alla ricevuta di pagamento",
            name: 'paymentLink',
            type: 'text',
        },
        {
            name: 'course',
            type: 'relationship',
            relationTo: 'courses',
        },
    ],
}
