"use server"
import  getMyToken  from '@/utilities/getMyToken';
export default async function RemoveItemFromCart(id: string){
    const token = await getMyToken();
    if(!token) throw new Error("Please login first")
    
    const res = await fetch (`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method : "DELETE" ,
        headers : {
            token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productId: id})
    });
    const payload = await res.json();
    return payload;
}