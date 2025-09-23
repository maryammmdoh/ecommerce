import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty("This field can't be empty"),
    password: z.string().nonempty("This field can't be empty").min(6, "Password must be at least 6 characters" ),
})

export type LoginSchemaType = z.infer<typeof loginSchema>;
