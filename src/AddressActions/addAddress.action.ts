"use server"
import { AddressType } from "@/schema/address.schema"
import getMyToken from "@/utilities/getMyToken"

export async function addAddresses(values: AddressType) {
  const token = await getMyToken()
  if (!token) throw new Error("Login first")

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
            method: "POST",
             headers: {
        token,
        "Content-Type": "application/json",
        },
                body: JSON.stringify(values),

  })

 
  const payload = await res.json()
  return payload
}