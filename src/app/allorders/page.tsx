'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAllOrders } from '@/lib/api/allOrders';
import { fetchUserOrders } from '@/lib/api/userOrders';
import getMyToken from '@/utilities/getMyToken';
import { orders } from '@/types/orders.type';
import Image from 'next/image';
import { shippingAddress } from '@/types/orders.type';

type EnrichedOrder = orders & {
    shippingAddress?: {
        details: string;
        city: string;
    };
};

const OrdersPage = () => {
    const [orders, setOrders] = useState<EnrichedOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const [allOrders, setAllOrders] = useState<orders[]>([]);
    // const [shippingMap, setShippingMap] = useState<Map<string, string>>(new Map());
    const [shippingMap, setShippingMap] = useState<Map<string, shippingAddress | undefined>>(new Map());



    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = await getMyToken();
                if (!token) throw new Error('User not logged in');

                const decoded = jwtDecode<{ id: string }>(token);
                const userId = decoded.id;

                const [userOrders, allOrdersRes] = await Promise.all([
                    fetchUserOrders(userId),
                    getAllOrders(),
                ]);

                // const allOrdersMap = new Map(
                //     allOrdersRes.data.map((order: any) => [order.id, order.shippingAddress])
                // );

                // console.log('All Orders Map:', allOrdersMap);    

                // const enrichedOrders = userOrders.map((userOrder: orders) => ({
                //     ...userOrder,
                //     shippingAddress: allOrdersMap.get(userOrder.id),
                // }));

                setAllOrders(allOrdersRes.data);
                // console.log('All Orders:', allOrders);
                // console.log('Enriched Orders:', enrichedOrders);

                // setOrders(enrichedOrders);
                // const map = new Map(
                //     allOrders.map((order) => [order._id, order.shippingAddress])
                // );
                const map = new Map<string, shippingAddress | undefined>(
                    allOrdersRes.data.map((order: orders) => [order._id, order.shippingAddress])
                );
                // console.log('Shipping Map:', map);
                setShippingMap(map);
                setAllOrders(allOrdersRes.data);
                setOrders(userOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);
    // console.log('All Orders:', allOrders);
    // console.log('Shipping Map:', shippingMap);
    if (loading) return <p className="text-center py-10 text-lg">Loading orders...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">🧾 My Orders</h1>

            {orders.length === 0 && <p>No orders found.</p>}

            {orders.map((order) => {
                const isExpanded = expandedOrderId === order._id;

                return (
                    <div key={order._id} className="border rounded-lg shadow transition-all duration-200">
                        <div
                            onClick={() => setExpandedOrderId(isExpanded ? null : order._id)}
                            className="cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-slate-700 flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">${order.totalOrderPrice}</p>
                                <p className="text-sm text-purple-500 hover:underline">
                                    {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
                                </p>
                            </div>
                        </div>

                        {isExpanded && (
                            <div className="p-4 border-t space-y-4 bg-gray-50 dark:bg-slate-500">
                                <div className="text-sm text-gray-700">
                                    <p>
                                        <strong>Payment:</strong> {order.paymentMethodType}{' '}
                                        {order.isPaid ? '✔️ Paid' : '❌ Unpaid'}
                                    </p>
                                    <p>
                                        <strong>Delivery:</strong>{' '}
                                        {order.isDelivered ? '✔️ Delivered' : '🚚 In Transit'}
                                    </p>
                                    {/* <p>
                                        <strong>Shipping:</strong>{' '}
                                        {allOrders.filter(o => String(o.id) === String(order.id))?.shippingAddress?.details},
                                        {allOrders.filter(o => String(o.id) === String(order.id))?.shippingAddress?.city} 📍
                                    </p> */}

                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {order.cartItems.map((item) => {
                                        const { product, count, price } = item;
                                        return (
                                            <div
                                                key={item._id}
                                                className="border p-3 rounded flex gap-4 items-center bg-white"
                                            >
                                                <Image
                                                    src={product.imageCover}
                                                    alt={product.title}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <div>
                                                    <p className="font-medium">{product.title}</p>
                                                    <p className="text-sm text-gray-600">Quantity: {count}</p>
                                                    <p className="text-sm text-gray-600">Price: {price} egp</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default OrdersPage;



