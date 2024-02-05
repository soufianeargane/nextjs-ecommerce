"use client"
import Link from "next/link";
import { DataContext } from "../contexts/dataProvide"
import { useContext } from "react";

function NavBar() {
  const { cartItemCount } = useContext(DataContext);
  
  return (
    <nav className="fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center sm:justify-start sm:ms-3">
          <div className=" flex items-center justify-start rtl:justify-end">
            <Link href="/product" className="flex md:me-24">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 me-3 text-sky-500">
              <path  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MobiMart</span>
            </Link>
          </div>
        </div>

          <div>
          <Link href="/cart">
          <span className="count absolute top-2 right-8 text-xs bg-red-500 rounded-full w-4 h-4  text-center text-white font-bold">{cartItemCount}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="h-8 me-3 text-sky-500">
            <path   d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default NavBar