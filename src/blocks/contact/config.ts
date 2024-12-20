import { lexicalEditor, ParagraphFeature, BoldFeature, ItalicFeature, UnderlineFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Contact: Block = {
    slug: 'contact',
    interfaceName: 'ContactBlock',
    labels: {
        plural: 'Contattaci',
        singular: 'Contattaci',
    },
    fields: [
        {
            label: 'Tipo',
            name: 'type',
            type: 'select',
            defaultValue: 'small',
            options: [
                {
                    label: 'Piccolo',
                    value: 'small',
                },
                {
                    label: 'Grande',
                    value: 'large',
                },
            ],
        },
        {
            label: "Titolo",
            defaultValue: "Hai Domande?",
            name: "title",
            type: 'text',
            required: true,
        },
        {
            label: "Sottotitolo",
            name: "subtitle",
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
            label: "Telefono",
            name: "phone",
            type: 'text',
            required: true,
        },
        {
            label: "Email",
            name: "email",
            type: 'text',
            required: true,
        },
        {
            label: "Indirizzo",
            name: "address",
            type: 'text',
        },
        {
            label: "Social",
            name: "social",
            type: 'array',
            fields: [
                {
                    label: "Nome",
                    name: "name",
                    type: 'select',
                    options: [
                        {
                            label: 'Facebook',
                            value: 'facebook',
                        },
                        {
                            label: 'Instagram',
                            value: 'instagram',
                        },
                        {
                            label: 'LinkedIn',
                            value: 'linkedin',
                        },
                        {
                            label: 'Twitter',
                            value: 'twitter',
                        },
                        {
                            label: 'YouTube',
                            value: 'youtube',
                        }
                    ]
                },
                {
                    label: "Link",
                    name: "link",
                    type: 'text',
                },
            ],
        },
    ],
}