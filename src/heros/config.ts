import type { Field } from 'payload'


export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'small',
      label: 'Type',
      options: [
        {
          label: 'Nessuno',
          value: 'none',
        },
        {
          label: 'Home',
          value: 'home',
        },
        {
          label: 'Piccolo',
          value: 'small',
        },
      ],
      required: true,
    },
    {
      label: "Titolo",
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: "Sottotitolo",
      name: 'subtitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['home'].includes(type),
      },
      required: true,
    },
    {
      label: "Descrizione",
      name: 'description',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => ['home'].includes(type),
      },
      required: true,
    },
    {
      label: "Immagine",
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) => ['small'].includes(type),
      },
    },
    {
      label: "Immagini",
      name: 'medias',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        condition: (_, { type } = {}) => ['home'].includes(type),
      },
    },
  ],
  label: false,
}
