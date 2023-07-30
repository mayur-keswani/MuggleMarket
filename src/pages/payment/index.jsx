import React, { useEffect, useState } from "react";
import StripeCard from "../../component/payment/StripeCard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getLastCheckoutAPI, postOrderAPI } from "../../lib/market.api";
import { toast } from "react-toastify";
import Spinner from "../../component/commons/spinner/Spinner";
import AfterPaymentStatusModal from "../../component/modals/AfterPaymentStatusModal";

const PaymentPage = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
  const [lastCheckoutDetail, setLastCheckoutDetail] = useState(false);

  const [orderStatus, setOrderStatus] = useState({
    isPending: false,
    isSuccess: false,
    isFailed: false,
  });

  const [totalAmount, setTotalAmount] = useState(null);

  const fetchLastCheckout = async () => {
    try {
      const {
        data: { order },
      } = await getLastCheckoutAPI();
      setLastCheckoutDetail(order);
      setTotalAmount(order.totalAmount);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const orderHandler = async (paymentIntentId) => {
    try {
      let payload = {
        address: lastCheckoutDetail.shippingAddress.address,
        city: lastCheckoutDetail.shippingAddress.city,
        state: lastCheckoutDetail.shippingAddress.state,
        postalCode: lastCheckoutDetail.shippingAddress.postalCode,
        paymentMethod: lastCheckoutDetail.paymentMethod,
        paymentStatus: "Paid",
        totalAmount: totalAmount,
        products: lastCheckoutDetail.products.map((prod) => ({
          product: prod.product,
          quantity: prod.quantity,
        })),
        paymentIntentId,
      };
      setOrderStatus((prevState) => ({
        ...prevState,
        isSuccess: false,
        isFailed: false,
        isLoading: true,
      }));
      const { data: checkoutResult } = await postOrderAPI(payload);
      setOrderStatus((prevState) => ({
        ...prevState,
        isSuccess: true,
        isFailed: false,
        isLoading: false,
      }));
    } catch (error) {
      setOrderStatus((prevState) => ({
        ...prevState,
        isSuccess: false,
        isFailed: true,
        isLoading: false,
      }));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLastCheckout();
  }, []);
  return (
    <div className="flex justify-center items-center w-full h-full">
      <AfterPaymentStatusModal
        isOpen={orderStatus.isSuccess || orderStatus.isFailed}
        closeModal={() => {
          setOrderStatus({
            isLoading: false,
            isSuccess: false,
            isFailed: false,
          });
          navigate("/");
        }}
        status={orderStatus}
      />
      {orderStatus.isLoading ? (
        <Spinner size="large" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Elements stripe={stripePromise}>
            <StripeCard totalAmount={totalAmount} placeOrder={orderHandler} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
