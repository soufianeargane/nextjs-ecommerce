"use client"
import { useContext, useEffect } from "react";
import NavBar from "@/layouts/Navbar";
import { DataContext } from "@/contexts/dataProvide";;
import { ProductItems, Items } from "@/interfaces";

function Cart() {
  const { cartItems, addToCart, removeItem, updateItem, getCartItems } = useContext(DataContext);
  

  const totalPrice = () => {
    let price = 0;
    console.log(cartItems)
    cartItems.forEach((elment) => {
      price += elment.quantity * elment.productId?.price;
    });
    return price;
  };

  useEffect(() => {
    getCartItems();
    totalPrice()
  }, []);

  return (
    <>
    <NavBar/>
    <div className="flex flex-col cart-outer-div h-screen bg-gray-100">
      <div className="flex-1 cart-body">
        {totalPrice() ? (
          <CartWithItems
            cartItems={cartItems}
            addToCart={addToCart}
            removeItem={removeItem}
            updateItem={updateItem}
            totalPrice={totalPrice()}
          />
        ) : (
          <div className="container my-5 text-center">
            <img src="data:image/jpeg;base64,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" 
            className="w-48 mx-auto mt-44" alt="icon" />
            <div className="mt-4 me-20">
              <h4 className="text-orange-red font-semibold">Your cart is empty</h4>
              <h5 className="text-darkblue font-semibold">
                You can go to the home page to view all Product items.
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

const CartWithItems = ({
  cartItems,
  addToCart,
  removeItem,
  updateItem,
  totalPrice,
}: {
  cartItems: ProductItems[];
  addToCart: (item: Items) => void;
  removeItem: (item: Items) => void;
  updateItem: (item: Items) => void;
  totalPrice: number;
}) => {

  return (

      <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>

          <div className="mx-auto mt-6 max-w-md md:mt-5">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                  {cartItems.map((item: ProductItems, idx: number) => (
                    <li  key={idx} className="flex flex-col space-y-3 py-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                      <div className="shrink-0 relative">
                        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{item.quantity}</span>
                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={item.productId?.image} alt="" />
                      </div>
                        
                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">{item.productId?.name}</p>
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 ">{item.quantity * item.productId?.price}.00 DH</p>

                          </div>
                      
                          <div className="mt-4  items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <div className="flex justify-end">
                                  <button onClick={() => removeItem(item.productId)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path d="M6 18 18 6M6 6l12 12" />
                                  </svg>
                                </button>
                            </div>                          
                          </div>
                        </div>
                        

                        <div className="items-center absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button onClick={() => updateItem(item.productId)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path d="M5 12h14" />
                          </svg>
                          </button>

                          <button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                          <p>{item.quantity}</p>
                          </button>

                          <button onClick={() => addToCart(item.productId)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 space-y-1 border-t border-b py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">{totalPrice} DH</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">50 DH</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">Total</p>
                  <p className="text-2xl font-medium text-gray-900"> <span className="text-s text-gray-600">{totalPrice + 50} DH</span></p>
                </div>

                <div className="mt-4 text-center">
                  <button type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-sky-600 px-3 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    Place Order
                    <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Cart