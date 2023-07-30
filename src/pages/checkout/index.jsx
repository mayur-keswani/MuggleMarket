import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import {
  checkoutAPI,
  createStripeSessionAPI,
  makePaymentAPI,
} from "../../lib/market.api";
import CheckoutSummary from "../../component/checkout/CheckoutSummary";
import CheckoutForm from "../../component/checkout/CheckoutForm";
import useCart from "../../hooks/useCart";
import AfterPaymentStatusModal from "../../component/modals/AfterPaymentStatusModal";

const Checkout = () => {
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({
    isComplete: false,
    isFailed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const {
    globalState: { cart },
  } = useContext(UserContext);
  const { getTotalPrice, removeFromCartHandler } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = async (payload) => {
    try {
      setIsLoading(true);
      const { data: checkoutResult } = await checkoutAPI(payload);
      setIsLoading(false);
      navigate("/payment");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <AfterPaymentStatusModal
          status={paymentStatus}
          isOpen={showPaymentStatus}
          closeModal={() => {
            setShowPaymentStatus(false);
          }}
        />
        <div className="overflow-hidden  rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CheckoutSummary
              items={cart}
              total={getTotalPrice(cart)}
              removeFromCartHandler={removeFromCartHandler}
            />

            <CheckoutForm
              products={cart}
              checkoutHandler={checkoutHandler}
              total={getTotalPrice(cart)}
              isLoading={isLoading}
              allowToProceed={cart.length > 0}
            />
          </div>
        </div>
      </div>
      {/* <Grid> */}
      {/* <Grid.Column mobile={16} tablet={11} computer={11}> */}
      {/* <UserDetails
                username={user.username}
                email={user.email}
                selectedAddress={selectedAddress}
                onSelectAddress={(address) => onSelectAddress(address)}
                changePaymentMethod={setPaymentMethod}
              /> */}
      {/* </Grid.Column> */}

      {/* <Grid.Column
              mobile={16}
              tablet={4}
              computer={5}
              className="text-center"
            >
              <CheckoutSummary
                cartItems={cartItems}
                updateItemsHandler={(itemID, type) =>
                  updateItemsHandler(itemID, type)
                }
                taxCalculator={taxCalculator}
                grandTotalCalculator={grandTotalCalculator}
              />
              <Message warning>
                <Message.Header>Note:</Message.Header>
                <span>
                  Order once placed cannot be cancelled and it is non-refundable
                </span>
              </Message>
              {/* <Button primary size='huge' onClick={orderHandler}>Place Order</Button> */}
      {/* {PaymentMethod()} */}
      {/* </Grid.Column> */}
      {/* </Grid> */}
      {/* <ModalWrapper
        isOpen={ordered.flag}
        closeModal={() =>
          onOrderPlaced({ flag: false, message: null, status: null })
        }
      >
        <OrderPlaceResult
          status={ordered.status}
          message={ordered.message}
          invoice={invoice}
          closeModal={() =>
            onOrderPlaced({ flag: false, message: null, status: null })
          }
        />
      </ModalWrapper> */}
    </>
  );
};

export default Checkout;
