import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichText from "@/components/ui/richtext";
import { formatDate, price } from "@/lib/utils";
import { CheckoutInfoForm } from "@/modules/checkout/components/checkout-info-form";
import { getCourseById } from "@/modules/courses/data";
import { Media, Teacher } from "@/payload-types";
import { notFound } from "next/navigation";

export default async function BuyCoursePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  if (!params.id) return notFound();

  const course = await getCourseById(Number(params.id));
  if (!course) return notFound();

  const teacher = course.teacher ? course.teacher as Teacher : null;

  return (
    <div className="">
      <div className="py-20 space-y-6 bg-accent/50 rounded-lg contained">
        <div className="contained">
          <h1 className="text-3xl font-semibold max-w-2xl mx-auto mb-6">
            Acquista il corso
          </h1>
          <div className="max-w-2xl mx-auto flex flex-col border border-border rounded-xl overflow-hidden shadow-md bg-card">
            <section className="p-4 pt-0">
              {/* <div>
                <Badge>{course.label}</Badge>
              </div> */}
              <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                {course.title}
              </div>
              <div className="mb-4 text-sm text-muted-foreground md:mb-5 md:text-base">
                <RichText content={course.description} />
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarImage
                    src={(teacher?.photo as Media).url || "/assets/placeholder.jpg"}
                    alt={(teacher?.photo as Media).alt}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <section className="flex justify-between items-end w-full">
                  <div className="flex flex-col gap-px">
                    <span className="text-xs font-medium">
                      {teacher?.nome} {teacher?.cognome}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(course.start_date)}
                    </span>
                  </div>
                  <p className="text-xl font-semibold">{price(course.price)}</p>
                </section>
              </div>
            </section>
          </div>
        </div>
        <div className="contained">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Le tue informazioni</CardTitle>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Prima di procedere al pagamento, avremmo bisogno di alcune tue
                  informazioni necessarie per la fatturazione.
                </p>
                <p>
                  Compila il modulo sottostante e vai al checkout per completare
                  l&apos;acquisto.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <CheckoutInfoForm {...course} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
