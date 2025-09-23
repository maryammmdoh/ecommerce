"use client";
// import { authoptions } from "@/auth";
// import { getServerSession } from "next-auth";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import getlogedUserCart from "@/CartActions/getUserCart.action";
import removeItemFromCart from "@/CartActions/removeCartItem.action";
import UpdateCartQuentity from "@/CartActions/updateCartQuantity.action";
import clearCartAction from "@/CartActions/clearCartItem.action";
import { CartContext } from '@/context/CartContext';
import { CartProductType } from "@/types/cart.type";
import MySpinner from "../_components/MySpinner/MySpinner";
import Image from 'next/image';


export default function Cart() {
  // let session = await getServerSession(authoptions)

  // if(!session){
  //   redirect("/login")
  // }

  // const [token, setToken] = useState<string | undefined>("");

  // async function getthetoken(){
  //   let token = await getMyToken()

  //   setToken(token)
  // }

  // useEffect(()=>{
  //   getthetoken()
  // },[])

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false)
  const [updateDisable, setupdateDisable] = useState(false)
  const [loadingUpdate, setloadingUpdate] = useState(false)
  const [currentid, setcurrentid] = useState("")
  const [total, settotal] = useState(0)
  const [cartId, setCartId] = useState<string>("")

  const context = useContext(CartContext)

  if (!context) throw new Error("Not Exist")

  const { numberOfCartItems, setnumberOfCartItems } = context

  async function getUserCart() {
    try {
      const res = await getlogedUserCart();
      console.log(res);
      if (res.status == "success") {
        settotal(res.data.totalCartPrice)
        setCartId(res.cartId)
        console.log("cartId:", res.cartId)
        setproducts(res.data.products);
        setloading(false);
      }
    } catch (err: unknown) {
      // const message = err instanceof Error ? err.message : String(err);
      // toast.error(message, { position: "top-center", duration: 4000 });
      toast.error("can't get cart", { position: "top-center", duration: 4000 });
      setloading(false);
    }
  }

  async function deleteproduct(id: string) {
    setremoveDisable(true)
    setupdateDisable(true)
    const res = await removeItemFromCart(id);
    try {
      // console.log(res);
      if (res.status == "success") {
        setloading(false);
        toast.success("Product deleted successfully", { position: "top-center", duration: 4000 });
        setproducts(res.data.products);
        let sum = 0;
        res.data.products.forEach((product: CartProductType) => {
          sum += product.count;
        });
        getUserCart()
        setnumberOfCartItems(sum)
        setremoveDisable(false)
        setupdateDisable(false)
      }
    } catch (err: unknown) {
      // const message = err instanceof Error ? err.message : String(err);
      // toast.error(message, { position: "top-center", duration: 4000 });
      toast.error("can't remove product", { position: "top-center", duration: 4000 });
      setloading(false);
      setremoveDisable(false)
      setupdateDisable(false)
    }

  }

  async function updateProduct(id: string, count: string, sign: string) {
    setcurrentid(id)
    setloadingUpdate(true)
    setupdateDisable(true)
    setremoveDisable(true)
    try {
      const res = await UpdateCartQuentity(id, count);
      // console.log(res);
      if (res.status == "success") {

        toast.success("Product updated successfully", { position: "top-center", duration: 3000 });
        setproducts(res.data.products);
      }
      if (sign === "+") {
        setnumberOfCartItems(numberOfCartItems + 1)
      } else if (sign === "-") {
        setnumberOfCartItems(numberOfCartItems - 1)
      }
      getUserCart()
      setupdateDisable(false)
      setloadingUpdate(false)
      setremoveDisable(false)
    } catch (error: unknown) {
      toast.error(error instanceof Error ?  "can't update quantity" : "Unknown error", { position: "top-center", duration: 3000 });
      setupdateDisable(false)
      setloadingUpdate(false)
      setremoveDisable(false)
    }

  }

  async function clearCart() {
    const res = await clearCartAction();
    console.log(res);
    if (res.message == "success") {
      setproducts([])
    }
  }

  // useeffect used to call the function once the component is mounted
  useEffect(() => {
    getUserCart();
  }, []);



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
            {/* <div className="flex justify-end"><Button onClick={() => clearCart()} className="cursor-pointer my-4 bg-slate-500 hover:bg-slate-900"> Clear Cart Items</Button></div> */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-center text-3xl font-bold text-fuchsia-800 dark:text-white mb-4">Total Cart Price: {total}</h1>
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
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.length > 0 &&
                    products.map((products: CartProductType) => (
                      <tr
                        key={products._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Image
                            src={products.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={products.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {products.product.title
                            ?.split(" ")
                            .slice(0, 3)
                            .join(" ")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              disabled={updateDisable}
                              // disabled={updateDisable && currentid === products.product.id}
                              onClick={() => updateProduct(products.product.id, `${products.count - 1}`, "-")}
                              className="inline-flex cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-white items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              {products.product.id === currentid ? loadingUpdate ? <i className="fas fa-spinner fa-spin"></i> : <span>{products.count}</span> : <span>{products.count}</span>}

                            </div>
                            <button
                              disabled={updateDisable}
                              // disabled={updateDisable && currentid === products.product.id}
                              onClick={() => updateProduct(products.product.id, `${products.count + 1}`, "+")}
                              className="inline-flex cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-white items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {products.price * products.count} EG
                        </td>
                        <td className="px-6 py-4">
                            {removeDisable && currentid === products.product.id && !loadingUpdate ? (
                              <MySpinner />
                            ) : (
                              <button
                                disabled={removeDisable}
                                onClick={() => {
                                  setcurrentid(products.product.id);
                                  deleteproduct(products.product.id);
                                }}
                                className="font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-800 disabled:p-2 disabled:rounded-2xl disabled:text-white text-red-600 dark:text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

            </div>
            <div className="w-full my-4 mx-auto flex justify-center">
              <Button onClick={() => clearCart()} className="cursor-pointer my-4 mx-3 bg-red-500 hover:bg-red-600"> Clear Cart Items</Button>
                <Link href={`/checkOut/${cartId}`}>
                  <Button
                    className="cursor-pointer my-4 mx-3 bg-green-600 hover:bg-green-900"
                    type="button"
                  >
                    Proceed To Checkout
                  </Button>
                </Link>
            </div>
          </div>

        </>
      ) : (
        <>
          <h1 className="text-center text-red-500 mt-72 font-bold">NO PRODUCTS ADDED IN THE CART YET !!</h1>

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
