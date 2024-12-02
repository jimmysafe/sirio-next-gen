import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getCourseBySlug } from "../data";
import Image from "next/image";
import { BuyCourseButton } from "@/modules/checkout/components/buy-course-button";
import RichText from "@/components/ui/richtext";
import { Media } from "@/payload-types";

export const CourseHero = (
  course: Awaited<ReturnType<typeof getCourseBySlug>>
) => {
  if (!course) return null;
  return (
    <section className="contained">
      <div className="lg:container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="container flex flex-col items-center py-12 text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left">
            <Badge>
              <p>Corso</p>
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {course.title}
            </h1>
            <div className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              <RichText content={course.description} />
            </div>
            <div className="mb-20 flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <BuyCourseButton courseId={course.id} />
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Data di inizio corso:{" "}
              <span className="text-foreground font-bold">
                {formatDate(course.start_date)}
              </span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border border-border px-8 py-6 text-center">
                <p className="mb-2 text-xl font-medium">Giornate</p>
                <div className="mb-4 flex items-baseline justify-center">
                  <div className="text-4xl font-bold lg:text-6xl">
                    {course.days}
                  </div>
                </div>
              </div>
              <div className="rounded border border-border px-8 py-6 text-center">
                <p className="mb-2 text-xl font-medium">Moduli</p>
                <div className="mb-4 flex items-baseline justify-center">
                  <div className="text-4xl font-bold lg:text-6xl">
                    {course.modules}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={(course.hero_image as Media).url || "/assets/placeholder.jpg"}
            alt={(course.hero_image as Media).alt}
            className="size-full object-cover rounded-lg"
            height={800}
            width={600}
          />
        </div>
      </div>
    </section>
  );
};
