"use client";
import { getCourseById } from "@/modules/courses/data";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckoutCustomerInfoSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormFields } from "@/components/ui/form-fields";
import { useServerAction } from "zsa-react";
import { createCheckoutSession } from "../actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CheckoutInfoForm(
  course: Awaited<ReturnType<typeof getCourseById>>
) {
  const { isPending, execute } = useServerAction(createCheckoutSession);
  const form = useForm<z.infer<typeof CheckoutCustomerInfoSchema>>({
    resolver: zodResolver(CheckoutCustomerInfoSchema),
    defaultValues: {
      courseId: course?.id,
    },
  });

  async function onSubmit(data: z.infer<typeof CheckoutCustomerInfoSchema>) {
    if (!course?.id) return toast.error("Errore durante il checkout.");
    return execute({
      items: [
        {
          id: course.id,
          name: course.title,
          // description: course.description,
          price: Number(course.price),
          quantity: 1,
        },
      ],
      metadata: data,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4 items-center">
          <FormFields.Input name="firstName" label="Nome" />
          <FormFields.Input name="lastName" label="Cognome" />
        </div>
        <FormFields.Input name="email" type="email" label="Email" />
        <FormFields.Input name="address" label="Indirizzo" />
        <FormFields.Input name="codiceFiscale" label="Codice Fiscale" />
        <FormFields.Input name="partitaIva" label="Partita IVA" />
        <FormFields.Input name="codiceUnivoco" label="Codice Univoco" />
        <div className="pt-6">
          <Button type="submit" loading={isPending} className="w-full">
            <ArrowRight className="mr-2 size-4" />
            Vai al checkout
          </Button>
        </div>
      </form>
    </Form>
  );
}
