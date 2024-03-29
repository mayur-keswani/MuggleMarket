import React, { useState } from "react";
import FormItem from "../commons/form-item";
import { useForm } from "react-hook-form";
import Spinner from "../commons/spinner/Spinner";

const OutletTimingsForm = (props) => {
  const [showConfirmBox, toggleConfirmBox] = useState(false);

  // const submitFormHandler = () => {
  //   let prevDetails = JSON.parse(localStorage.getItem("outletDetails"));
  //   let newDetails = { ...prevDetails, ...outletDetails };
  //   localStorage.setItem("outletDetails", JSON.stringify(newDetails));

  //   toggleConfirmBox(true);
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: props?.storeDetails,
  });

  return (
    <form onSubmit={handleSubmit(props?.onSubmit)}>
      <div className="mt-3">
        <p>Outlet Type & Timings</p>
        <span className="text-muted">Name, address, Location</span>
        <div>
          <div className="mb-4">
            <FormItem
              type="text"
              {...register("storeType", { required: true })}
              label="Story Type"
              placeholder="Store type (eg.Clothes,Cafe,Cosmetics)"
            />
            {errors?.storeType?.type === "required" && (
              <p className="error">Store'Type is required!</p>
            )}
          </div>
          <div className="mb-4">
            <FormItem
              type="text"
              {...register("yearOfEstablish", { required: false })}
              label="Establishment Date"
              placeholder="Your year of Establishment? (optional)"
            />
          </div>

          <div className="mb-4">
            <FormItem
              type="time"
              {...register("openingTime", { required: false })}
              label="Opening Time"
              placeholder="Opening time"
            />
            {errors?.yearOfEstablish?.type === "required" && (
              <p className="error">Store'Opening time is required!</p>
            )}
          </div>
          <FormItem
            type="time"
            {...register("closingTime", { required: false })}
            label="Closing Time"
            placeholder="Closing time"
          />
          {errors?.closingTime?.type === "required" && (
            <p className="error">Store'Closing time is required!</p>
          )}
        </div>
      </div>

      <div className="mt-3">
        <p>Social Links</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormItem
              type="url"
              label="Personal Website"
              placeholder="eg: www.yourStore.com"
            />
          </div>
          <div>
            <FormItem
              type="url"
              label="Instagram"
              placeholder="eg: https://www.instagram.com/yourName/"
            />
          </div>
          <div>
            <FormItem
              type="url"
              label="Facebook"
              placeholder="eg: https://www.facebook.com/yourName"
            />
          </div>
          <div>
            <FormItem
              type="url"
              label="Youtube"
              placeholder="eg: https://www.youtube.com/channelName"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around flex-row w-full mt-2">
        <button
          className="btn btn-outline-primary py-3 px-4"
          disabled={props?.isLoading}
          onClick={() => {
            props?.renderPrevForm();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Previous
        </button>

        <button
          className="btn btn-primary py-3 px-4"
          type="submit"
          disabled={props?.isLoading}
        >
          {props?.isLoading && <Spinner />}{" "}
          {props.isUpdateMode ? "Update Store" : "Create Store"}
        </button>
      </div>
    </form>
  );
};

export default OutletTimingsForm;
