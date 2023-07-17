import React, { useState, useContext } from "react";
import OrderSummary from "./OrderSummary";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import { checkoutAPI } from "../../lib/market.api";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

const Cart = () => {
  const [showCartItems, setShowCartItems] = useState(false);
  const {
    globalState: { cart },
  } = useContext(UserContext);
  const navigate = useNavigate();

  async function proceedToCheckout (){
    try {
      const { data } = await checkoutAPI(orderItems);
      navigate("/checkout");
    } catch (error) {}
  };

  function getTotalPrice(){
    let totalPrice = 0;
    cart?.items.forEach((cartItem) => {
      totalPrice = cartItem?.quantity * cartItem?.item?.price;
    });
    return totalPrice
  }
  
  return showCartItems ? (
    <div className="fixed bottom-0 left-0 bg-primary w-full font-bold overflow-scroll max-h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between flex-col h-full mx-4 py-2">
        <button
          className="btn btn-primary"
          onClick={() => setShowCartItems(false)}
        >
          <BsFillArrowDownCircleFill size={'2rem'}/>
        </button>
        <OrderSummary />
        <button
          className="btn btn-info px-5 py-2 mx-auto"
          onClick={proceedToCheckout}
        >
          Continue
        </button>
      </div>
    </div>
  ) : (
    <div className="fixed bottom-0 left-0 bg-primary h-24 w-full">
      <div className="flex items-center justify-between h-full font-bold mx-4 ">
        <div className="flex flex-row">
          <button onClick={() => setShowCartItems(true)}>
            <BsFillArrowUpCircleFill />
          </button>
          <span className="mx-2"> Your Order ({cart?.items.length})</span>
        </div>

        <div>
          Subtotal :<span className="text-red"> {getTotalPrice()}</span>
        </div>

        <button className="btn btn-info px-5 py-2" onClick={proceedToCheckout}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Cart;
