import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Media } from "@/payload-types";
import { getCourseBySlug } from "../data";
import { Section } from "@/components/generic/section";

export function CourseGallery(course: Awaited<ReturnType<typeof getCourseBySlug>>) {
    const gallery = course?.gallery || null;
    if (!gallery) return null;
    return (
        <Section>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {gallery.map((image) => (
                        <CarouselItem key={image.id} className="basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden">
                                        <img
                                            src={(image.photo as Media).url || '/assets/placeholder.jpg'}
                                            alt={(image.photo as Media).alt}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselDots />
            </Carousel>
        </Section>
    );
}