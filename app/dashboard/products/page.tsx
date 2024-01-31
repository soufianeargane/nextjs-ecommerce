"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import axios from "axios";
import pic from "@/public/avatar-20.jpg";
import "../../../styles/app.css";

export default function Page() {
  // const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [products, setProducts] = useState<
    {
      id: number;
      image: string;
      name: string;
      price: number;
      description: string;
      quantity: number;
      user: { name: string };
      category: { name: string };
    }[]
  >([]);

  useEffect(() => {
    async function getProducts() {
      await axios.get(API_URL + "/products").then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
    }
    getProducts();
  }, []);
  return (
    <div className="px-6">
      <div>Products</div>
      <div className="card mt-3">
        <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
          <table className="is-hoverable w-full text-left">
            <thead>
              <tr>
                <th
                  style={{ width: "63px" }}
                  className="whitespace-nowrap text-xs rounded-tl-lg bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3"
                >
                  image
                </th>
                <th className="whitespace-nowrap text-xs text-center bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3">
                  Name
                </th>
                <th className="whitespace-nowrap text-xs bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3">
                  price
                </th>
                <th className="whitespace-nowrap text-xs bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3">
                  description
                </th>
                <th className="whitespace-nowrap text-xs bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3">
                  quantity
                </th>
                <th className="whitespace-nowrap text-xs bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3">
                  user
                </th>
                <th className="whitespace-nowrap text-xs bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3">
                  category
                </th>
                <th className="whitespace-nowrap text-xs text-center rounded-tr-lg bg-slate-200 px-3 py-2 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-3">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                >
                  <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                    <div className="flex items-center space-x-4">
                      <div className="avatar h-9 w-9">
                        <img
                          className="mask is-squircle"
                          src={pic.src}
                          alt="avatar"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                    <p className="font-medium text-center">{product.name}</p>
                  </td>
                  <td className="whitespace-nowrap pl-3 py-3 pr-0 sm:px-0">
                    <p className="font-medium text-sm text-primary dark:text-accent-light">
                      {product.price} DHs
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                    <p className="w-48 overflow-hidden text-ellipsis text-xs+">
                      {product.description}
                    </p>
                  </td>
                  <td className="whitespace-nowrap pl-3 py-3 pr-0 sm:px-0">
                    <div className="flex justify-center items-center">
                      <div className="badge bg-warning/10 text-warning dark:bg-warning/15">
                        {product.quantity}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                    <div className="badge space-x-2.5 text-xs+ text-warning">
                      <div className="h-2 w-2 rounded-full bg-current"></div>
                      <span>{product.user.name}</span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                    <p className="text-sm+ font-medium text-slate-700 dark:text-navy-100">
                      {product.category.name}
                    </p>
                  </td>
                  {/* action edit and delete */}
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <div className="flex items-center space-x-4">
                      <button className="px-2 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-slate-600 border border-transparent rounded active:bg-slate-600 hover:bg-slate-700 focus:outline-none focus:shadow-outline-slate">
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                        onClick={() => console.log("hiii")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
