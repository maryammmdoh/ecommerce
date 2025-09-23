import { ProductType } from "@/types/products.type";
import React from "react";
import AddBtn from "../AddBtn/AddBtn";
import WishBtn from './../WishBtn/WishBtn';
import Image from "next/image";

export default function Details({ data }: { data: ProductType }) {
  return (
    <div className="container w-[80%] p-4 mt-20 mx-auto flex gap-4">
      <div className="w-1/4">
        <div className="p-4">
          <Image src={data.imageCover} alt={data.title} className="w-full" />
        </div>
      </div>
      <div className="w-3/4"> 
        <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
              <h1 className="text-2xl font-bold my-4">{data.title}</h1>
              <p>{data.description}</p>
              <p className="text-emerald-700 mt-2">{data.category.name}</p>
            </div>
            <div>
              <WishBtn id = {data.id} />
            </div>
          </div>

          <div className="flex justify-between items-center w-full px-1 mt-4">
            <p className="font-semibold text-sm text-gray-800 dark:text-white">
              {data.price} EGP
            </p>

            <div className="flex items-center gap-1 dark:text-white text-yellow-500 text-sm">
              <i className="fas fa-star"></i>
              <span className="text-gray-700 dark:text-white">{data.ratingsAverage}</span>
            </div>
          </div>
        </div>
        <AddBtn id={data.id} />
      </div>
    </div>
  );
}
