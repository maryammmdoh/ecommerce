// src/app/brands/page.tsx
import allBrands from '@/lib/api/allBrands';
import React from 'react'
import  Link from 'next/link';
import { BrandsType } from '@/types/brands.type';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default async function brands() {
  const brands = await allBrands();
  return (
    <>
      <div className="flex flex-wrap gap-4 mt-20 mb-20 w-[90%] mx-auto text-center justify-center">
        {brands?.data.map((brand: BrandsType) => (
          <Link
            href={`/brands/${brand._id}`}
            className=" cursor-pointer mt-2 flex flex-wrap :w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:scale-105 transition-all duration-300"
            key={brand._id}
          >
            <Card className="w-full">
              <CardContent>
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover object-center rounded content-center items-center mx-auto"
                />
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <span className="w-full">{brand.name}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
