  // src/app/forgetPassword/page.tsx
  "use client"
  import { Button } from '@/components/ui/button'
  import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
  import { Input } from '@/components/ui/input'
  import { useForm } from "react-hook-form"
  import { toast } from "sonner"
  import { forgotPassword } from "@/ForgetPassAction/forgetPass.action"
  import { zodResolver } from '@hookform/resolvers/zod'
  import { forgotPasswordSchema, ForgotPasswordType } from "@/schema/forgetPass.schema"
  import { useRouter } from "next/navigation"
  import { useState } from 'react'


  export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ForgotPasswordType>({
      defaultValues: { email: "" },
      resolver: zodResolver(forgotPasswordSchema)
    })

    async function handleForgotPassword(values: ForgotPasswordType) {
      setIsLoading(true)
      const res = await forgotPassword(values.email)

      if (!res.error) {
        toast.success("Code sent to your email successfully", { position: "top-center" })
        setIsLoading(false)

        // router.push("/verifyCode")
        router.push(`/verifyCode?email=${encodeURIComponent(values.email)}`);

      } else {
        toast.error("Something went wrong, please try again ❌", { position: "top-center" })
      }
      setIsLoading(false)
    }

    return (
      <div className="w-1/2 mx-auto my-20">
        <h1 className="text-2xl font-bold text-center my-4">Forgot Password</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForgotPassword)}>
            <div className="my-4">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="my-4 cursor-pointer"
            >
              {isLoading ? "Loading..." : "Send Code"}
            </Button>

          </form>
        </Form>
      </div>
    )
  }