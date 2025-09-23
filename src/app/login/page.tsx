"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { LoginSchemaType, loginSchema } from '@/schema/login.schema';
import {signIn} from "next-auth/react";
import  MySpinner  from '@/app/_components/MySpinner/MySpinner';


export default function Login() {
  const router = useRouter()


  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema) 
  });

  async function handleLogin(values : LoginSchemaType) {
    console.log(values); // values contain the email and password entered by the user in the form

    // we will use nextauth signIn method to login the user
    // it takes two arguments the first is the name of the provider we are using in our case "Credentials"
    // the second is an object containing the credentials entered by the user and a callbackUrl to redirect the user after successful login
    const res = await signIn ("credentials" , {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/" // redirect to the home page after successful login
    });

    console.log(res);

    try {
      if (res?.ok) {
      toast.success("You logedIn successfully ❤️", { position: "top-center", duration: 3000 });
      router.push("/"); // redirect to the home page after successful login
      } 
      else {
        toast.error(res?.error ?? "Login Failed", { position: "top-center", duration: 3000 });
      }
    } catch (error) {
      toast.error(error instanceof Error ? "Invalid credentials, please try again ❌" : "Unknown error", { position: "top-center", duration: 3000 });
    }

    
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-20">
      <h1 className="text-3xl text-center font-bold my-4">Login Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
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
            <div className="mb-4 text-left">
              <a href="/register" className="text-sm text-blue-500 hover:underline">Do not have an account? Register</a>
            </div>
            <div className="mb-4 text-right">
            <a href="/forgetPassword" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
            <Button className="w-full p-5" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <MySpinner /> Logging in...
              </span>
              ) : (
              "Login"
              )}
            </Button>
          </form>
          
        </Form>
      </div>
    </>
  );
}
