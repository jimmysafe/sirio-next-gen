import { BoldFeature, InlineToolbarFeature, ItalicFeature, lexicalEditor, ParagraphFeature, UnderlineFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const LatestCourses: Block = {
    slug: 'latest-courses',
    interfaceName: 'LatestCoursesBlock',
    labels: {
        plural: 'Corsi',
        singular: 'Corso',
    },
    fields: [
        {
            label: "Titolo",
            defaultValue: "I Nostri Corsi",
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
    ],
}