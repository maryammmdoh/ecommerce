"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from '@/schema/register.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import  MySpinner  from '@/app/_components/MySpinner/MySpinner';


export default function Register() {
  const router = useRouter()

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema) 
  });

  async function handleRegister(values : RegisterSchemaType) {
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      if (res.data.message === "success") {
        toast.success("You registered successfully" , {position: "top-center" ,duration: 3000} )
        router.push("/login")
      }
      
    }
    catch (err : unknown) {
      if (err instanceof Error) {
        // toast.error(err.message , {position: "top-center" ,duration: 3000} )
        toast.error("Registration Failed" , {position: "top-center" ,duration: 3000} )
      } else {
        toast.error("Unknown error occurred" , {position: "top-center" ,duration: 3000} )
      }
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-20">
      <h1 className="text-3xl text-center font-bold my-4">Register Now</h1>
        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleRegister)}>
            <div className="mb-4">
              <FormField
              control={form.control}
              name="name"
              // field is destructured from the render prop containing input props and ref and methods for registering the input
              render={({field}) => (
                <FormItem>
                  <FormLabel>Username:  </FormLabel>
                  <FormControl>
                    <Input  {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="mb-4">
              <FormField
              control={form.control}
              name="email"
              // field is destructured from the render prop containing input props and ref and methods for registering the input
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email:  </FormLabel>
                  <FormControl>
                    <Input type="email" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="mb-4">
            <FormField
              control={form.control}
              name="password"
              // field is destructured from the render prop containing input props and ref and methods for registering the input
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password:  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="mb-4">
            <FormField
              control={form.control}
              name="rePassword"
              // field is destructured from the render prop containing input props and ref and methods for registering the input
              render={({field}) => (
                <FormItem>
                  <FormLabel>RePassword:  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>
            <div className="mb-4">

            <FormField
              control={form.control}
              name="phone"
              // field is destructured from the render prop containing input props and ref and methods for registering the input
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phone:  </FormLabel>
                  <FormControl>
                    <Input type="tel" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <Button className="w-full p-5" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <MySpinner /> : "Submit"}
            </Button>
          </form>
          
        </Form>
      </div>
    </>
  );
}
