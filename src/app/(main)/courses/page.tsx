import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RichText from "@/components/ui/richtext";
import { formatDate } from "@/lib/utils";
import { getCourses } from "@/modules/courses/data";
import { Media, Teacher } from "@/payload-types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-static'
export const revalidate = 600

export function generateMetadata(): Metadata {
  return {
    title: `Corsi | Sirio Next Gen`,
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <section className="pb-32">
      <div className="contained bg-accent/50 rounded-lg p-10">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              I Nostri Corsi
            </h1>
          </div>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {courses.docs.map((course) => {
            const teacher = course.teacher ? (course.teacher as Teacher) : null;
            const hero_image = course.hero_image ? (course.hero_image as Media) : null
            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group flex flex-col border border-border rounded-xl overflow-hidden shadow-md"
              >
                <div className="mb-4 flex text-clip rounded-xl md:mb-5">
                  <div className="transition duration-300 group-hover:scale-105">
                    <Image
                      src={hero_image?.url || "/assets/placeholder.jpg"}
                      alt={hero_image?.alt || ''}
                      height={600}
                      width={800}
                      className="aspect-[3/2] size-full object-cover object-center"
                    />
                  </div>
                </div>
                <section className="p-4 pt-0">
                  {/* <div>
                <Badge>{course.label}</Badge>
              </div> */}
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                    {course.title}
                  </div>
                  <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
                    <RichText content={course.description} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={(teacher?.photo as Media)?.url || "/assets/placeholder.jpg"}
                        alt={teacher?.cognome}
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-px">
                      <span className="text-xs font-medium">
                        {teacher?.nome}{" "}{teacher?.cognome}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(course.start_date)}
                      </span>
                    </div>
                  </div>
                </section>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
