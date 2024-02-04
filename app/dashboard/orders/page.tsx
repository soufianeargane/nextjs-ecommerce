// @jsxImportSource @emotion/react
"use client"
import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  productId: object;

  paymentMethod:string;
  price: number;
  quantity:number;
}

function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5002/orders');
        const data: Order[] = await response.json();
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  async function fetchOrderDetails(orderId: string) {
    try {
      const response = await fetch(`http://localhost:5002/orders/${orderId}`);
      const data: Order = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }
  function Page() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  }
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 m-5">
        
          <thead>
          <tr  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th className="px-6 py-4">product name</th>
                <th className="px-6 py-4"> quantity</th>
                <th className="px-6 py-4">product price</th>
                <th className="px-6 py-4">paymentMethod</th>
                <th className="px-6 py-4">
                  Events
                </th>
              </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{order.productId.name}</td>
                <td className="px-6 py-4">{order?.quantity}</td>
                <td className="px-6 py-4">{order.productId.price}</td>
                <td className="px-6 py-4">{order.paymentMethod}</td>
<td className="px-6 py-4">
  <a
    href="#"
    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    onClick={() => setSelectedOrderId(order._id)}
  >
    Edit
  </a>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
