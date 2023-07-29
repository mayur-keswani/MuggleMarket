import React from "react";
import FormItem from "../commons/form-item";
import { useForm } from "react-hook-form";
import { Disclosure } from "@headlessui/react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Spinner from "../commons/spinner/Spinner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { makePaymentAPI } from "../../lib/market.api";
import { toast } from "react-toastify";

const CheckoutForm = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const elements = useElements();
  const stripe = useStripe();

  const onSubmit = async (values) => {
    let payload = {
      username: values.username,
      email: values.email,
      address: values.address,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      paymentMethod: "Debit Card",
      paymentStatus: "Pending",
      totalAmount: props?.total,
    };
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error.message);
    } else {
      // Send paymentMethod.id to your backend to process the payment
      console.log("PaymentMethod:", paymentMethod);
      try {
        const res = await makePaymentAPI({
          paymentMethodId: paymentMethod.id,
          amount: payload.totalAmount,
        });
        console.log({ res });
        toast.success("Payment Received Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error("Something went wrong!Please contact Administorator", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      // {
      //     "id": "pm_1NZHXQGKjVBYc4dG7GfgoHr1",
      //     "object": "payment_method",
      //     "billing_details": {
      //         "address": {
      //             "city": null,
      //             "country": null,
      //             "line1": null,
      //             "line2": null,
      //             "postal_code": "22222",
      //             "state": null
      //         },
      //         "email": null,
      //         "name": null,
      //         "phone": null
      //     },
      //     "card": {
      //         "brand": "visa",
      //         "checks": {
      //             "address_line1_check": null,
      //             "address_postal_code_check": null,
      //             "cvc_check": null
      //         },
      //         "country": "US",
      //         "exp_month": 4,
      //         "exp_year": 2025,
      //         "funding": "credit",
      //         "generated_from": null,
      //         "last4": "4242",
      //         "networks": {
      //             "available": [
      //                 "visa"
      //             ],
      //             "preferred": null
      //         },
      //         "three_d_secure_usage": {
      //             "supported": true
      //         },
      //         "wallet": null
      //     },
      //     "created": 1690654008,
      //     "customer": null,
      //     "livemode": false,
      //     "type": "card"
      // }
    }

    // await props.checkoutHandler(payload);
  };

  return (
    <div className="px-5 py-6 text-gray-900 md:px-8">
      <div className="flow-root">
        <div className="-my-6 divide-y divide-gray-200">
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <Disclosure>
              {({ open }) => (
                <>
                  <div className="py-6">
                    <Disclosure.Button className="flex items-center justify-between w-full text-base  font-bold">
                      <span>Contact Information</span>
                      {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Disclosure.Button>

                    <Disclosure.Panel className="space-y-5 mt-3">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormItem
                          type="text"
                          label="Full Name"
                          {...register("fullName", { required: true })}
                        />
                        {errors?.fullName?.type === "required" && (
                          <p className="error">FullName is required</p>
                        )}
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormItem
                          type="text"
                          label="Email"
                          {...register("email", { required: true })}
                        />
                        {errors?.email?.type === "required" && (
                          <p className="error">Email is required</p>
                        )}
                      </div>
                    </Disclosure.Panel>
                  </div>
                </>
              )}
            </Disclosure>

            <Disclosure>
              {({ open }) => (
                <div className="py-6">
                  <Disclosure.Button className="flex items-center justify-between w-full text-base  font-bold">
                    <span>Shipping Information</span>
                    {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                      <div class="sm:col-span-3">
                        <FormItem
                          type="textarea"
                          label="Address"
                          {...register("address", { required: true })}
                        />
                        {errors?.address?.type === "required" && (
                          <p className="error">address is required</p>
                        )}
                      </div>
                      <div>
                        <FormItem
                          type="text"
                          label="City"
                          {...register("city", { required: true })}
                        />
                        {errors?.city?.type === "required" && (
                          <p className="error">City is required</p>
                        )}
                      </div>
                      <div>
                        <FormItem
                          type="text"
                          label="State / Province"
                          {...register("state", { required: true })}
                        />
                        {errors?.region?.type === "required" && (
                          <p className="state">State is required</p>
                        )}
                      </div>

                      <div>
                        <FormItem
                          type="text"
                          label="Postal code"
                          {...register("postalCode", { required: true })}
                        />
                        {errors?.postalCode?.type === "required" && (
                          <p className="error">Postal-Code is required</p>
                        )}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* <Disclosure>
              {({ open }) => (
                <div className="py-6">
                  <Disclosure.Button className="flex items-center justify-between w-full text-base  font-bold">
                    <span>Billing Information</span>
                    {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </Disclosure.Button>
                  <Disclosure.Panel></Disclosure.Panel>
                </div>
              )}
            </Disclosure> */}
            <Disclosure>
              {({ open }) => (
                <div className="py-6">
                  <Disclosure.Button className="flex items-center justify-between w-full text-base  font-bold">
                    <span>Payment Method</span>
                    {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <div className="text-muted">
                      Currently, we only support card payment, No COD Available!
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      />
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            <div>
              <button
                type="submit"
                disabled={props?.isLoading}
                className="btn btn-primary w-full rounded-md p-4 space-x-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {props.isLoading && <Spinner />} Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
