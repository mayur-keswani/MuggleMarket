import React, { useState } from "react";
import MenuItems from "../menu-items/MenuItems";
import FormItem from "../commons/form-item";
import { useForm } from "react-hook-form";

const OutletItemsForm = (props) => {
  // const submitFormHandler = (items) => {
  //   let prevDetails = JSON.parse(localStorage.getItem("outletDetails"));
  //   let newDetails = { ...prevDetails, items, avgExpense };
  //   console.log(newDetails);
  //   localStorage.setItem("outletDetails", JSON.stringify(newDetails));
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(props?.onSubmit)}>
      <FormItem
        type="text"
        {...register("avgExpense", { required: true })}
        placeholder="Mobile number at store"
        label="Average Expense"
      />
      {errors?.storeName?.type === "required" && (
        <p className="error">Average expense is required!</p>
      )}

      <div className="menu-items-entry p-4 text-center overflow-x-scroll">
        <div className="text">Add Items</div>
        <MenuItems submitForm={()=>{}} />
      </div>

      <div className="flex items-center justify-around flex-row w-full mt-2">
        <button
          className="btn btn-outline py-3 px-4"
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
        <button className="btn btn-outline py-3 px-4" type="submit">
          Next
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
            className="ml-2 h-4 w-4"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default OutletItemsForm;
