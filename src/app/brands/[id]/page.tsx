// src/app/brands/[id]/page.tsx
import React from "react";
import { ProductType } from "@/types/products.type";
import { notFound } from "next/navigation";
import SingleProduct from "@/app/singleProduct/singleProduct";
import BackArrow from "@/app/_components/backArrow/backarrow";

async function getBrandById(id: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
}

async function getAllProducts(): Promise<ProductType[]> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    if (!res.ok) return [];
    const { data } = await res.json();
    return data;
}


export default async function BrandsDetails({ params }: { params: { id: string }; }) {

    const brand = await getBrandById(params.id);
    if (!brand) return notFound();

    const allProducts = await getAllProducts();
    const brandProducts = allProducts.filter(
        (product) => product.brand?._id === params.id
    );

    return (
        <div className="mt-15 mb-15 w-[90%] mx-auto">
            {/* <Button className="text-start w-full bg-purple-400 text-white hover:bg-purple-500 hover:text-white">
                <Link href="/brands">Return to Brands page</Link>
            </Button> */}
            <BackArrow href="/brands" label="Return to brands page" />

            {brandProducts.length > 0 ? (
                <div className="flex flex-wrap gap-4 mb-20 w-[90%] mx-auto ">
                    <h1 className="w-full text-center text-2xl font-bold mt-5">
                        Products by Brand: {brand.name}
                    </h1>
                    <div className="flex flex-wrap gap-12 mt-8 justify-center">
                        {brandProducts.map((product) => (
                            <SingleProduct key={product.id} product={product} />
                        ))}
                    </div>
                </div>

            ) : (

                <div className="flex flex-col gap-4 mt-15 mb-15 w-[90%] ms-5">
                    
                    <h1 className="w-full text-center text-2xl font-bold mx-auto text-red-500 justify-center">
                        No products found for this brand.
                    </h1>

                </div>
            )}
        </div>
    );
}
