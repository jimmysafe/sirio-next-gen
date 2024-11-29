import { Field } from "payload"

export const hero: Field = {
    name: 'hero',
    type: 'group',
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'piccolo',
            label: 'Type',
            options: [
                {
                    label: 'Nessuno',
                    value: 'none',
                },
                {
                    label: 'Grande',
                    value: 'grande',
                },
                {
                    label: 'Piccolo',
                    value: 'piccolo',
                },
            ],
            required: true,
        },
        {
            name: 'media',
            type: 'upload',
            admin: {
                condition: (_, { type } = {}) => ['grande', 'piccolo'].includes(type),
            },
            relationTo: 'media',
            required: true,
        },
    ],
    label: false,
}