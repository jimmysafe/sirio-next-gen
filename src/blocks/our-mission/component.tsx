import { Media } from "@/components/media";
import RichText from "@/components/ui/richtext";
import { OurMissionBlock as OurMissionBlockProps } from "@/payload-types";

export function OurMissionBlock({ title, subtitle, missionText, image }: OurMissionBlockProps) {
    return (
        <section>
            <div className="contained flex flex-col gap-28">
                <div className="flex flex-col gap-7">
                    <h1 className="text-4xl font-semibold lg:text-7xl">
                        {title}
                    </h1>
                    <RichText content={subtitle} className="ml-0 max-w-3xl text-lg" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {image && typeof image === 'object' && (
                        <Media
                            imgClassName="size-full max-h-96 rounded-2xl object-cover" priority={false}
                            loading="lazy"
                            resource={image}
                        />
                    )}
                    <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
                        <p className="text-sm text-muted-foreground">LA NOSTRA MISSIONE</p>
                        <RichText content={missionText} className="text-lg font-medium" />
                    </div>
                </div>
            </div>
        </section>
    )
}