import { Media } from "@/components/media";
import RichText from "@/components/ui/richtext";
import { ForProfessionalsAndStudentsBlock as ForProfessionalsAndStudentsBlockProps } from "@/payload-types";

export const ForProfessionalsAndStudentsBlock = ({ title, subtitle, info }: ForProfessionalsAndStudentsBlockProps) => {
  return (
    <section className="mt-16">
      <div className="contained flex flex-col gap-28">
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              {title}
            </h2>
            <RichText content={subtitle} className="text-muted-foreground" />
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {info?.map((item) => (
              <div key={item.id} className="flex flex-col bg-accent/50 p-4 rounded-lg">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-secondary">
                  {item.image && typeof item.image === 'object' && (
                    <Media
                      imgClassName="size-5 text-primary-foreground"
                      priority={false}
                      loading="lazy"
                      resource={item.image}
                    />
                  )}
                </div>
                <h3 className="mb-3 mt-2 text-lg font-semibold">{item.title}</h3>
                <RichText content={item.text} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
