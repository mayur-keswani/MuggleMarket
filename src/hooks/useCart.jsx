import React, { useContext } from "react";
import { UserContext } from "../context/user-context";
import {
  addQuantity,
  addToCart,
  removeFromCart,
  removeQuantity,
} from "../context/action-creators";
import {
  addToCartAPI,
  removeFromCartAPI,
  updateToCartAPI,
} from "../lib/market.api";

const useCart = () => {
  const { dispatch } = useContext(UserContext);

  function getTotalPrice(cartItems) {
    let totalPrice = 0;
    cartItems?.forEach((cartItem) => {
      totalPrice = totalPrice + cartItem?.quantity * cartItem?.product?.price;
    });
    console.log({ totalPrice });
    return totalPrice;
  }
  async function addQuantityHandler(id, existingQuantity) {
    dispatch(addQuantity(id));
    try {
      const { data } = await updateToCartAPI({
        id,
        quantity: existingQuantity + 1,
      });
      console.log(data);
    } catch (err) {}
  }

  async function reduceQuantityHandler(id, existingQuantity) {
    dispatch(removeQuantity(id));
    try {
      const { data } = await updateToCartAPI({
        id,
        quantity: existingQuantity - 1,
      });
    } catch (err) {}
  }

  async function addToCartHandler(item) {
    try {
      const { data } = await addToCartAPI({
        id: item._id,
      });
      dispatch(addToCart({ ...data.cart, product: item }));
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
    try {
      const { data } = await removeFromCartAPI({
        id,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return {
    getTotalPrice,
    addQuantityHandler,
    reduceQuantityHandler,
    addToCartHandler,
    removeFromCartHandler,
  };
};

export default useCart;
