export const fetchUserOrders = async (userId: string) => {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};
