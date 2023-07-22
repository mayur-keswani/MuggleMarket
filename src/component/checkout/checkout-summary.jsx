import React from "react";
import { AiFillDelete } from "react-icons/ai";


const CheckoutSummary = ({ items, removeFromCartHandler, total }) => {
  console.log({ items });
  return (
    <div className="checkout-summary">
      <div className="bg-gray-100 px-5 py-6 md:px-8">
        <div className="flow-root">
          <ul className="-my-7 divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item._id}
                className="flex items-stretch justify-between space-x-5 py-7"
              >
                <div className="flex flex-1 items-stretch">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                      src={item?.product.product_pic}
                      alt={item?.product.name}
                    />
                  </div>
                  <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold">{item?.product.name}</p>
                      <p className="mt-1.5 text-sm font-medium text-gray-500">
                        {item?.product.description}
                      </p>
                    </div>
                    <p className="mt-4 text-xs font-medium ">x 1</p>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between">
                  <p className="text-right text-sm font-bold text-gray-900">
                    {item?.product.price}
                  </p>
                  <button
                    type="button"
                    className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    onClick={() => {
                      removeFromCartHandler(item?.product?._id);
                    }}
                  >
                    <span className="sr-only">Remove</span>
                    <AiFillDelete className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <hr className="mt-6 border-gray-200" />

        <ul className="mt-6 space-y-3">
          {/* <li className="flex items-center justify-between text-gray-600">
            <p className="text-sm font-medium">Sub total</p>
            <p className="text-sm font-medium">₹1,14,399</p>
          </li> */}
          <li className="flex items-center justify-between text-gray-900">
            <p className="text-sm font-medium ">Total</p>
            <p className="text-sm font-bold ">₹{total}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CheckoutSummary;
