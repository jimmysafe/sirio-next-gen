import Stripe from "stripe";
import { buffer } from "node:stream/consumers";
import { CheckoutCustomerInfoSchema } from "@/modules/checkout/schema";
import { apiClient } from "@/lib/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    // @ts-expect-error
    const rawBody = await buffer(request.body);
    const sig = request.headers.get("stripe-signature");

    if (!sig) throw new Error("No signature provided");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-06-20",
    });

    const event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "payment_intent.succeeded") {
        try {
            const paymentIntent = event.data.object;
            console.log(paymentIntent.metadata);
            const result = CheckoutCustomerInfoSchema.safeParse(
                paymentIntent.metadata
            );
            if (!result.success) throw new Error("Invalid Metadata");

            const metadata = result.data;

            const client = await apiClient()

            await client.create({
                collection: 'course-subscriptions',
                data: {
                    nome: metadata.firstName,
                    cognome: metadata.lastName,
                    course: metadata.courseId,
                    email: metadata.email,
                    codiceFiscale: metadata.codiceFiscale,
                    partitaIva: metadata.partitaIva,
                    codiceUnivoco: metadata.codiceUnivoco,
                    paymentId: paymentIntent.id,
                }
            })


            return new Response(null, {
                status: 200,
            });
        } catch (e) {
            console.error(e);
            return new Response(null, {
                status: 400,
            });
        }
    }

    return new Response(null, {
        status: 200,
    });
}
