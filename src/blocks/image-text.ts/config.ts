import { Block } from "payload";

export const ImageText: Block = {
    slug: 'image-text',
    interfaceName: 'ImageText',
    fields: [
        {
            label: "Testo",
            name: "text",
            type: 'textarea',
            required: true,
        },
        {
            label: "Immagine",
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
}