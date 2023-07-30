import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { makePaymentAPI } from "../../lib/market.api";
import { toast } from "react-toastify";
import FormItem from "../commons/form-item";
import Spinner from "../commons/spinner/Spinner";

const inputStyle = {
  width: "100%",
  iconColor: "#c4f0ff",
  color: "#ff0",
  fontWeight: "500",
  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
  fontSize: "16px",
  fontSmoothing: "antialiased",
  ":-webkit-autofill": {
    color: "#fce883",
  },
  "::placeholder": {
    color: "#87BBFD",
  },
};
const StripeCard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  const onSubmit = async (values) => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error.message);
    } else {
      setIsLoading(true);
      // Send paymentMethod.id to your backend to process the payment
      try {
        const {
          data: { paymentIntentId },
        } = await makePaymentAPI({
          paymentMethodId: paymentMethod.id,
          amount: props.totalAmount,
        });

        setIsLoading(false);
        props.placeOrder(paymentIntentId);
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong!Please contact Administorator", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="my-3">
      <div className="border border-dashed rounded-sm py-8 px-2">
        <div>
          <label>Card Number</label>
          <div className="border w-full md:w-3/4 rounded-sm p-2">
            <CardNumberElement
              options={{
                style: {
                  base: inputStyle,
                },
              }}
            />
          </div>
        </div>

        <div>
          <FormItem type="text" label="Card Holder Name" />
        </div>

        <div className="grid grid-cols-2 my-2 space-x-1">
          <div>
            <label>Expiry Date</label>
            <div className="border w-full md:w-3/4 rounded-sm p-2">
              <CardExpiryElement
                options={{
                  style: {
                    base: inputStyle,
                  },
                }}
              />
            </div>
          </div>
          <div>
            <label>CVV Code</label>
            <div className="border w-full md:w-3/4 rounded-sm p-2">
              <CardCvcElement
                options={{
                  style: {
                    base: inputStyle,
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-5">
          <button
            className="btn btn-primary block w-4/5 py-2"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripeCard;
