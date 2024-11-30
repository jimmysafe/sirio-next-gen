"use client";
import { Badge } from "@/components/ui/badge";
import { getCourseBySlug } from "../data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Media, Teacher, Tutor } from "@/payload-types";
import RichText from "@/components/ui/richtext";

export const CourseTeacher = (
  course: Awaited<ReturnType<typeof getCourseBySlug>>
) => {
  if (!course) return null;
  const teacher = course.teacher as Teacher;
  const tutors = (course.tutors || []) as Tutor[];
  return (
    <section className="py-12">
      <div className="contained">
        <Card className="lg:py-20 py-12 px-4 bg-accent/50 border-0">
          <div className="mx-auto grid max-w-screen-lg gap-20 lg:grid-cols-2">
            <div>
              <Badge variant="default" className="mb-4">
                Insegnante
              </Badge>
              <h1 className="mb-8 text-3xl font-medium lg:text-5xl">
                {teacher.nome}{' '}{teacher.cognome}
              </h1>
              <div className="max-w-3xl text-muted-foreground lg:text-xl">
                <RichText content={teacher.description} />
              </div>
              {tutors?.length > 0 && (
                <div className="lg:block hidden">
                  <Tutors tutors={tutors} />
                </div>
              )}
            </div>
            <div>
              <div>
                <Image
                  src={(teacher.photo as Media).url || "/images/placeholder.jpg"}
                  alt={(teacher.photo as Media).alt}
                  className="max-h-96 w-full object-cover lg:max-h-none rounded-md"
                  height={500}
                  width={500}
                />
              </div>
              {tutors?.length > 0 && (
                <div className="lg:hidden block">
                  <Tutors tutors={tutors} />
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

function Tutors({ tutors }: { tutors: Tutor[] }) {
  return (
    <section className="space-y-6 mt-12">
      <p className="mb-2 text-xl font-medium">Assistenti</p>
      <div className="container mt-16 flex gap-4 flex-wrap">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="flex flex-col items-center">
            <Avatar className="mb-2 size-20 border lg:size-24 rounded-md">
              <AvatarImage src={"/assets/placeholder.jpg"} />
              <AvatarFallback>{tutor.nome}{' '}{tutor.cognome}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium text-xs lg:max-w-24 max-w-20">
              {tutor.nome}{' '}{tutor.cognome}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
