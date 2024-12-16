import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    courses: '/courses',
    pages: '',
}

type Props = {
    collection: keyof typeof collectionPrefixMap
    slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
    const path = `${collectionPrefixMap[collection]}/${slug}`

    const params = {
        slug,
        collection,
        path,
    }

    const encodedParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        encodedParams.append(key, value)
    })

    const url = `${process.env.NEXT_PUBLIC_BASE_URL_NAME}/next/preview?${encodedParams.toString()}`

    return url
}
