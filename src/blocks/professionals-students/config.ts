import { lexicalEditor, ParagraphFeature, BoldFeature, ItalicFeature, UnderlineFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const ForProfessionalsAndStudents: Block = {
    slug: 'professionals-students',
    interfaceName: 'ForProfessionalsAndStudentsBlock',
    labels: {
        plural: 'Per Professionisti e Studenti',
        singular: 'Per Professionisti e Studenti',
    },
    fields: [
        {
            label: "Titolo",
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
            label: "Informazioni",
            name: "info",
            type: 'array',
            maxRows: 3,
            minRows: 3,
            fields: [
                {
                    label: "Titolo",
                    name: "title",
                    type: 'text',
                    required: true,
                },
                {
                    label: "Testo",
                    name: "text",
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
                    label: "Icona",
                    name: "image",
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                }
            ]
        }
    ],
}