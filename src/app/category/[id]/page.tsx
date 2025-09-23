import React from "react";
import { ProductType } from "@/types/products.type";
import SingleProduct from "@/app/singleProduct/singleProduct";
import BackArrow from '@/app/_components/backArrow/backarrow';

async function getProductsByCategory(id: string) {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
    );
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
}

export default async function CategoryDetails({
    params,
}: {
    params: { id: string };
}) {
    const data = await getProductsByCategory(params.id);
    console.log(data);
    // if (!data || !data.data || data.data.length === 0) return notFound();

    return (
        <>
            {/* <Button className="text-start w-full bg-purple-400 text-white hover:bg-purple-500 hover:text-white">
                            {" "}
                            <Link href="/category"> Return to Categories page </Link>{" "}
                        </Button> */}
            <BackArrow href="/category" label="Return to category page" />
            {data?.length > 0 ? (
                <>
                    <div className="flex flex-wrap gap-4 mt-15 mb-15 w-[90%] mx-auto ">

                        <div className="flex flex-wrap justify-center">
                            <h1 className="w-full text-center text-2xl mb-4 font-bold">
                                Products in Category {data[0].category.name}
                            </h1>
                            {data?.map((product: ProductType) => (
                                <SingleProduct key={product.id} product={product} />
                            ))}
                        </div>

                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4 mt-15 mb-15 w-[90%] ms-5">
                    {/* <Button className=" bg-purple-400 text-white hover:bg-purple-500 hover:text-white">
                        {" "}
                        <Link href="/category"> Return to Categories page </Link>{" "}
                    </Button> */}
                    {/* <BackArrow href="/category" label="Return to category page" /> */}
                    <h1 className="w-full text-center text-2xl font-bold mx-auto text-red-500 justify-center">
                        No Products in this Category
                    </h1>

                </div>
            )}
        </>
    );
}
