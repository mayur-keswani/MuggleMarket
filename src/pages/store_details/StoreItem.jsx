import React, { useContext } from "react";
import ItemFilters from "../../component/item-filters/ItemFilters";
import Cart from "../../component/order-summary/Cart";
import OrderButton from "../../component/orderButton/OrderButton";
import { UserContext } from "../../context/user-context";
import { ADD_TO_CART } from "../../context/action-types";

const StoreItem = ({ item }) => {
  const { dispatch } = useContext(UserContext);
  const addToCart = (id, name, price) => {
    console.log(id);
    dispatch({
      type: ADD_TO_CART,
      payload: { id: id, name: name, price: price },
    });
  };
  const removeFromCart = (id, name, price) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { id: id, name: name, price: price },
    });
  };
  //   {
  //     "_id": "64b28845067211003fbc3c4f",
  //     "storeID": "64a7bc61ab5984003f276add",
  //     "name": "Item 1",
  //     "description": "test",
  //     "product_pic": "http://res.cloudinary.com/dra5wny0w/image/upload/v1689421893/dog1reuwrygj70mkrvbe.jpg",
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
            src={item?.product_pic}
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
            <button
              type="button"
              className="btn btn-primary w-full rounded-md  px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => {
                addToCart(item?._id, item?.name, item?.price);
              }}
            >
              Add To Cart
            </button>
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
