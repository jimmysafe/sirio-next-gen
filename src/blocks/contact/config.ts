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
    ],
}