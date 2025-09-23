"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from '@/components/ui/button';


import { WishContext } from "@/context/WishContext";
import getlogedUserWish from "@/WishActions/getUserWish.action";
import RemoveItemFromWish from "@/WishActions/removeWishItem.action";
import { WishlistType } from '@/types/wishlist.type';
import { DataType } from '@/types/wishlist.type';
import AddBtn from './../_components/AddBtn/AddBtn';
import  Image  from 'next/image';


export default function Wishlist() {

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false)
  

  const context = useContext(WishContext)

  if(!context) throw new Error("Not Exist")

  const {numberOfWishItems, setnumberOfWishItems} = context

  async function getUserWish() {
    try {
      const res = await getlogedUserWish();
      //console.log(res);
      console.log(res.count);
      const wishcount = res.count
      if (res.status == "success") {
        setproducts(res.data);
        setloading(false);
        setnumberOfWishItems(wishcount)
        console.log(numberOfWishItems);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        // toast.error(err.message, { position: "top-center", duration: 4000 });
        toast.error("Error fetching wishlist", { position: "top-center", duration: 4000 });

      } else {
        toast.error("Unknown error fetching wishlist", { position: "top-center", duration: 4000 });
      }
      setloading(false);
    }
  }

  async function deleteproduct(id: string) {
    setremoveDisable(true)
    const res = await RemoveItemFromWish(id);
    try {
      // console.log(res);
      if (res.status == "success") {
        setloading(false);
        toast.success("Product deleted successfully", { position: "top-center", duration: 4000 });
        setproducts(res.data);
        let sum = 0;
        res.data.forEach((product : WishlistType) => {
          sum += product.count;
        });
        getUserWish()
        setnumberOfWishItems(sum)
        setremoveDisable(false)
      }
    } catch (err : unknown) {
      if (err instanceof Error) {
        // toast.error(err.message, { position: "top-center", duration: 4000 });
        toast.error("Error deleting product", { position: "top-center", duration: 4000 });
      } else {
        toast.error("Unknown error deleting product", { position: "top-center", duration: 4000 });
      }
      setloading(false);
      setremoveDisable(false)
    }

  }

  // useeffect used to call the function once the component is mounted
  useEffect(() => {
    getUserWish();
  });

  if (loading) {
    return (
      <>
        <div className="text-center text-3xl font-bold mt-[20%]">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {products?.length > 0 ? (
        <>
          <div className="w-2/3 mx-auto my-15">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.length > 0 &&
                    products.map((products : DataType) => (
                      <tr
                        key={products._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Image
                            src={products.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={products.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {products.title
                            ?.split(" ")
                            .slice(0, 3)
                            .join(" ")}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {products.price} EG
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            disabled={removeDisable}
                            onClick={() => deleteproduct(products.id)}
                            className="relative font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-800 disabled:p-2 disabled:rounded-2xl disabled:text-white bg-red-400 text-white dark:text-white hover:text-white hover:bg-red-700"
                          >
                            {removeDisable ? (
                              <span className="flex items-center  justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Removing...
                              </span>
                            ) : (
                              "Remove"
                            )}
                          </Button>
                        </td>
                        <td className="px-6 py-4">
                          {/* <Button disabled={removeDisable} className="font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-800 disabled:p-2 disabled:rounded-2xl disabled:text-white text-white bg-purple-300 dark:text-blue-500 hover:bg-purple-500">
                            Add to Cart
                          </Button> */}

                        <button disabled={removeDisable}>
                          <AddBtn id={products.id} />
                        </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-red-500 mt-72 font-bold">NO PRODUCTS ADDED IN THE WISHLIST YET !!</h1>

          <Link href="/" className="flex justify-center">
            <button className="mt-6 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-800">
              Go to Shop
            </button>
          </Link>
        </>
      )}
    </>
  );
}
