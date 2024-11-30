import { ContactSection } from "@/components/generic/contact-section";
import { HomeAbout } from "@/components/generic/home-about";
import { HomeHero3 } from "@/components/generic/home-hero-3";
import { HomeTeam } from "@/components/generic/home-team";
import { CourseCarousel } from "@/modules/courses/components/course-carousel";
import { getCoursesBaseInfo } from "@/modules/courses/data";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

export default function Home() {
    const coursesInfoPromise = getCoursesBaseInfo()
    return (
        <section>
            <HomeHero3 />
            <Suspense fallback={<p>Loading..</p>}>
                <CourseCarousel promise={coursesInfoPromise} />
            </Suspense>
            <HomeAbout />
            <HomeTeam />
            <ContactSection />
        </section>
    )
}