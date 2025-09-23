// src/OrdersAction/getUserOrders.action.ts
"use server"
import getMyToken  from '@/utilities/getMyToken';
export default async function getUserOrders(userId : string) {
    
    const token = await getMyToken();
    if (!token) throw new Error("User not logged in");

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        method: "GET",
        headers: {
            token,
            "Content-Type": "application/json",
        },
    })

    const payload = await res.json();
    return payload;
}

