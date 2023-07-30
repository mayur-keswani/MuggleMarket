import React from "react";
import { useNavigate } from "react-router-dom";

const MyOrder = ({ order }) => {
  const navigate = useNavigate();

  const orderAgainHandler = (order) => {
    // dispatch({type:ADD_TO_CART,payload:{id:product._id,name:product.name,price:product.price}})
    navigate("/store/" + product.storeID);
  };
  return (
    <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
      <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
        <div className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
            {[
              ["Payment Status", order.paymentStatus],
              [
                "Address",
                `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} (${order.shippingAddress.postalCode})`,
              ],
              ["Total Amount", order.totalAmount],
              ["Order Status", "Confirmed"],
            ].map(([key, value]) => (
              <div key={key} className="mb-4">
                <div className="text-sm font-semibold">{key}</div>
                <div className="text-sm font-medium text-gray-700 flex-wrap">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-8">
          <ul className="-my-7 divide-y divide-gray-200">
            {order.products.map((orderedProduct) => (
              <li
                key={orderedProduct.product._id}
                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
              >
                <div className="flex flex-1 items-stretch">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                      src={orderedProduct.product.picture}
                      alt={orderedProduct.product.name}
                    />
                  </div>

                  <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">
                        {orderedProduct.product.name}
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-500">
                      x {orderedProduct.quantity}
                    </p>
                  </div>
                </div>

                <div className="ml-auto flex flex-col items-end justify-between">
                  <p className="text-right text-sm font-bold text-gray-900">
                    {orderedProduct.product.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <hr className="my-8 border-t border-t-gray-200" />
          <div className="space-x-4">
            <button
              type="button"
              onClick={() => {
                navigate("/store/" + order.products[0].product.storeID);
              }}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Order Again
            </button>
            {/* <button
              type="button"
              disabled
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              View Invoice
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
