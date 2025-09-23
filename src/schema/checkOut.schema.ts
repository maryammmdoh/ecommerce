import z from "zod";

export const checkoutSchema = z.object({

  details: z.string().nonempty("details can't be empty"),

    phone: z.string()
    .nonempty("Phone can't be empty" )
    .regex(/^(010|011|012|015)[0-9]{8}$/,"not valid phone number"),

   city: z.string().nonempty("city can't be empty"),
})

export type CheckOutType = z.infer<typeof checkoutSchema>;