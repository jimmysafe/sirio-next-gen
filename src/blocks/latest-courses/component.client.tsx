"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { use, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Media } from "@/payload-types";
import RichText from "@/components/ui/richtext";
import { getCoursesBaseInfo } from "@/modules/courses/data";
import { Skeleton } from "@/components/ui/skeleton";


export const LatestCoursesBlockClient = (props: {
    promise: ReturnType<typeof getCoursesBaseInfo>;
}) => {
    const courses = use(props.promise);
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    useEffect(() => {
        if (!carouselApi) {
            return;
        }
        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
        };
        updateSelection();
        carouselApi.on("select", updateSelection);
        return () => {
            carouselApi.off("select", updateSelection);
        };
    }, [carouselApi]);

    return (
        <>
            {/* Buttons */}
            <div className="contained hidden shrink-0 gap-2 md:flex justify-end -mt-10">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        carouselApi?.scrollPrev();
                    }}
                    disabled={!canScrollPrev}
                    className="disabled:pointer-events-auto"
                >
                    <ArrowLeft className="size-5" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        carouselApi?.scrollNext();
                    }}
                    disabled={!canScrollNext}
                    className="disabled:pointer-events-auto"
                >
                    <ArrowRight className="size-5" />
                </Button>
            </div>
            {/* Carousel */}
            <div className="w-full">
                <Carousel
                    setApi={setCarouselApi}
                    opts={{
                        breakpoints: {
                            "(max-width: 768px)": {
                                dragFree: true,
                            },
                        },
                    }}
                >
                    <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
                        {courses.docs.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
                            >
                                <Link
                                    href={`/courses/${item.slug}`}
                                    className="group rounded-xl"
                                >
                                    <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl bg-red-200 md:aspect-[5/4] lg:aspect-[16/9]">
                                        <Image
                                            src={(item.hero_image as Media)?.url || '/assets/placeholder.jpg'}
                                            alt={(item.hero_image as Media)?.alt}
                                            height={800}
                                            width={600}
                                            className="absolute size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--foreground)/0.2),hsl(var(--foreground)/0.8)_100%)] mix-blend-multiply" />
                                        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                                            <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                                                {item.title}
                                            </div>
                                            <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                                                <RichText content={item.description} />
                                            </div>
                                            <div className="flex items-center text-sm">
                                                Scopri di più{" "}
                                                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>

    );
};


export function LatestCoursesBlockClientSkeleton() {
    return (
        <div className="w-full">
            <Carousel
                opts={{
                    breakpoints: {
                        "(max-width: 768px)": {
                            dragFree: true,
                        },
                    },
                }}
            >
                <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
                    {Array.from({ length: 4 }, (_, i) => i).map((item) => (
                        <CarouselItem
                            key={item}
                            className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
                        >
                            <Skeleton className="h-[432px]" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

    )
}