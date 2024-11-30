import { z } from "zod";

export const CheckoutItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    description: z.string().optional(),
});

export const CheckoutCustomerInfoSchema = z.object({
    courseId: z.number().min(1),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    address: z.string(),
    codiceFiscale: z.string(),
    partitaIva: z.string(),
    codiceUnivoco: z.string(),
});

export const CreateCheckoutSchema = z.object({
    items: z.array(CheckoutItemSchema),
    metadata: CheckoutCustomerInfoSchema,
});
