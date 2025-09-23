"use server"


export default async function relatedProducts(categoryId: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
    if (!res.ok) return [];
    const { data } = await res.json();
    return data;
}
