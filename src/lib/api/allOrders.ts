// src/lib/api/allOrders.ts
export const getAllOrders = async () => {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  const data = await res.json();
  return data;
};
