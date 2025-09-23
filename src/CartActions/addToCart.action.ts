"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function AddToCart (id : string) {
    try {
        const token = await getMyToken();
    if(!token) throw new Error('You are not logged in');
        console.log("TOKEN FROM addToCart action ----->", token)
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'POST',
        headers: {
            token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productId: id})
    });
    const payload = await res.json();
    return payload;
    } catch(err) {
        console.log(err)
        return err
    }
}