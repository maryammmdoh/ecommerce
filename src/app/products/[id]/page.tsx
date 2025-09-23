import selectedsProduct from "@/lib/api/selectedProduct";
import React from "react";
import Details from "@/app/_components/details/details";
import getRelatedProducts from "@/ProductsCategoryActions/relatedProducts.action";
import { ProductType } from "@/types/products.type";
import SingleProduct from '@/app/singleProduct/singleProduct';
import BackArrow from "@/app/_components/backArrow/backarrow";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await selectedsProduct(id);

  if (!data) {
    return <div className="text-center text-red-500 mt-8">Products not found.</div>;
  }

  const RelatedProducts = await getRelatedProducts(data.category._id);
  console.log(RelatedProducts); 
  return (
    <>
      <BackArrow href="/products" label="Return to Products page" />

      <Details data={data} />

      <div className='flex flex-wrap gap-12 w-[90%] mx-auto justify-center rounded-lg'>
        
          {RelatedProducts.map((currentProduct: ProductType) => (
            <SingleProduct key={currentProduct.id} product={currentProduct} />
          ))}
        
      </div>
    </>
  );
}
