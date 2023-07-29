import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  checkoutAPI,
  createStripeSessionAPI,
} from "../../lib/market.api";
import CheckoutSummary from "../../component/checkout/checkout-summary";
import CheckoutForm from "../../component/checkout/checkout-form";
import useCart from "../../hooks/useCart";
import AfterPaymentStatusModal from "../../component/modals/AfterPaymentStatusModal";

const Checkout = () => {
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({
    isComplete: false,
    isFailed: false,
  });
  const [invoice, setInvoice] = useState("");
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
      console.log({ checkoutResult });
      const { data: session } = await createStripeSessionAPI({
        items: cart,
      });
      const { error } = await window.stripe.redirectToCheckout({
        sessionId: session.id,
      });
      setIsLoading(false);

      if (error) {
        console.error(error);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

  // const onOrderSumbit = async (stripe_token,values) => {
  //   try {
  //     const items = cartItems.map((item) => {
  //       return {
  //         productID: item.productID._id,
  //         name: item.productID.name,
  //         quantity: item.quantity,
  //         price: item.productID.price,
  //         storeID: item.productID.storeID,
  //       };
  //     });
  //     const payload = {
  //       token: stripe_token,
  //       address: values.address,
  //       price: 100,
  //       username: values.username,
  //       items,
  //     };

  //     setIsPlacingOrder(true);
  //     const {
  //       data: {
  //         result: { receipt_url },
  //       },
  //     } = await processPaymentAPI(payload);

  //     const orderItems = cartItems.map((item) => {
  //       return {
  //         productID: item.productID._id,
  //         name: item.productID.name,
  //         description: item.productID.description,
  //         picture: item.productID.picture,
  //         quantity: item.quantity,
  //         price: item.productID.price,
  //         storeID: item.productID.storeID,
  //       };
  //     });
  //     const data = {
  //       address: selectedAddress,
  //       charges: charges,
  //       grandTotal: grandTotal,
  //       username: user.username,
  //       items: orderItems,
  //     };

  //     const { data: {message} } = await placeOrderAPI(data);
  //     setIsPlacingOrder(false);
  //     onOrderPlaced({ flag: true, status: "success", message });
  //     receipt_url ? setInvoice(receipt_url) : setInvoice("");
  //   } catch (error) {
  //     let message = error.message;
  //     setIsPlacingOrder(false);
  //     onOrderPlaced({ flag: true, status: "fail", message });
  //   }
  // };

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
            <Elements stripe={stripePromise}>
              <CheckoutForm
                checkoutHandler={checkoutHandler}
                total={getTotalPrice(cart)}
                isLoading={isLoading}
              />
            </Elements>
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
