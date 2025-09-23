"use server"
import getMyToken from "@/utilities/getMyToken";
import { CheckOutType } from "@/schema/checkOut.schema";

export default async function cashPayment(cartId:string, formValues:CheckOutType) {
   
    const token=await getMyToken()
    if (!token) {
        throw new Error(" Login first");
    }

    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: {
        token,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({shippingAddress:formValues}),
    });
    const payload=await res.json()    
    return payload
  
}