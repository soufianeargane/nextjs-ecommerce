"use client";
import React, { useState } from "react";
import { ProductItems, Items } from "../interfaces";
import axios from "axios";

interface AppState {
  cartItemCount: number;
  cartItems: ProductItems[];
}

interface AppContext extends AppState {
  addToCart: (item: Items) => void;
  removeItem: (item: Items) => void;
  updateItem: (item: Items) => void;
  getCartItems: () => void;
}

export const DataContext = React.createContext<AppContext>({} as AppContext);

function DataProvider({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<AppState>({
    cartItemCount: 0,
    cartItems: [],
  });
  const { cartItemCount, cartItems } = state;

  const addToCart = async (item: Items) => {
    console.log(item._id);
    try {
      const cartItemData = {
        cartId: "65c0f9f8526e02a1a3f4fa66",
        productId: item._id,
        quantity: 1,
        // image: item.image,
      };

      const response = await axios.post(
        "http://localhost:3002/api/cartItems",
        cartItemData
      );
      const data = response.data.cartItems;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    getCartItems();
  };

  const removeItem = async (item: Items) => {
    console.log(item._id);
    try {
      const cartId = "65bf9819eea1d90764136a6d";
      const productId = item._id;

      const response = await axios.delete(
        `http://localhost:3002/api/cartItems/${cartId}/${productId}`
      );
      const data = response.data.cartItems;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    getCartItems();
  };

  const updateItem = async (item: Items) => {
    console.log(item._id);
    try {
      const cartItemData = {
        cartId: "65c0f9f8526e02a1a3f4fa66",
        productId: item._id,
        quantity: 1,
      };

      const response = await axios.put(
        "http://localhost:3002/api/cartItems",
        cartItemData
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    getCartItems();
  };

  const getCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/cartItems`);
      const data = response.data.cartItems;
      const count = data.length;
      // console.log('hna',data);
      setState((prevState) => {
        return { ...prevState, cartItems: data };
      });
      setState((prevState) => {
        return { ...prevState, cartItemCount: count };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        // topRated,
        cartItemCount,
        cartItems,
        addToCart,
        removeItem,
        updateItem,
        getCartItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
