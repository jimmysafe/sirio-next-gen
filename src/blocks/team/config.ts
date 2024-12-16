import { lexicalEditor, ParagraphFeature, BoldFeature, ItalicFeature, UnderlineFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Team: Block = {
    slug: 'team',
    interfaceName: 'TeamBlock',
    labels: {
        plural: 'Il Team',
        singular: 'Il Team',
    },
    fields: [
        {
            label: "Titolo",
            defaultValue: "Il Nostro Team",
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
            labels: {
                singular: 'Membro',
                plural: 'Membri'
            },
            name: "members",
            type: 'array',
            minRows: 2,
            fields: [
                {
                    label: "Nome",
                    name: "name",
                    type: 'text',
                    required: true,
                },
                {
                    label: "Biografia",
                    name: "bio",
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
                    label: "Foto",
                    name: "photo",
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                }
            ]
        }
    ],
}