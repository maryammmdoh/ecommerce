import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty("This field can't be empty").min(2, "Name must be at least 2 characters" ).max(10,  "Name must be at most 10 characters" ),
    email: z.string().nonempty("This field can't be empty"),
    password: z.string().nonempty("This field can't be empty").min(6, "Password must be at least 6 characters" ),
    rePassword: z.string().nonempty("This field can't be empty"),
    // phone: z.string().regex(/^(2|\+2)?01[0251][0-9]{8}$/)
    phone: z.string().regex(/^01[0251][0-9]{8}$/)
}).refine((data) => data.password === data.rePassword,
{
    path: ['rePassword'],
    error : "Passwords don't match"
})

export type RegisterSchemaType = z.infer<typeof registerSchema>;
