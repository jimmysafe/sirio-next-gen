"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFields } from "@/components/ui/form-fields";
import { useForm } from "react-hook-form";
import { MailIcon } from "lucide-react";

export const ContactSection = () => {
  const form = useForm();
  return (
    <section className="py-32 bg-primary">
      <div className="contained">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex-1 flex flex-col justify-between gap-10">
            <div className="text-center lg:text-left text-primary-foreground">
              <h1 className="mb-3 text-5xl font-semibold">Hai Domande?</h1>
              <p className="max-w-md">
                Siamo disponibili per domande, feedback o opportunità di
                collaborazione. Facci sapere come possiamo aiutarti!
              </p>
            </div>
            <div className="mx-auto w-fit lg:mx-0 text-primary-foreground">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contatti
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Telefono: </span>
                  328 247 0996
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href="" className="underline">
                    info@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Form {...form}>
            <form className="mx-auto flex flex-col gap-2 rounded-lg border p-10 bg-primary-foreground">
              <div className="flex gap-2">
                <FormFields.Input name="firstName" label="Nome" />
                <FormFields.Input name="lastName" label="Cognome" />
              </div>
              <FormFields.Input name="email" type="email" label="Email" />
              <FormFields.TextArea name="message" label="Messaggio" />
              <Button className="w-full">
                <MailIcon className="size-4 mr-2" />
                Invia Messaggio
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
