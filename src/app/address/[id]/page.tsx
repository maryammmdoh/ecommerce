import React from 'react'
import getMyToken from '@/utilities/getMyToken'

export default async function addressDetails({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params


    const token = await getMyToken()
    if (!token) {
        throw new Error(" not authorize to add to cart");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        method: "GET",
        headers: {
            token,
            "Content-Type": "application/json",
        },
    });

    const { data } = await res.json();

    if (!data) {
        return <h1 className='text-red-600 font-bold text-5xl text-center mt-28 '>No address here</h1>
    }



    return (
        <>
            <div className="w-[80%] mx-auto flex flex-col items-center p-6 border rounded-lg shadow-lg mt-24 gap-4">
                <h1 className="text-2xl font-bold text-center">Address Details</h1>

                <div className="w-full flex flex-col gap-3 text-lg">
                    <p>
                        <span className="font-semibold">Name:</span> {data.name}
                    </p>
                    <p>
                        <span className="font-semibold">City:</span> {data.city}
                    </p>
                    <p>
                        <span className="font-semibold">Phone:</span> {data.phone}
                    </p>
                    <p>
                        <span className="font-semibold">Details:</span> {data.details}
                    </p>
                </div>
            </div>
            );
        </>
    )
}