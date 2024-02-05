// Page.jsx
'use client'
import React, { useEffect, useState } from 'react';
import ModalComponent from './ModalComponent';

function Page() {
  const [orders, setOrders] = useState([]);
  const [orderEditId,setOrderEditId]=useState(null)
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5002/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [orders]);

  const handleEdit = async (orderId) => {
    setIsModalVisible(true)
    setSelectedOrderId(orderId);
    setOrderEditId(orderId)
    
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleSave = async (newQuantity) => {
    try {
      if (selectedOrderId && newQuantity !== null) {
      
        console.log(`Editing order ${selectedOrderId} with new quantity: ${newQuantity}`);
      }
      // Reset edit state
      setSelectedOrderId(null);
      setSelectedOrder(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 m-5">
          <thead>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Product Price</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Events</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{order.productId.name}</td>
                <td className="px-6 py-4">{order?.quantity}</td>
                <td className="px-6 py-4">{order.productId.price}</td>
                <td className="px-6 py-4">{order.paymentMethod}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={() => handleEdit(order._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <ModalComponent
          idOrder={orderEditId}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Page;
