import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user-context";
import FormItem from "../commons/form-item";
import { useForm, useWatch } from "react-hook-form";
import noImageAvailable from '../../public/noImageAvailable.png'

const OutletInformationForm = (props) => {
  const [outletDetails, setOutletDetails] = useState({
    storeName: "",
    description: "",
    city: "",
    address: "",
    contactNo: "",
    landlineNo: "",
    ownerName: "",
    personalNo: "",
  });

  const { globalState } = useContext(UserContext);
  const { editStoreKey, editStore } = globalState;

  useEffect(() => {
    if (editStoreKey) {
      console.log(editStoreKey);
      setOutletDetails({
        storeName: editStore.name || "",
        description: editStore.description || "",
        city: editStore.city || "",
        address: editStore.address || "",
        contactNo: editStore.contact_no || "",
        landlineNo: editStore.landline_no || "",
        ownerName: editStore.owner || "",
        personalNo: editStore.personal_no || "",
      });
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: props?.storeDetails,
  });

  const storeImage = watch("storeImage");
  const imgSrc = storeImage && storeImage.length>0 && URL.createObjectURL(storeImage[0]);

  console.log({ storeImage });
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
            {...register("storeName", { required: true })}
            placeholder="Store Name"
          />
          {errors?.storeName?.type === "required" && (
            <p className="error">Store'name is required!</p>
          )}
        </div>
        <div>
          <FormItem
            type="file"
            name="storeImage"
            label=" Store Image"
            {...register("storeImage", { required: true })}
          />
          {errors?.storeImage?.type === "required" && (
            <p className="error">Store'Image is required!</p>
          )}
          <div className="border border-dotted p-3">
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
          </div>
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
              {...register("landlineNo++", { required: true })}
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

        <button className="btn btn-outline-primary py-3 px-4" type="submit" >
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
