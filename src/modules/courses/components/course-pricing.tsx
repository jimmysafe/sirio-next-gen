import { ArrowRight, Check, FileIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getCourseBySlug } from "../data";
import { price } from "@/lib/utils";
import { BuyCourseButton } from "@/modules/checkout/components/buy-course-button";
import Link from "next/link";
import { Media } from "@/payload-types";
import { Button } from "@/components/ui/button";

export const CoursePricing = (
  course: Awaited<ReturnType<typeof getCourseBySlug>>
) => {
  if (!course) return null;
  return (
    <section className="py-20">
      <div className="contained">
        <div className="mx-auto rounded-lg bg-muted p-6 md:p-10">
          <div className="mb-12 flex items-center gap-3">
            <span className="text-2xl font-bold">Costo del corso</span>
            {/* <Badge
              variant="outline"
              className="border-green-200 bg-green-100 text-green-600"
            >
              20% off
            </Badge> */}
          </div>
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <h2 className="max-w-screen-sm text-3xl font-bold md:text-4xl">
              {course.callout}
            </h2>
            <div className="md:text-right">
              <span className="text-3xl font-bold md:text-5xl">
                {price(course.price)}
              </span>
              <p className="text-muted-foreground">IVA inclusa</p>
            </div>
          </div>
          <Separator className="my-8" />
          <div>
            <p className="mb-5 text-muted-foreground">
              I benefici del corso sono:
            </p>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
              <ul className="grid gap-x-20 gap-y-4 font-medium md:grid-cols-2">
                {course.benefits.map(benefit => (
                  <li key={benefit.id} className="flex items-center gap-2">
                    <Check className="w-4" />
                    {benefit.text}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                {course.brochure && (
                  <Button asChild variant={'outline'}>
                    <Link href={(course.brochure as Media).url || ''} target="_blank">
                      <FileIcon className="size-4 mr-2" />
                      Visualizza la brochure
                    </Link>
                  </Button>
                )
                }
                <BuyCourseButton courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
