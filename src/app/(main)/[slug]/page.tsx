import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderHero } from '@/heros/render'
import { notFound } from 'next/navigation'
import { LivePreviewListener } from '@/components/generic/live-preview'
import { RenderBlocks } from '@/blocks/render'
import { generateMeta } from '@/lib/generate-meta'

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = pages.docs
        ?.filter((doc) => {
            return doc.slug !== 'home'
        })
        .map(({ slug }) => {
            return { slug }
        })

    return params
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function Page({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = 'home' } = await paramsPromise

    const page = await queryPageBySlug({
        slug,
    })

    if (!page) return notFound()

    const { hero, layout } = page

    return (
        <article>
            {draft && <LivePreviewListener />}
            <RenderHero {...hero} />
            <RenderBlocks blocks={layout} />
        </article>
    )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug = 'home' } = await params
    const page = await queryPageBySlug({
        slug,
    })

    return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'pages',
        draft,
        limit: 1,
        pagination: false,
        overrideAccess: draft,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})
