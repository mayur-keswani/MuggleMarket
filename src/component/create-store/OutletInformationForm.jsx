import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user-context";
import FormItem from "../commons/form-item";
import { useForm, useWatch } from "react-hook-form";
import noImageAvailable from "../../public/noImageAvailable.png";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploader from "../image-uploader/ImageUploader";

const OutletInformationForm = (props) => {
  const { globalState } = useContext(UserContext);
  const dropArea = useRef(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: props?.storeDetails,
  });

  const picture = watch("picture");
  const imgSrc =
    picture &&
    picture.length > 0 &&
    (typeof picture === "string" ? picture : URL.createObjectURL(picture[0]));

  return (
    <form onSubmit={handleSubmit(props?.onSubmit)}>
      <div className="py-3">
        <p className="block">Store Details</p>
        <span className="text-muted ">Name, address, Location</span>
        <div className="mb-4">
          <FormItem
            type="text"
            id="storeName"
            name="storeName"
            {...register("name", { required: true })}
            placeholder="Store Name"
          />
          {errors?.storeName?.type === "required" && (
            <p className="error">Store'name is required!</p>
          )}
        </div>
        <div className="drag-image relative flex flex-col items-center justify-center text-center w-[250px] h-[300px] active:border-primary border border-dotted p-3">
          {imgSrc ? (
            <>
              <img
                className="rounded-xl object-cover"
                width={"100%"}
                height={"100%"}
                src={imgSrc}
              />
              <span className="opacity-0 hover:opacity-100 hover:flex hover:bg-gray-light hover:bg-opacity-30 absolute z-50 w-full h-full items-center justify-center ">
                <span
                  className="bg-primary rounded-full p-2"
                  onClick={() => {
                    setValue("picture", null);
                  }}
                >
                  <AiFillDelete />
                </span>
              </span>
            </>
          ) : (
            <ImageUploader
              onChange={(files) => {
                setValue("picture", files);
              }}
              {...register("picture", { required: true })}
            />
          )}

          {errors?.picture?.type === "required" && (
            <p className="error">Store'Image is required!</p>
          )}
          {/* <div className="">
            {imgSrc ? (
              <img
                className="rounded-xl"
                width={"250px"}
                height={"300px"}
                src={imgSrc}
              />
            ) : (
              <img
                className="rounded-xl"
                width={"250px"}
                height={"300px"}
                src={noImageAvailable}
              />
            )}
          </div> */}
        </div>
        <div className="mb-4">
          <FormItem
            type="textarea"
            label="Description"
            {...register("description", { required: true })}
            placeholder="Brief Description"
          />
          {errors?.description?.type === "required" && (
            <p className="error">Description is required!</p>
          )}
        </div>
        <div className="mb-4">
          <FormItem
            type="text"
            label="City"
            {...register("city", { required: true })}
            placeholder="City"
          />
          {errors?.city?.type === "required" && (
            <p className="error">City is required!</p>
          )}
        </div>
        <div className="mb-4">
          <FormItem
            type="textarea"
            label="Address"
            {...register("address", { required: true })}
            placeholder="Store complete address"
          />
          {errors?.address?.type === "required" && (
            <p className="error">Address is required!</p>
          )}
        </div>
      </div>

      <div>
        <p>Contact number at store</p>
        <p className="text-muted ">
          Your customer will call on this number for general enquiries
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormItem
              type="text"
              name="contactNo"
              {...register("contactNo", { required: true })}
              placeholder="Mobile number at store"
            />
            {errors?.contactNo?.type === "required" && (
              <p className="error">Contact no. is required!</p>
            )}
          </div>
          <div>
            <FormItem
              type="text"
              {...register("landlineNo", { required: true })}
              placeholder="landline number with std code"
            />
            {errors?.landlineNo?.type === "required" && (
              <p className="error">Landline no. is required!</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <p>Outlet owner details</p>
        <span className="text-muted ">
          These will be used to share revenue related communications
        </span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormItem
              type="text"
              {...register("ownerName", { required: true })}
              placeholder="Outlet owner fullname"
            />
            {errors?.ownerName?.type === "required" && (
              <p className="error">Owner'name is required!</p>
            )}
          </div>

          <div>
            <FormItem
              type="phone"
              {...register("personalNo", { required: true })}
              placeholder="Personal no."
            />
            {errors?.personalNo?.type === "required" && (
              <p className="error">Owner' Personal no. is required</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around flex-row w-full mt-2">
        {/* {currentStep > 1 && (
          <button
            className="btn btn-outline py-3 px-4"
            onClick={() => {
              setCurrentStep((prevValue) => prevValue - 1);
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
        )} */}

        <button className="btn btn-outline-primary py-3 px-4" type="submit">
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

export default OutletInformationForm;
