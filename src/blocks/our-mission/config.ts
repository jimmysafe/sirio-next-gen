import { lexicalEditor, ParagraphFeature, BoldFeature, ItalicFeature, UnderlineFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const OurMission: Block = {
    slug: 'our-mission',
    interfaceName: 'OurMissionBlock',
    labels: {
        plural: 'Le Nostre Missioni',
        singular: 'La Nostra Missione',
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
            label: "Testo",
            name: "missionText",
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
            label: "Immagine",
            name: "image",
            type: 'upload',
            relationTo: 'media',
            required: true,
        }
    ],
}