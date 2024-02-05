"use client";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/dataProvide";
import { Items } from "../interfaces";
import NavBar from "@/layouts/Navbar";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const { addToCart, getCartItems } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("tototot");
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/product`);
        console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getCartItems();
  }, []);
  return (
    <>
      <NavBar />
      <h1 className="text-3xl mb-10 font-bold underline">Hello !</h1>

      <div className="wrapper min-h-16">
        <div className="content ms-5 ">
          <div className="container mb-5">
            <h4 className="my-4 font-semibold text-blue-600">All Products</h4>
            <div className="flex flex-wrap">
              {products.map((items: Items, idx: number) => (
                <div
                  key={idx}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2"
                >
                  <a href="#">
                    <img
                      className="w-full h-auto rounded-t-lg"
                      src={items.image}
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {items.name}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Price : {items.price}DH
                    </p>
                    <button onClick={() => addToCart(items)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-sky-500 w-6 h-6"
                      >
                        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
