import React, { useState, useContext } from "react";
import OrderSummary from "./OrderSummary";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import { checkoutAPI } from "../../lib/market.api";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

const Cart = ({ totalItems }) => {
  const [showCartItems, setShowCartItems] = useState(false);
  const { globalState } = useContext(UserContext);
  const { token, orderItems, totalPrice } = globalState;
  const navigate = useNavigate();

  const proceedToCheckout = async () => {
    try {
      const { data } = await checkoutAPI(orderItems);
      navigate("/checkout");
    } catch (error) {}
  };
  return showCartItems ? (
    <div className="fixed bottom-0 left-0 h-24 bg-primary w-full font-bold">
      <div className="flex items-center justify-between h-full mx-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowCartItems(false)}
        >
          <BsFillArrowDownCircleFill />
        </button>
        {/* <OrderSummary /> */}
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
          <span className="mx-2"> Your Order ({totalItems})</span>
        </div>

        <div>
          Subtotal :<span className="text-red"> {totalPrice}</span>
        </div>

        <button className="btn btn-info px-5 py-2" onClick={proceedToCheckout}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Cart;
