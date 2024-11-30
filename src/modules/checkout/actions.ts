"use server";


import Stripe from "stripe";
import { redirect } from "next/navigation";
import { CreateCheckoutSchema } from "./schema";
import { publicAction } from "@/lib/safe-action";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export const createCheckoutSession = publicAction
    .createServerAction()
    .input(CreateCheckoutSchema)
    .handler(async ({ input }) => {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            locale: "it",
            line_items: input.items.map((item) => ({
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            customer_email: input.metadata.email,
            mode: "payment",
            ui_mode: "embedded",
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL_NAME}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
            metadata: input.metadata,
            payment_intent_data: {
                metadata: input.metadata,
            },
        });

        redirect(`/checkout?k=${session.client_secret}`);
    })

export async function getCheckoutSession(checkoutSessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
    return session;
}
