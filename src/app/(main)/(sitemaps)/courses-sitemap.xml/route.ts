import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getCoursesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_BASE_URL_NAME ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'http://localhost:3000'

    const results = await payload.find({
      collection: 'courses',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })


    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/courses`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
        .filter((course) => Boolean(course?.slug))
        .map((course) => {
          return {
            loc: `${SITE_URL}/courses/${course?.slug}`,
            lastmod: course.updatedAt || dateFallback,
          }
        })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['courses-sitemap'],
  {
    tags: ['courses-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getCoursesSitemap()

  return getServerSideSitemap(sitemap)
}