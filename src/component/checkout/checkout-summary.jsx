import React from "react";
import { AiFillDelete } from "react-icons/ai";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    color: "Orange",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
  },
  {
    id: 2,
    name: "Nike Blazer Low 77 SE",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "White",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    color: "Black",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
  },
];
const CheckoutSummary = ({
  cartItems,
  updateItemsHandler,
  taxCalculator,
  grandTotalCalculator,
}) => {
  let subtotal = 0;

  return (
    <div className="checkout-summary">
      <div className="bg-gray-100 px-5 py-6 md:px-8">
        <div className="flow-root">
          <ul className="-my-7 divide-y divide-gray-200">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-stretch justify-between space-x-5 py-7"
              >
                <div className="flex flex-1 items-stretch">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                      src={product.imageSrc}
                      alt={product.imageSrc}
                    />
                  </div>
                  <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="mt-1.5 text-sm font-medium text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <p className="mt-4 text-xs font-medium ">x 1</p>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between">
                  <p className="text-right text-sm font-bold text-gray-900">
                    {product.price}
                  </p>
                  <button
                    type="button"
                    className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
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
          <li className="flex items-center justify-between text-gray-600">
            <p className="text-sm font-medium">Sub total</p>
            <p className="text-sm font-medium">₹1,14,399</p>
          </li>
          <li className="flex items-center justify-between text-gray-900">
            <p className="text-sm font-medium ">Total</p>
            <p className="text-sm font-bold ">₹1,14,399</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CheckoutSummary;
