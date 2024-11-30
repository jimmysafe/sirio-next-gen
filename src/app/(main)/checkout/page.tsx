"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { notFound } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage(props: any) {
  const clientSecret = props.searchParams.k;
  if (!clientSecret) return notFound();

  return (
    <section className="py-20 bg-primary">
      <div>
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout className="embed-checkout" />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </section>
  );
}
