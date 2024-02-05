// ModalComponent.jsx
"use client"
import React, { useState } from 'react';
import axios from 'axios';
const ModalComponent = ({ closeModal,idOrder }) => {
  const [editQuantity, setEditQuantity] = useState(null);

  const handleSave = async  (event) => {
    event.preventDefault()
    setEditQuantity(event.target.value);
    console.log('salma',editQuantity)
    console.log(idOrder)
    
    try {
      const response = await axios.patch(`http://localhost:5002/orders/${idOrder}`,{quantity:editQuantity});
      const data = response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
    
    closeModal();
  };

  return (
    <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <div className="absolute bg-gray-800 opacity-75 inset-0" onClick={closeModal}></div>
      <div className="bg-white w-96 p-4 rounded-lg z-10">
        <h3 className="text-lg font-semibold mb-4">Edit Order</h3>
        <form onSubmit={handleSave}>
          <label>
            New Quantity:
            <input
              type="number"
              
              value={editQuantity !== null ? editQuantity : ''}
              onChange={(e) => setEditQuantity(parseInt(e.target.value, 10))}
            />
          </label>
          <div className="mt-4 flex justify-end">
            <button type="submit" onClick={handleSave} className="bg-blue-700 text-white px-3 py-2 rounded-lg mr-2">
              Save
            </button>
            <button type="button" onClick={closeModal} className="border px-3 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalComponent;
