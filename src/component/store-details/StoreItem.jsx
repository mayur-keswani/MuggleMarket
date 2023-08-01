import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import useCart from "../../hooks/useCart";

const StoreItem = ({ item }) => {
  const [cartQauntity, setCartQuantity] = useState(0);
  const {
    globalState: { cart },
  } = useContext(UserContext);
  const {
    addQuantityHandler,
    reduceQuantityHandler,
    addToCartHandler,
  } = useCart();

  useEffect(() => {
    if (cart.length > 0 && item?._id) {
      setCartQuantity(
        cart.find((cartItem) => cartItem.product._id === item?._id)?.quantity ??
          0
      );
    }
  }, [cart, item?._id]);
  


  //   {
  //     "_id": "64b28845067211003fbc3c4f",
  //     "storeID": "64a7bc61ab5984003f276add",
  //     "name": "Item 1",
  //     "description": "test",
  //     "picture": "http://res.cloudinary.com/dra5wny0w/image/upload/v1689421893/dog1reuwrygj70mkrvbe.jpg",
  //     "price": 200,
  //     "createdAt": "2023-07-15T11:51:33.642Z",
  //     "updatedAt": "2023-07-15T11:51:33.642Z",
  //     "__v": 0
  // }
  return (
    <div className="mx-auto w-full p-2 overflow-hidden mb-3 border ">
      <div className="grid md:grid-cols-3 gap-2 ">
        <div className="relative flex items-center justify-center">
          <img
            alt="Product gallery 1"
            src={item?.picture}
            width={"100px"}
            height={"200px"}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div className="flex shrink-0 flex-col md:col-span-2">
          <div className="pb-5">
            <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">
              {item.name}
            </h2>
            <p className="mt-4 font-semibold">${item?.price}</p>
          </div>

          <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
            {cartQauntity > 0 ? (
              <div className="flex flex-row w-full">
                <div className="w-1/3 flex justify-end">
                  <button
                    className="btn btn-secondary px-4 py-2"
                    onClick={() => {
                      addQuantityHandler(item?._id, cartQauntity);
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <span className="text-center text-xl w-1/3">
                  {cartQauntity}
                </span>
                <div className="w-1/3 flex justify-start">
                  <button
                    className="btn btn-secondary px-4 py-2"
                    onClick={() => {
                      reduceQuantityHandler(item?._id, cartQauntity);
                    }}
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary w-full rounded-md  px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => {
                  addToCartHandler(item);
                }}
              >
                Add To Cart
              </button>
            )}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {/* <Heart size={16} className="mr-3" /> */}
                <span className="block">Wishlist</span>
              </button>
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  {/* <Share size={16} className="mr-3" /> */}
                  <span className="block">Share</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-6 xl:pt-8">
            <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
              Product Details:
            </h3>
            <p className="text-sm">{item?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
