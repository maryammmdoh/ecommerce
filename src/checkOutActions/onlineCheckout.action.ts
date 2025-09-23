"use server"
import getMyToken from "@/utilities/getMyToken";
import { CheckOutType } from "@/schema/checkOut.schema";

  export default async function onlinePayment(cartId:string, url=process.env.NEXT_URL, formValues:CheckOutType) {
   
     const token=await getMyToken()
    if (!token) {
        throw new Error(" Login first");
    }
    
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
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