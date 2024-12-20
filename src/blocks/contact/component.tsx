"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFields } from "@/components/ui/form-fields";
import { useForm } from "react-hook-form";
import { Mail, MailIcon, Phone } from "lucide-react";
import { ContactBlock as ContactBlockProps } from "@/payload-types";
import RichText from "@/components/ui/richtext";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const ContactBlock = (props: ContactBlockProps) => {
    if (props.type === 'small') {
        return <ContactFormSmall {...props} />
    }
    return <ContactFormLarge {...props} />
};

function ContactFormSmall(props: ContactBlockProps) {
    const form = useForm();

    const { email, phone, subtitle, title } = props
    return (
        <section className="py-32 bg-primary">
            <div className="contained">
                <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                    <div className="mx-auto flex-1 flex flex-col justify-between gap-10">
                        <div className="text-center lg:text-left text-primary-foreground">
                            <h1 className="mb-3 text-5xl font-semibold">{title}</h1>
                            <RichText content={subtitle} className="ml-0 max-w-md" />
                        </div>
                        <div className="mx-auto w-fit lg:mx-0 text-primary-foreground">
                            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                                Contatti
                            </h3>
                            <ul className="ml-4 list-disc">
                                <li>
                                    <span className="font-bold">Telefono: </span>
                                    {phone}
                                </li>
                                <li>
                                    <span className="font-bold">Email: </span>
                                    <a href="" className="underline">
                                        {email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Form {...form}>
                        <ContactForm />
                    </Form>
                </div>
            </div>
        </section>
    )
}
function ContactFormLarge(props: ContactBlockProps) {
    const form = useForm();

    return (
        <div className="contained flex flex-col items-center my-20">
            <div className="w-full text-clip rounded-lg bg-accent/50 2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))]">
                <section className="py-16">
                    <div className="container">
                        <div className="mb-14">
                            <span className="text-sm font-semibold text-primary">Contattaci</span>
                            <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">
                                {props.title}
                            </h1>
                            <RichText content={props.subtitle} className="text-lg text-muted-foreground" />
                        </div>
                        <div className="grid gap-10 md:grid-cols-2">
                            <div className="grid gap-10 sm:grid-cols-2">
                                <div>
                                    <Mail className="mb-3 h-6 w-auto" />
                                    <p className="mb-2 text-lg font-semibold">Email</p>
                                    <p className="mb-3 text-muted-foreground">
                                        Il nostro team è disponibile dal lunedì al venerdì, dalle 9 alle 17.
                                    </p>
                                    <a href="#" className="font-semibold hover:underline">
                                        {props.email}
                                    </a>
                                </div>
                                <div>
                                    <Phone className="mb-3 h-6 w-auto" />
                                    <p className="mb-2 text-lg font-semibold">Chiamaci</p>
                                    <p className="mb-3 text-muted-foreground">
                                        Il nostro team è disponibile dal lunedì al venerdì, dalle 9 alle 17.
                                    </p>
                                    <a href="#" className="font-semibold hover:underline">
                                        {props.phone}
                                    </a>
                                </div>
                            </div>
                            <Form {...form}>
                                <ContactForm />
                            </Form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}


function ContactForm({ className, ...props }: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
    return (
        <form className={cn("mx-auto flex flex-col gap-2 rounded-lg border p-10 bg-background", className)} {...props}>
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
    )
}