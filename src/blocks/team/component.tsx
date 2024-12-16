import { Media } from "@/components/media";
import RichText from "@/components/ui/richtext";
import type { TeamBlock as TeamBlockProps } from "@/payload-types";

export const TeamBlock = ({ title, subtitle, members }: TeamBlockProps) => {
    return (
        <section className="py-32">
            <div className="contained flex flex-col items-start text-left">
                <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
                    {title}
                </h2>
                <RichText content={subtitle} className="ml-0 mb-8 max-w-4xl text-muted-foreground lg:text-xl" />
            </div>
            <div className="contained mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
                {members?.map((person) => (
                    <div key={person.id} className="flex flex-col sm:flex-row">
                        {person.photo && typeof person.photo === 'object' && (
                            <Media
                                imgClassName="object-cover mb-4 rounded-md aspect-square w-full shrink-0 text-clip bg-accent sm:mb-0 sm:mr-5 sm:size-48"
                                priority={false}
                                loading="lazy"
                                resource={person.photo}
                            />
                        )}
                        <div className="flex flex-1 flex-col items-start">
                            <p className="w-full text-left font-medium">{person.name}</p>
                            <RichText content={person.bio} className="w-full py-2 text-sm text-muted-foreground" />
                            {/* <div className="my-2 flex items-start gap-4">
                                <a href="#">
                                    <Linkedin className="size-4 text-primary" />
                                </a>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
