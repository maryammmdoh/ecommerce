"use client"
import React, { useRef, useState } from "react"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { useParams} from "next/navigation"

import { CheckOutType } from '@/schema/checkOut.schema'
import { addressSchema, AddressType } from '@/schema/address.schema'
import AddressList, { AddressListHandle } from '@/app/_components/AddressList/AddressList'
import onlinePayment from '@/checkOutActions/onlineCheckout.action'
import cashPayment from '@/checkOutActions/CashCheckout.action'
import { addAddresses } from "@/AddressActions/addAddress.action"
import MySpinner from '@/app/_components/MySpinner/MySpinner'

export default function CheckOut() {
  const params = useParams()
  const id = params?.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online")
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [openModal, setOpenModal] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const addressRef = useRef<AddressListHandle>(null)


  const addressForm = useForm<AddressType>({
    defaultValues: {
      // name: "",
      phone: "",
      city: "",
      details: "",
    },
    resolver: zodResolver(addressSchema),
  })

  const button = () => paymentMethod === "online" ? "Pay Online" : "Pay Cash"

  const handleCheckOut = async (values?: CheckOutType | React.MouseEvent): Promise<void> => {
    // normalize input: when used as an onClick handler it may receive a MouseEvent,
    // otherwise it should receive a CheckOutType object
    const payload: CheckOutType = (values && typeof values === "object" && "details" in (values as CheckOutType)) ? (values as CheckOutType) : ({} as CheckOutType)

    if (!selectedAddress) {
      toast.error("Please select an address before checkout", { position: "top-center" })
      return
    }
    setIsLoading(true)

    let res;
    if (paymentMethod === "online") {
      res = await onlinePayment(id, "", payload)
      console.log("res:", res)
      if (res.status === "success") {
        window.location.href = res.session.url
      }
    } else {
      res = await cashPayment(id, payload)
      if (res.status === "success") {
        toast.success("Cash order created successfully", { position: "top-center" })
        // router.push("/allorders")
      }
    }

    if (res?.status !== "success") {
      toast.error("Payment failed, please try again", { position: "top-center" })
    }

    setIsLoading(false)
  }

  async function handleAddAddress(values: AddressType) {
    setIsAdding(true)
    try {
      const res = await addAddresses({ ...values, name: values.name !== "" ? values.name : "default" })
      console.log("res:", res)
      if (res.status === "success") {
        toast.success("Address added successfully", { position: "top-center" })
        addressForm.reset()
        setOpenModal(false)
        addressRef.current?.refresh()
      } else {
        toast.error("Failed to add address", { position: "top-center" })
      }
    } catch (err) {
      toast.error(err instanceof Error ?  "Error adding address" : "Unknown error", { position: "top-center" })
    }
    setIsAdding(false)
  }

  return (
    <>
      <div className='w-1/2 mx-auto my-20'>
        <h1 className='text-2xl font-bold text-center my-4'>CheckOut Now</h1>

        {/* Add Address Button */}
        <div className="text-right mb-4">
          <Button variant="outline" onClick={() => setOpenModal(true)}>+ Add Address</Button>
        </div>

        {/* Address List */}
        <AddressList
          ref={addressRef}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        <div className="my-4 flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            Online
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash
          </label>
        </div>

        
        {/* Pay Button */}
        <Button
          disabled={isLoading || !selectedAddress}
          onClick={handleCheckOut}
          className="my-4 cursor-pointer w-full"
        >
          {isLoading ? <MySpinner /> : button()}
        </Button>
      </div>

      {/* Modal for Adding Address */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <Form {...addressForm}>

              <form className="space-y-4">
                <FormField name="name" control={addressForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input className="text-black dark:text-white" type="text" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="phone" control={addressForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input className="text-black dark:text-white" required type="tel" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="city" control={addressForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input className="text-black dark:text-white" required {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="details" control={addressForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input className="text-black dark:text-white" required {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="ghost" onClick={() => setOpenModal(false)}>Cancel</Button>
                  <Button
                    type="button"
                    onClick={async () => {
                      await handleAddAddress(addressForm.getValues());
                      addressRef.current?.refresh();
                    }}
                    disabled={isAdding}
                  >
                    {isAdding ? <MySpinner /> : "Add"}
                  </Button>
                  {/* <Button
                    type="button"
                    onClick={addressForm.handleSubmit(handleAddAddress)}
                    disabled={isAdding}
                  >
                    {isAdding ? <MySpinner /> : "Add"}
                  </Button> */}
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  )
}
