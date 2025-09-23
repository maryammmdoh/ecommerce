"use client"
import React, { useEffect, useState } from "react"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { addAddresses } from "@/AddressActions/addAddress.action"
import { getUserAddresses } from "@/AddressActions/AllAddresses.action"
import { deleteAddress } from "@/AddressActions/deleteAddresses.action"
import Link from 'next/link'
import { AddressDisplayType } from "@/types/address.type"
import { addressSchema, AddressType } from "@/schema/address.schema"
import MySpinner from "../_components/MySpinner/MySpinner"


export default function Address() {

    const [addresses, setAddresses] = useState<AddressDisplayType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<AddressType>({
        defaultValues: {
            name: "",
            details: "",
            phone: "",
            city: "",
        },
        resolver: zodResolver(addressSchema)
    })

    async function allAddresses() {
        try {
            const res = await getUserAddresses()
            setAddresses(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        allAddresses()
    }, [])

    async function handleAddress(values: AddressType) {
        setIsLoading(true)
        try {
            console.log("values:", values)
            const res = await addAddresses(values)
            console.log("res:", res)
            if (res.status === "success") {
                toast.success("Address added successfully", { position: "top-center" })
                form.reset()
                allAddresses()
            } else {
                toast.error("Failed to add address", { position: "top-center" })
            }
        } catch (error) {
            console.error("Add address error:", error)
            // toast.error("Error: " + error, { position: "top-center" })
            toast.error("Error adding address", { position: "top-center" })
        }
        setIsLoading(false)
    }

    async function handleDelete(id: string) {
        try {
            const res = await deleteAddress(id)
            if (res.status === "success") {
                toast.success("Address deleted successfully", { position: "top-center" })
                setAddresses(prev => prev.filter(address => address._id !== id))
            } else {
                toast.error("Failed to delete address", { position: "top-center" })
            }
        } catch (err) {
            toast.error(err instanceof Error ? "Something went wrong" : "Unknown error", { position: "top-center" })
            // toast.error("Something went wrong", { position: "top-center" })

        }
    }
    return (
        <>
            <div className='w-1/2 mx-auto my-20'>
                <h1 className='text-2xl font-bold text-center my-4 dark:bg-slate-500 dark:text-white'>Address</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddress)}>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="details" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Details:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone:</FormLabel>
                                <FormControl>
                                    <Input type='tel' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem>
                                <FormLabel>City:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button disabled={isLoading} type='submit' className='my-4 cursor-pointer'>
                            {isLoading
                                ? <MySpinner />
                                : "Add Address"}
                        </Button>
                    </form>
                </Form>
            </div>
            {/* Display Addresses */}
            <div >
                {(!addresses || addresses.length === 0) ? (
                    <p className="text-center text-red-700">Add your first address to see it here</p>
                ) : (
                    addresses
                        .filter(address => address.name && address.city && address.phone && address.details)
                        .map((address) => (
                            <div key={address._id}>
                                <div className="p-4 border rounded mb-2 w-1/2 mx-auto text-center">
                                    <Link href={`/address/${address._id}`}>
                                    <div className="cursor-pointer">

                                        <p><span className="font-bold">Name:</span> {address.name}</p>
                                        <p><span className="font-bold">City: </span>{address.city}</p>
                                        <p><span className="font-bold">Phone: </span>{address.phone}</p>
                                        <p><span className="font-bold">Details:</span> {address.details}</p>
                                    </div>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(address._id)}
                                    className="cursor-pointer w-1/2 mt-4"
                                >
                                    Delete
                                </Button>
                            </div>
      
                
              </div>
            ))
  )}
        </div >

    </>
  )
}