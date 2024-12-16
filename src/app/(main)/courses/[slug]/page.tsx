import { ContactSection } from "@/components/generic/contact-section";
import { LivePreviewListener } from "@/components/generic/live-preview";
import { CourseGallery } from "@/modules/courses/components/course-gallery";
import { CourseGoals } from "@/modules/courses/components/course-goals";
import { CourseHero } from "@/modules/courses/components/course-hero";
import { CoursePricing } from "@/modules/courses/components/course-pricing";
import { CourseProgramme } from "@/modules/courses/components/course-programme";
import { CourseTeacher } from "@/modules/courses/components/course-teacher";
import { getCourseBySlug } from "@/modules/courses/data";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from '@payload-config'
import { Metadata } from "next";
import { generateMeta } from "@/lib/generate-meta";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const courses = await payload.find({
    collection: 'courses',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = courses.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CoursePage(props: Args) {
  const { isEnabled: draft } = await draftMode()
  const params = await props.params
  const course = await getCourseBySlug(params.slug || '');

  if (!course) return notFound();
  return <div>
    {draft && <LivePreviewListener />}
    <CourseHero {...course} />
    <CourseTeacher {...course} />
    <CourseGallery {...course} />
    <CourseGoals {...course} />
    <CourseProgramme {...course} />
    <CoursePricing {...course} />
    <ContactSection />
  </div>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const course = await getCourseBySlug(slug);
  return generateMeta({ doc: course })
}






