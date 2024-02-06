"use client";
import React, { useState } from "react";
import axios from "axios";

function Page() {
  const [cartItems, setCartItems] = React.useState([
    {
      id: "1",
      name: "T-shirt",
      description: "pretty good T-short",
      quantity: 2,
      image: "https://inewgadgets.com/wp-content/uploads/2020/07/25.jpg",
    },
    {
      id: "2",
      name: "Cap",
      description: "pretty good Cap",
      quantity: 4,
      image: "https://freepngimg.com/thumb/cap/32592-2-cap-picture.png",
    },
  ]);

  const handleCheckout = async () => {
    console.log(cartItems);

    try {
      // Make a request to your NestJS server to create a checkout session
      const response = await axios.post(
        "http://localhost:3006/stripe/create-payment-sss",
        {
          id: "1",
        }
      );
      return;
      //   const response = await axios.post(
      //     "http://localhost:3006/stripe/create-checkout-session",
      //     {
      //       id: "1",
      //     }
      //   );

      // Assuming the response contains the session URL
      const sessionUrl = response.data.url;

      // Redirect the user to the Stripe Checkout page
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => handleCheckout()}
        >
          CheckOut
        </button>
      </div>
    </>
  );
}

export default Page;
