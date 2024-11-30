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
            label: "ID Pagamento",
            name: 'paymentId',
            type: 'text',
        },
        {
            name: 'course',
            type: 'relationship',
            relationTo: 'courses',
        },
    ],
}
