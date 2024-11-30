import RichText from "@/components/ui/richtext";
import { getCourseBySlug } from "../data";

export function CourseGoals(course: Awaited<ReturnType<typeof getCourseBySlug>>) {
    return (
        <section>
            <div className="max-w-full overflow-hidden border-y border-border bg-muted pt-10 md:pt-16 lg:pt-20">
                <div className="contained relative flex flex-col md:flex-row md:space-x-12">
                    <div className="mb-72 md:mb-28 md:w-2/3 lg:shrink-0 xl:mb-20 xl:w-1/2">
                        <h3 className="mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6">
                            Obiettivi del corso
                        </h3>
                        <div className="mb-8 text-muted-foreground">
                            <RichText content={course?.goals || {}} />
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-1/2 mr-6 h-min w-[110%] max-w-md translate-x-1/2 md:-right-36 md:mr-0 md:w-3/4 md:max-w-xl md:translate-x-0 lg:mt-auto xl:relative xl:right-0 xl:size-full xl:max-w-full">
                        <div className="relative aspect-[8/5] size-full min-h-64">
                            <div className="absolute right-0 top-0 z-40 flex aspect-[3/5] w-3/5 -translate-x-[24%] translate-y-[24%] -rotate-[30deg] justify-center text-clip rounded-3xl bg-background shadow-lg shadow-foreground/20 md:max-xl:-translate-x-[8%] md:max-xl:translate-y-[16%]"></div>
                            <div className="absolute right-0 top-0 z-40 flex aspect-[3/5] w-3/5 -translate-x-[16%] translate-y-[8%] -rotate-[15deg] justify-center text-clip rounded-3xl bg-background shadow-xl shadow-foreground/20 md:max-xl:-translate-x-[6%] md:max-xl:translate-y-[6%]"></div>
                            <div className="absolute right-0 top-0 z-40 flex aspect-[3/5] w-3/5 items-center justify-center text-clip rounded-3xl bg-background shadow-2xl shadow-foreground/20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}