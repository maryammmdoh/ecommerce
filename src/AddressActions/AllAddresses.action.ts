"use server"
import getMyToken from "@/utilities/getMyToken";

export async function getUserAddresses() {
  const token = await getMyToken()
  if (!token) throw new Error("Login first")

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "GET",
    headers: { token },
  })

  return await res.json()
}