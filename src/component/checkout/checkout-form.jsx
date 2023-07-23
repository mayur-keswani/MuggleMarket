import React from "react";
import FormItem from "../commons/form-item";
import { useForm } from "react-hook-form";
import { Disclosure } from "@headlessui/react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Spinner from "../commons/spinner/Spinner";

const CheckoutForm = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
      totalAmount : props?.total
    };
    await props.checkoutHandler(payload);
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
                {(props.isLoading ) && <Spinner />} Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
