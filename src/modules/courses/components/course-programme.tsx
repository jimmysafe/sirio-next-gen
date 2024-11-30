import RichText from "@/components/ui/richtext";
import { getCourseBySlug } from "../data";
import { Section } from "@/components/generic/section";

export function CourseProgramme(course: Awaited<ReturnType<typeof getCourseBySlug>>) {
    return (
        <Section className="giornata-section">
            <article className=" space-y-6">
                <h3 className="mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6">
                    Programma
                </h3>
                <RichText content={course?.programme || {}} />
            </article>
        </Section>
    );
}