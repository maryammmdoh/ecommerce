"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import getlogedUserCart from "@/CartActions/getUserCart.action";

// Define the shape of the context
interface CartContextType {
  numberOfCartItems: number;
  setnumberOfCartItems: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value
export const CartContext = createContext<CartContextType>({
  numberOfCartItems: 0,
  setnumberOfCartItems: () => {},
});

// Define props for the provider
interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItems, setnumberOfCartItems] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getlogedUserCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberOfCartItems(sum);
      }
    } catch (err) {
      console.log(err || "Not Logged in");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItems, setnumberOfCartItems }}>
      {children}
    </CartContext.Provider>
  );
}





// "use client"
// import { createContext, useEffect, useState } from "react";
// import  getMyToken  from '@/utilities/getMyToken';
// import  getlogedUserCart  from '@/CartActions/getUserCart.action';


// export const CartContext = createContext();

// export default function CartContextProvider({children}) {
//     // const [token, settoken] = useState("")
//     // async function getTheToken() {
//     //     let token = await getMyToken();
//     //     if (!token) throw new Error("User not logged in");
//     //     settoken(token)
//     // }
//     // async function GetUserCart() {
//     //     let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
//     //     method: "GET",
//     //     headers: {
//     //         token,
//     //         "Content-Type": "application/json",
//     //     },
//     // })
//     // let payload = await res.json();
//     // return payload;
//     // }
//     // useEffect(() => {
//     //     GetUserCart()
//     //     getTheToken()
//     // }, [])
//     // useEffect(() => {
//     //     if(!token) return GetUserCart();
//     // },[token])
//     const [numberOfCartItems, setnumberOfCartItems] = useState(0)

//     async function getUserCart() {
//         try {
//             let res = await getlogedUserCart();
//             // console.log(res);
//             if(res.status === "success"){
//                 // console.log(res.data.products);

//                 let sum = 0;
//                 res.data.products.forEach((product) => {
//                     sum += product.count;
//                 });
//                 setnumberOfCartItems(sum)
//             }
//         } catch (err) {
//             console.log("Not Logedin")
//         }
//     }

//     useEffect(() => {
//         getUserCart()
//     },[])

//     return (<CartContext.Provider value={{numberOfCartItems,setnumberOfCartItems}}>
//         {children}
//     </CartContext.Provider>);
// }

