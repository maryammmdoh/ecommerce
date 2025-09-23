"use client"
import React, { useState, useContext } from 'react'
import { Button } from '@/components/ui/button';
import AddToCart from '@/CartActions/addToCart.action';
import { toast } from 'sonner';
import { CartContext } from '@/context/CartContext';
import MySpinner from '../MySpinner/MySpinner';

export default function AddBtn({id} : {id : string}) {
    const {numberOfCartItems, setnumberOfCartItems} = useContext(CartContext)
    const [loading, setLoading] = useState(false);

    async function checkAddProduct(id : string) {
        setLoading(true);
        const res = await AddToCart(id);
        if(res.status === 'success') {
            toast.success('Product added to cart successfully 🥳', {position : "top-center", duration : 3000});
            setnumberOfCartItems(numberOfCartItems + 1)
        } else {
            toast.error(res.message, {position : "top-center", duration : 3000});
        }
        setLoading(false);
    }
    
    return (
        <Button
            onClick={() => checkAddProduct(id)}
            variant="outline"
            className="cursor-pointer bg-purple-400 text-white hover:bg-purple-500 dark:hover:bg-slate-500 hover:text-white w-full shadow-2xl"
            disabled={loading}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    Adding
                    <MySpinner/>
                </span>
            ) : (
                "Add to Cart"
            )}
        </Button>
    );
}
