import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/products.type";
import AddBtn from './../_components/AddBtn/AddBtn';
import WishBtn from './../_components/WishBtn/WishBtn';

export default function SingleProduct({ product } : { product: ProductType }) {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 hover:scale-105 transition-all duration-300">
      <div className="p-2">
        <Card className="gap-2 p-1 dark:hover:shadow-lg dark:hover:shadow-white">
          <div className="flex mt-3 me-3 justify-end">
                <WishBtn id = {product.id} />
                {/* <i className="fas fa-heart text-gray-500 hover:text-red-500"></i> */}
              </div>
          <Link href={`/products/${product.id}`}>
        
            <CardContent>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={100}
                height={100}
                className="w-fit h-40 object-cover rounded content-center items-center mx-auto"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{product.brand.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{product.category.name}</p>
              <p className="line-clamp-1 ">{product.title}</p>
            </CardContent>
            
            <CardFooter>
              <div className="flex justify-between items-center w-full px-1">
                <p className="font-semibold text-sm dark:text-white text-gray-800">
                  {product.price} EGP
                </p>
                <div className="flex items-center gap-1 text-yellow-200 text-sm">
                  <i className="fas fa-star"></i>
                  <span className="text-gray-700 dark:text-white">
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Link>
          <AddBtn id = {product.id} />
        </Card>
      </div>
    </div>
  );
}
