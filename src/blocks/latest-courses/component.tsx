import { getCoursesBaseInfo } from "@/modules/courses/data";
import { LatestCoursesBlock as LatestCoursesBlockProps } from "@/payload-types";
import { LatestCoursesBlockClient, LatestCoursesBlockClientSkeleton } from "./component.client";
import { Suspense } from "react";
import RichText from "@/components/ui/richtext";

export async function LatestCoursesBlock({ title, subtitle }: LatestCoursesBlockProps) {
    const promise = getCoursesBaseInfo();
    return (
        <section className="pb-32 pt-16">
            <div className="contained">
                <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
                    <div>
                        <h2 className="text-pretty text-4xl font-bold lg:text-6xl">
                            {title}
                        </h2>
                        <RichText content={subtitle} className="mt-8 max-w-4xl text-muted-foreground lg:text-xl" />
                    </div>
                </div>
            </div>
            <Suspense fallback={<LatestCoursesBlockClientSkeleton />}>
                <LatestCoursesBlockClient promise={promise} />
            </Suspense>
        </section >
    );
};
