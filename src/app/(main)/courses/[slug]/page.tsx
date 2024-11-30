import { ContactSection } from "@/components/generic/contact-section";
import { CourseGallery } from "@/modules/courses/components/course-gallery";
import { CourseGoals } from "@/modules/courses/components/course-goals";
import { CourseHero } from "@/modules/courses/components/course-hero";
import { CoursePricing } from "@/modules/courses/components/course-pricing";
import { CourseProgramme } from "@/modules/courses/components/course-programme";
import { CourseTeacher } from "@/modules/courses/components/course-teacher";
import { getCourseBySlug } from "@/modules/courses/data";
import { notFound } from "next/navigation";

export default async function CoursePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params
  const course = await getCourseBySlug(params.slug);
  if (!course) return notFound();
  return <div>
    <CourseHero {...course} />
    <CourseTeacher {...course} />
    <CourseGallery {...course} />
    <CourseGoals {...course} />
    <CourseProgramme {...course} />
    <CoursePricing {...course} />
    <ContactSection />
  </div>
}





