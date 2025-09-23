"use server"
import getMyToken from "@/utilities/getMyToken";
export async function deleteAddress(addressId: string) {
  const token = await getMyToken()
  if (!token) throw new Error("Login first")

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  )

  return await res.json()
}