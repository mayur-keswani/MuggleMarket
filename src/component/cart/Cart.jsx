import React, { useState, useContext } from "react";
import OrderSummary from "./OrderSummary";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const [showCartItems, setShowCartItems] = useState(false);
  const {
    globalState: { cart },
  } = useContext(UserContext);
  const { getTotalPrice } = useCart();
  const navigate = useNavigate();

  async function proceedToCheckout() {
    // const { data } = await checkoutAPI();
    navigate("/checkout");
  }

  return (
    <div className="fixed bottom-0 left-0 bg-primary w-full font-bold overflow-scroll max-h-[calc(100vh-6rem)]">
      <div
        className={`flex items-center justify-between ${showCartItems &&
          "flex-col"} h-full mx-4 py-2`}
      >
        <button
          className="btn btn-primary"
          onClick={() => setShowCartItems((prevState) => !prevState)}
        >
          {showCartItems ? (
            <BsFillArrowDownCircleFill size={"2rem"} />
          ) : (
            <BsFillArrowUpCircleFill />
          )}
        </button>
        {showCartItems ? (
          <div className="mx-auto flex w-full flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
            <h2 className="text-3xl font-bold">Your cart</h2>
            <OrderSummary />
          </div>
        ) : (
          <div className="flex flex-row justify-between">
            <p className="mx-2">
              {" "}
              Your Order <span className="text-muted">({cart?.length})</span>
            </p>
            <div>
              Subtotal :<span className="text-red"> {getTotalPrice(cart)}</span>
            </div>
          </div>
        )}
        <div className="text-right">
          <button
            className="btn btn-info px-5 py-2 mx-auto"
            onClick={() => proceedToCheckout()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
