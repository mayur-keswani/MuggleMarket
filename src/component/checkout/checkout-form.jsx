import React from "react";
import FormItem from "../commons/form-item";
import StripeCheckout from "react-stripe-checkout";
import { useForm } from "react-hook-form";
import { Disclosure } from "@headlessui/react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const CheckoutForm = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log(import.meta.env.VITE_STRIPE_KEY);
  const renderStripePaymentButton = () => {
    return (
      <StripeCheckout
        stripeKey={import.meta.env.VITE_STRIPE_KEY}
        name="Muggle Market"
        token={props.onOrderSumbit}
        amount={100}
        shippingAddress
        billingAddress
      >
        <button
          type="submit"
          className="btn btn-primary w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Procceed
        </button>
      </StripeCheckout>
    );
  };

  return (
    <div className="px-5 py-6 text-gray-900 md:px-8">
      <div className="flow-root">
        <div className="-my-6 divide-y divide-gray-200">
          <form className="mt-6" onSubmit={handleSubmit()}>
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
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormItem
                          type="text"
                          label="Email"
                          {...register("email", { required: true })}
                        />
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
                      </div>
                      <div>
                        <FormItem
                          type="text"
                          label="City"
                          {...register("city", { required: true })}
                        />
                      </div>
                      <div>
                        <FormItem
                          type="text"
                          label="State / Province"
                          {...register("region", { required: true })}
                        />
                      </div>

                      <div>
                        <FormItem
                          type="text"
                          label="Postal code"
                          {...register("postalCode", { required: true })}
                        />
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
                    <div className="text-muted">Currently, we only support card payment, No COD Available!</div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            <div>
              
             

            {renderStripePaymentButton()}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
