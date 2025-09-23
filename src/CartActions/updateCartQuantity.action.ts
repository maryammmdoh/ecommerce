"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function UpdateCartQuentity (id : string, count : string) {
    const token = await getMyToken();
    if(!token) throw new Error('You are not logged in');

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: 'PUT',
        headers: {
            token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({count})
    });
    const payload = await res.json();
    return payload;
}

